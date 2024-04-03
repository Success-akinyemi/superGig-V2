import './ControlSidebar.css'
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';


function ControlSidebar({toggleControlMenu, controlMenu, setDisplay}) {

    const handleMenu = (menu) => {
        setDisplay(menu)
        controlMenu()
    }

  return (
    <div className='controlSidebar'> 
                <div className="top">
          <div className="logo">
                <span className='link'>Panel</span>
          </div>
          <div className="close" onClick={toggleControlMenu}>
            <CloseIcon className='closeIcon' />
          </div>
        </div>

        <div className="menuList">
          <span onClick={handleMenu('allUsers')} to='/dashboard' className={`link h-2 menuLinks`}>
            <DashboardIcon className='menuLinks-icon' />
            <span to='/dashboard' className='link menuLink'>All Users</span>
          </span>

          <span onClick={handleMenu('paymentOrder')} to='/taskPoint' className={`link h-2 menuLinks `}>
            <ContentPasteIcon className='menuLinks-icon' />
            <span to='/taskPoint' className='link menuLink'>Payment Order</span>
          </span>

          <span onClick={handleMenu('allTask')} to='/wallet' className={`link h-2 menuLinks  `}>
            <AccountBalanceWalletIcon className='menuLinks-icon' />
            <span to='/wallet' className='link menuLink'>All Task</span>
          </span>
          
          <span onClick={handleMenu('')} to='/invite' className={`link h-2 menuLinks `}>
            <PeopleAltOutlinedIcon className='menuLinks-icon' />
            <span to='/invite' className='link menuLink'>Invite</span>
          </span>

          <span onClick={handleMenu('')} to='/support' className={`link h-2 menuLinks `}>
            <LiveHelpIcon className='menuLinks-icon' />
            <span to='/support' className='link menuLink'>Support</span>
          </span>

          <span onClick={handleMenu('')} to='/profile' className={`link h-2 menuLinks `}>
            <AccountCircleRoundedIcon className='menuLinks-icon' />
            <span to='/profile' className='link menuLink'>Profile</span>
          </span>

        </div>
    </div>
  )
}

export default ControlSidebar