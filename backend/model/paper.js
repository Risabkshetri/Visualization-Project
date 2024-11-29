


const mongoose = require('mongoose');

const researchPaperSchema = new mongoose.Schema({
    "Authors": { type: String, required: true },
    "Author(s) ID": { type: [String], required: true }, // Changed to array of strings
    "Title": { type: String, required: true },
    "Year": { type: Number, required: true },
    "Source title": { type: String, required: true },
    "Volume": { type: Number, default: null }, // Allow null
    "Issue": { type: Number, default: null }, // Allow null
    "Art. No.": { type: String, required: true }, // Assuming Art. No. is always a number
    "Page start": { type: Number, default: null }, // Allow null
    "Page end": { type: Number, default: null }, // Allow null
    "Page count": { type: String, default: "" }, // Allow empty string or change to null if you prefer
    "Cited by": { type: Number, default: 0 }, // Default to 0 if not specified
    "DOI": { type: String, required: true }, // Ensure DOI is provided
    "Link": { type: String, required: true }, // Ensure link is provided
    "Affiliations": { type: String, required: true }, // Required for your data
    "Authors with affiliations": { type: String, required: true }, // Required for your data
    "Abstract": { type: String, required: true }, // Required for your data
    "Author Keywords": { type: [String], default: [] }, // Changed to array of strings
    "Index Keywords": { type: [String], default: [] }, // Changed to array of strings
    "Correspondence Address": { type: String, required: true }, // Required for your data
    "Editors": { type: String, default: "" }, // Allow empty string or change to null if you prefer
    "Publisher": { type: String, required: true }, // Required for your data
    "ISSN": { type: String, default: "" }, // Allow empty string or change to null if you prefer
    "ISBN": { type: String, default: "" }, // Allow empty string or change to null if you prefer
    "CODEN": { type: String, default: "" }, // Allow empty string or change to null if you prefer
    "PubMed ID": { type: String, default: "" }, // Allow empty string or change to null if you prefer
    "Language of Original Document": { type: String, default: "English" }, // Default to English
    "Abbreviated Source Title": { type: String, default: "" }, // Allow empty string or change to null if you prefer
    "Document Type": { type: String, required: true }, // Required for your data
    "Publication Stage": { type: String, required: true }, // Required for your data
    "Open Access": { type: String, default: "" }, // Allow empty string or change to null if you prefer
    "Source": { type: String, required: true }, // Required for your data
    "EID": { type: String, required: true } // Ensure EID is provided
}, { timestamps: true });

const ResearchPaper = mongoose.model('ResearchPaper', researchPaperSchema);
module.exports = { researchPaper: ResearchPaper };
