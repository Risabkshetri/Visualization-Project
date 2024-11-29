import { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { Pie, Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js'
import teacherProgress from './data.json'
import './App.css'
import { FiSun, FiMoon } from 'react-icons/fi';
import {Teacher} from './components/index.js'
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <main>
    <Outlet />
    </main>
  )
}

export default App
