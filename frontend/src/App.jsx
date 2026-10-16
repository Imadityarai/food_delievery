import React, { useState } from 'react'
import Navbar  from './components/Navbar/Navbar'
import { Route,Routes }  from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Placeorder from './pages/placeorder/Placeorder'
import Header  from './components/header/Header'
import Loginpop from './components/loginpop/Loginpop'
const App = () => {
  const [showloginpop,setShowLoginPop]=useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  return (<>
    {showloginpop && <Loginpop setShowLoginPop={setShowLoginPop} />}

    <div className='app'>
      <Navbar
        setShowLoginPop={setShowLoginPop}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    <Routes>
      <Route path="/"element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}></Route>
         <Route path="/cart"element={<Cart/>}></Route>
            <Route path="/placeorder"element={<Placeorder/>}></Route>
    </Routes>

   
    </div>
    </>
  )
}

export default App
