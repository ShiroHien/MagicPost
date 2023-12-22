//rotas
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages
import Home from './pages/Landing/Home'
import Services from './pages/Landing/Services'
import Search from './pages/Landing/Search'
//componentes
import Navbar from './components/Navbar'
import Footer from './components/Footer/Footer'
import SignIn from './pages/Auth/Login'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/search' element={<Search />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  )
}

export default App
