import './index.css'
import { Route, Routes } from "react-router-dom"
import Layout from './components/Layout'
import Companies from './pages/CarInfo/Companies'
import CompanyDetail from './pages/CarInfo/CompanyDetail'
import CompanyInfo from './pages/CarInfo/CompanyInfo'
import Home from './pages/Home'

function App() {

  return (
    <div className="bg-orange-50 min-h-svh text-black
      flex flex-col justify-center items-center">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="companies" element={<Companies />} />
          <Route path="companies/:id" element={<CompanyDetail />}>
            <Route index element={<CompanyInfo />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
