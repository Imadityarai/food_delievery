import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add/Add'
import Order from './pages/Order/Order'
import List from './pages/List/List'
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/add' element ={<Add />}>
        </Route>
          <Route path='/Order' element ={<Order />}>
        </Route>
          <Route path='/List' element ={<List />}>
        </Route>
        </Routes>      <Sidebar />
    </div>
  )
}

export default App
