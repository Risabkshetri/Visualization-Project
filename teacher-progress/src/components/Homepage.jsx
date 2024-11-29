import { useState, useEffect } from 'react'
import { Pie, Bar, Line } from 'react-chartjs-2'
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
} from 'chart.js'
import teachers from "../data.json";
import { FiSun, FiMoon } from 'react-icons/fi'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement)

const documentTypes = ['Conference Paper', 'Journal Paper', 'Book', 'Book Chapter']

function App() {
  const [documentTypeCounts, setDocumentTypeCounts] = useState({})
  const [chartType, setChartType] = useState('pie')
  const [darkMode, setDarkMode] = useState(false)

  // Check if duplicate teacher names exist and log them
  useEffect(() => {
    for (let i = 0; i < teachers.length; i++) {
      for (let j = i + 1; j < teachers.length; j++) {
        if (teachers[i].Name === teachers[j].Name) {
          console.log('Duplicated teacher name: ', teachers[i].Name)
        }
      }
    }
  }, [])

  // Calculate counts for each document type
  useEffect(() => {
    const counts = documentTypes.reduce((acc, type) => {
      acc[type] = teachers.reduce((sum, teacher) => {
        const count = parseInt(teacher[type] || 0, 10)
        return sum + (isNaN(count) ? 0 : count)
      }, 0)
      return acc
    }, {})
    setDocumentTypeCounts(counts)
  }, [])

  const chartData = {
    labels: documentTypes,
    datasets: [
      {
        data: documentTypes.map(type => documentTypeCounts[type] || 0),
        backgroundColor: [
          'rgba(55, 125, 255, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)'
        ],
        borderColor: [
          'rgba(55, 125, 255, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'
        ],
        hoverBackgroundColor: [
          'rgba(55, 125, 255, 0.8)', 'rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'
        ],
        hoverBorderColor: [
          'rgba(55, 125, 255, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Teacher Progress Visualization',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = documentTypes.reduce((sum, type) => sum + (documentTypeCounts[type] || 0), 0)
            if (chartType === 'pie') {
              return `${context.label}: ${context.raw} (${((context.raw / total) * 100).toFixed(2)}%)`
            }
            return `${context.label}: ${context.raw}`
          },
        },
      },
    },
  }

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return <Pie data={chartData} options={options} />
      case 'bar':
        return <Bar data={chartData} options={options} />
      case 'line':
        return <Line data={chartData} options={options} />
      default:
        return <Pie data={chartData} options={options} />
    }
  }

  return (
    <div className={`h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} flex flex-col items-center justify-center`}>
      <button
        className={`absolute top-0 right-0 m-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out`}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <FiSun /> : <FiMoon />}
      </button>
      <nav className="flex justify-center space-x-4 mb-4">
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-r from-blue-700 to-blue-900 focus:outline-none text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out"
          onClick={() => setChartType('pie')}
        >
          Pie Chart
        </button>
        <button
          className="bg-gradient-to-r from-green-500 to-green-700 hover:bg-gradient-to-r from-green-700 to-green-900 focus:outline-none text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out"
          onClick={() => setChartType('bar')}
        >
          Bar Chart
        </button>
        <button
          className="bg-gradient-to-r from-red-500 to-red-700 hover:bg-gradient-to-r from-red-700 to-red-900 focus:outline-none text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out"
          onClick={() => setChartType('line')}
        >
          Line Chart
        </button>
      </nav>
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-900">Teacher Progress Visualization</h1>
      <div className={`w-full h-full mx-auto max-w-4xl max-h-96 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded shadow-md p-4`}>
        {renderChart()}
      </div>
      <nav className="flex justify-center space-x-4 mt-4">
        <Link to={'/teacher'}  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-r from-blue-700 to-blue-900 focus:outline-none text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out">
          Teacher Details
        </Link>
        <Link to={'/pub-acc'} className="bg-gradient-to-r from-green-500 to-green-700 hover:bg-gradient-to-r from-green-700 to-green-900 focus:outline-none text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out">
          Accepted vs Published Papers
        </Link>
      </nav>
    </div>
  )
}

export default App
