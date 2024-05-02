import './ControlSidebar.css'
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';


import PeopleIcon from '@mui/icons-material/People';
import PaymentsIcon from '@mui/icons-material/Payments';
import AssignmentIcon from '@mui/icons-material/Assignment';

function ControlSidebar({toggleControlMenu, controlMenu, setDisplay, display}) {

    const handleMenu = (menu) => {
        setDisplay(menu)
        toggleControlMenu()
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
          <span onClick={() => handleMenu('allUsers')} className={`link h-2 menuLinks ${display === 'allUsers' ? 'active' : ''}`}>
            <PeopleIcon className='menuLinks-icon' />
            <span className='link menuLink'>All Users</span>
          </span>

          <span onClick={() => handleMenu('paymentOrder')} className={`link h-2 menuLinks ${display === 'paymentOrder' ? 'active' : ''}`}>
            <PaymentsIcon className='menuLinks-icon' />
            <span className='link menuLink'>Payment Order</span>
          </span>

          <span onClick={() => handleMenu('allTask')} className={`link h-2 menuLinks ${display === 'allTask' ? 'active' : ''} `}>
            <AssignmentIcon className='menuLinks-icon' />
            <span className='link menuLink'>All Task</span>
          </span>
          
          <span onClick={() => handleMenu('socialMediaTask')} className={`link h-2 menuLinks ${display === 'socialMediaTask' ? 'active' : ''} `}>
            <PeopleAltOutlinedIcon className='menuLinks-icon' />
            <span className='link menuLink'>Social Media Task</span>
          </span>

          <span onClick={() => handleMenu('')} className={`link h-2 menuLinks ${display === '' ? 'active' : ''} `}>
            <LiveHelpIcon className='menuLinks-icon' />
            <span className='link menuLink'>Support</span>
          </span>

          <span onClick={() => handleMenu('')} className={`link h-2 menuLinks ${display === '' ? 'active' : ''}`}>
            <AccountCircleRoundedIcon className='menuLinks-icon' />
            <span className='link menuLink'>Profile</span>
          </span>

        </div>
    </div>
  )
}

export default ControlSidebar