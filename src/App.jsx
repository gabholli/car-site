import './index.css'
import { Route, Routes } from "react-router-dom"
import Layout from './components/Layout'
import Companies from './pages/CarInfo/Companies'
import Home from './pages/Home'

function App() {

  return (
    <div className="bg-gray-800 min-h-svh text-white
      flex flex-col justify-center items-center">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="companies" element={<Companies />} />

        </Route>
      </Routes>
    </div>
  )
}

export default App
