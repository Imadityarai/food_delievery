import {assets} from '../../admin_assets/assets'
import './Navbar.css'
const Navbar = ({ onLogout }) => {
  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className="logo" />
      <button type="button" onClick={onLogout}>Log out</button>
    </div>
  )
}

export default Navbar
