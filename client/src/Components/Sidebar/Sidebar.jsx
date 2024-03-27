import './Sidebar.css'
import { useDispatch, } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import PaidIcon from '@mui/icons-material/Paid';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function Sidebar({toggleMenu, menuOpen}) {
    const location = useLocation();
    const dispatch = useDispatch()
  
    const isActive = (path) => {
      return location.pathname === path;
    };
  
    const handleSignOut = async () => {
      try {

      } catch (error) {
          console.log(error)
      }
    }

  return (
    <div className={`sidebar ${menuOpen ? 'show' : 'hide'}`}>
        <div className="top">
          <div className="logo">
                <Link className='link'>superGig</Link>
          </div>
          <div className="close" onClick={toggleMenu}>
            <CloseIcon className='closeIcon' />
          </div>
        </div>

        <div className="menuList">
          <Link onClick={toggleMenu} to='/dashboard' className={`link h-2 menuLinks ${isActive('/dashboard') ? 'active' : ''}`}>
            <DashboardIcon className='menuLinks-icon' />
            <Link to='/dashboard' className='link menuLink'>Dashboard</Link>
          </Link>

          <Link onClick={toggleMenu}  to='/taskPoint' className={`link h-2 menuLinks ${isActive('/taskPoint') ? 'active' : ''}`}>
            <ContentPasteIcon className='menuLinks-icon' />
            <Link to='/taskPoint' className='link menuLink'>Task Point</Link>
          </Link>

          <Link onClick={toggleMenu}  to='/wallet' className={`link h-2 menuLinks ${isActive('/wallet') ? 'active' : ''} `}>
            <AccountBalanceWalletIcon className='menuLinks-icon' />
            <Link to='/wallet' className='link menuLink'>Wallet</Link>
          </Link>

          <Link onClick={toggleMenu}  to='/invite' className={`link h-2 menuLinks ${isActive('/invite') ? 'active' : ''} `}>
            <PeopleAltOutlinedIcon className='menuLinks-icon' />
            <Link to='/invite' className='link menuLink'>Invite</Link>
          </Link>

          <Link onClick={toggleMenu}  to='/support' className={`link h-2 menuLinks ${isActive('/support') ? 'active' : ''} `}>
            <LiveHelpIcon className='menuLinks-icon' />
            <Link to='/support' className='link menuLink'>Support</Link>
          </Link>

          <Link onClick={toggleMenu}  to='/profile' className={`link h-2 menuLinks ${isActive('/profile') ? 'active' : ''} `}>
            <AccountCircleRoundedIcon className='menuLinks-icon' />
            <Link to='/profile' className='link menuLink'>Profile</Link>
          </Link>

          {/**Task */}

          <Link onClick={toggleMenu}  to='/createTask' className={`link h-2 menuLinks createTask ${isActive('/createTask') ? 'active' : ''} `}>
            <Link to='/createTask' className='link menuLink'>Create Task</Link>
          </Link>

        </div>

        <div className="bottom">
          <span onClick={handleSignOut} className='h-2'><LogoutIcon className='logoutIcon' /> Logout</span>
        </div>
    </div>
  )
}

export default Sidebar