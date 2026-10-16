import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add/Add'
import Order from './pages/Order/Order'
import List from './pages/List/List'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import AdminLogin from './components/AdminLogin/AdminLogin'

const App = () => {
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('adminToken') || '')

  const logout = () => {
    localStorage.removeItem('adminToken')
    setAdminToken('')
  }

  if (!adminToken) {
    return <AdminLogin onLogin={(token) => {
      localStorage.setItem('adminToken', token)
      setAdminToken(token)
    }} />
  }

  return (
    <div className="app">
      <ToastContainer />
      <Navbar onLogout={logout} />
      <div className="main-layout">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/order" element={<Order />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}


export default App
