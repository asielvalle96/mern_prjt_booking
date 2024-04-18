import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Pages
import Home from './pages/Home.jsx'
import List from './pages/List.jsx'
import Hotel from './pages/Hotel.jsx'
// Components
import Navbar from './components/Navbar'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<List />} />
        <Route path='/hotels/:id' element={<Hotel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
