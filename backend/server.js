require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const model = require('./model/paper');
const ResearchPaper = model.researchPaper;

const server = express();
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));

server.get('/', (req, res) => {
  res.send('Hellow I am Research Paper Viz backend');
});

server.post('/api/researchpapers', async (req, res) => {
  try {
    let result;
    if (Array.isArray(req.body)) {
      result = await ResearchPaper.insertMany(req.body, { ordered: false });
    } else {
      const researchPaper = new ResearchPaper(req.body);
      result = await researchPaper.save();
    }
    if (result.length) {
      return res.status(201).json({ message: `${result.length} research papers created` });
    }
    res.status(201).json(result);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    const existingPaper = await ResearchPaper.findOne({ DOI: req.body.DOI });
    if (existingPaper) {
      return res.status(409).json({ error: 'Research paper with this DOI already exists.' });
    }
    if (err.code === 11000) {
      return res.status(409).json({ error: "Duplicate key error. Research paper already exists." });
    }
    console.error("Error in createResearchPaper:", err);
    res.status(500).json({ error: "An error occurred while creating research paper" });
  }
});


server.get('/api/researchpapers', async (req, res) => {
  try {
    const researchpapers = await ResearchPaper.find();
    res.json(researchpapers);
  } catch (err) {
    console.error("Error in getResearchPapers:", err);
    res.status(500).json({ error: "An error occurred while getting research papers" });
  }
}
);


// Database connection
const connectToDatabase = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGO_URI is not defined in the environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Database connected');
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  }
};

connectToDatabase();


// Middleware setup 
server.use(express.json());
server.use(cors({
  origin: ['https://research-paper-viz.vercel.app/', 'http://localhost:3000'],
  credentials: true
}));


server.use(morgan('combined'));

const publicDir = process.env.PUBLIC_DIR || path.join(__dirname, 'public');
server.use(express.static(publicDir));

// Route handling

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
