import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add/Add'
import Order from './pages/Order/Order'
import List from './pages/List/List'
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <div className="app">
      <ToastContainer />
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/order" element={<Order />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}


export default App
