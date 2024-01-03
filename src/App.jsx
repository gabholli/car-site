import './index.css'
import { Route, Routes } from "react-router-dom"
import Layout from './components/Layout'
import Dashboard from './pages/CarInfo/Dashboard'
import Models from './pages/CarInfo/Models'
import Home from './pages/Home'
import DashboardLayout from './components/DashboardLayout'

function App() {

  return (
    <div className="bg-gray-800 min-h-svh text-white
      flex flex-col justify-center items-center">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="cars" element={<DashboardLayout />} >
            <Route index element={<Dashboard />} />
            <Route path="models" element={<Models />} />
          </Route>

        </Route>
      </Routes>
    </div>
  )
}

export default App
