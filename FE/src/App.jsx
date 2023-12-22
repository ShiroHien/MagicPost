//rotas
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages
import Home from './pages/Landing/Home'
import Services from './pages/Landing/Services'
import Search from './pages/Landing/Search'
//componentes
import Navbar from './components/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
