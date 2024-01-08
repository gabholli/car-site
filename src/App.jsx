import './index.css'
import { Route, Routes } from "react-router-dom"
import Layout from './components/Layout'
import Companies from './pages/CarInfo/Companies'
import CompanyDetail from './pages/CarInfo/CompanyDetail'
import CompanyInfo from './pages/CarInfo/CompanyInfo'
import Models from './pages/CarInfo/Models'
import Types from "./pages/CarInfo/Types"
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'

function App() {

  return (
    <div className="bg-background-image bg-center bg-cover bg no-repeat 
      bg-fixed min-h-svh text-white font-arial flex flex-col justify-center items-center">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="companies" element={<Companies />} />
          <Route path="companies/:name" element={<CompanyDetail />}>
            <Route index element={<CompanyInfo />} />
            <Route path="models" element={<Models />} />
            <Route path="types" element={<Types />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
