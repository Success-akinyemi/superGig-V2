import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
        <div className="componentWidth nav">
            <div className="logo">
                <Link to='/' className='link'>
                    Supergig
                </Link>
            </div>

            <div className="menus">
                <Link to='/register' className="link startBtn">Get Started</Link>
                <Link to='/login' className="link loginBtn">Login</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar