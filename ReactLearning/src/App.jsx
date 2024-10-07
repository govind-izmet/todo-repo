
import './App.css'
import { useState } from 'react'
import Template from './Components/Template'
import TextCounter from './Components/TextCounter'
import Text from './Components/Text'
import DeleteArray from './Components/DeleteArray'
import About from './Components/About'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Counter from './Components/Counter'
import PasswordGenerator from './Components/PasswordGenerator'
import ToDo from './Components/ToDo'
import Home from './Components/Home'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Ecart from './Components/Ecart'
import CartPage from './Components/CartPage'
function App() {
 
  const [cartItems, setCartItems] = useState([]);

  return (
   

    <Router>
      <Template title="ReactLearning" />
      <div className="container mt-3" >
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/todo" element={<ToDo/>} />
          <Route path="/about" element={<About />} />
          <Route path="/textcounter" element={<TextCounter />} />
          <Route path="/text" element={<Text />} />
          <Route path="/ecom" element={<DeleteArray />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/passgen" element={<PasswordGenerator />} />
          <Route path="/ecart" element={<Ecart cartItems={cartItems} setCartItems={setCartItems} />} />
          
        <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
