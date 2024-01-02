import './App.css'
import { Route, Routes } from "react-router-dom"
import Layout from './components/Layout'
import Home from '../Home'

function App() {

  return (
    <div className="bg-gray-800 h-svh text-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
