import React from 'react'
import Navbar  from './components/Navbar/navbar'
import { Route,Routes }  from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Placeorder from './pages/placeorder/Placeorder'
import Header  from './components/header/Header'
import Loginpop from './components/loginpop/Loginpop'
import navbar from './components/Navbar/Navbar'
const App = () => {
  const [showloginpop,setShowLoginPop]=React.useState(false)
  return (<>
    {showloginpop?<Loginpop/>:<></>},
    
    <div className='app'>
      <Navbar setShowLoginPop={setShowLoginPop} />
    <Routes>
      <Route path="/"element={<Home/>}></Route>
         <Route path="/cart"element={<Cart/>}></Route>
            <Route path="/placeorder"element={<Placeorder/>}></Route>
    </Routes>

   
    </div>
    </>
  )
}

export default App
