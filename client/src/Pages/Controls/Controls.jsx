import { useState } from 'react'
import Aside from '../../Components/Aside/Aside'
import ControlSidebar from '../../Components/ControlSidebar/ControlSidebar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Controls.css'
import MenuIcon from '@mui/icons-material/Menu';
import AllUsers from '../../Components/Controls/AllUsers/AllUsers'
import PaymentOrder from '../../Components/Controls/PaymentOrder/PaymentOrder'
import SocialMediaTask from './SocialMediaTask/SocialMediaTask'
import TaskforSocialMedia from '../../Components/TaskforSocialMedia/TaskforSocialMedia'


function Controls({toggleMenu, menuOpen, setSelectedCard}) {
    const [ controlMenu, setControlMenu ] = useState(false)
    const [ platformCode, setPlatformcode ] = useState()
    const [ display, setDisplay ] = useState('allUsers')
    
    const toggleControlMenu = () => {
        setControlMenu((prev) => !prev)
    }

    const renderSelectedComponent = () => {
        switch(display) {
          case 'allUsers':
            return <AllUsers />;
          case 'paymentOrder':
            return <PaymentOrder />
          case 'socialMediaTask':
            return  <SocialMediaTask setSelectedCard={setSelectedCard} setDisplay={setDisplay} toggleControlMenu={toggleControlMenu} setPlatformcode={setPlatformcode} />
          case 'TaskforSocialMedia': 
            return <TaskforSocialMedia setSelectedCard={setSelectedCard} platformCode={platformCode}  />

    
          default: 
            return <AllUsers />
        }
      }

  return (
    <div className="container controlDiv">
      <div className="menubarContainer">
        <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
      </div>

      <div className="mainContainer">
        <div className='controls'>
            <div className="side">
                <ControlSidebar display={display} setDisplay={setDisplay} controlMenu={controlMenu} toggleControlMenu={toggleControlMenu} />
            </div>
            <div className="body">
                <div className="content">
                    {renderSelectedComponent()}
                </div>
            </div>
        </div>
            
      </div>

      <div className="asideContainer">
        <Aside toggleMenu={toggleMenu} control={true} />
      </div>
    </div>
  )
}

export default Controls