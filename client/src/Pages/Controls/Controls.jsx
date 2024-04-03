import Aside from '../../Components/Aside/Aside'
import ControlSidebar from '../../Components/ControlSidebar/ControlSidebar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Controls.css'

function Controls({toggleMenu, menuOpen}) {
  return (
    <div className="container">
      <div className="menubarContainer">
        <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
      </div>

      <div className="mainContainer">
        <div className='controls'>
            <div className="side">
                <ControlSidebar />
            </div>
            <div className="body">
                hellooooo
            </div>
        </div>
            
      </div>

      <div className="asideContainer">
        <Aside toggleMenu={toggleMenu} />
      </div>
    </div>
  )
}

export default Controls