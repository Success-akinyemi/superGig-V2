import { useEffect, useState } from 'react';
import Aside from '../../Components/Aside/Aside'
import AvailableTask from '../../Components/AvailableTask/AvailableTask';
import PostedTask from '../../Components/PostedTask/PostedTask';
import Sidebar from '../../Components/Sidebar/Sidebar'
import './TaskPoint.css'
import ReplayIcon from '@mui/icons-material/Replay';
import CompletedTask from '../../Components/CompletedTask/CompletedTask';

function TaskPoint({toggleMenu, menuOpen}) {
    const [selectedTable, setSelectedTable] = useState('available')
    const [ active, setActive ] = useState('available')

    const renderSelectedTable = () => {
      switch(selectedTable) {
        case 'available':
          return <AvailableTask />;
        case 'posted':
          return <PostedTask />
        case 'completed':
            return <CompletedTask />  
  
  
        default: 
          return <AvailableTask />
      }
    }



    const handleReloadClick = () => {
        if (selectedTable === 'available') {
            console.log('touch')
            setSelectedTable('');
            setTimeout(() => setSelectedTable('available'), 2000);
            
        } else if (selectedTable === 'posted') {
            console.log('first')
        }
    };


    const handleTableItemClick = (menuItem) => {
      setActive(menuItem)
      setSelectedTable(menuItem);
    };

  return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className="taskPoint">
                <h1 className="h-1">Task Point</h1>
                <div className="card">
                    <div className="top">
                        <div className="category">
                            <span className={`${active === 'available' ? 'active' : ''}`} onClick={() => handleTableItemClick('available')}>Available</span>
                            <span className={`${active === 'posted' ? 'active' : ''}`} onClick={() => handleTableItemClick('posted')}>Posted</span>
                            <span className={`${active === 'completed' ? 'active' : ''}`} onClick={() => handleTableItemClick('completed')}>Completed</span>
                            <span>Rejected</span>
                        </div>

                        <select onClick={(e) => handleTableItemClick(e.target.value)}>
                            <option value='available'>Available</option>
                            <option value='posted' >Posted</option>
                            <option value='completed' >Completed</option>
                            <option>Rejected</option>
                        </select>

                        <div onClick={handleReloadClick} className="reload">
                            <ReplayIcon className='icon'/>
                        </div>
                    </div>

                    <div className="tableCard">
                        {renderSelectedTable()}
                    </div>
                </div>
                
            </div>
        </div>

        <div className="asideContainer">
            <Aside toggleMenu={toggleMenu} />
        </div>
    </div>
  )
}

export default TaskPoint