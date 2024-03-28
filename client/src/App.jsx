import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import { Toaster } from 'react-hot-toast'
import Profile from './Pages/Profile/Profile'
import TaskPoint from './Pages/TaskPoint/TaskPoint'
import Wallet from './Pages/Wallet/Wallet'
import Invite from './Pages/Invite/Invite'
import Support from './Pages/Support/Support'
import CreateTask from './Pages/CreateTask/CreateTask'
import Login from './Pages/Login/Login'
import Airtime from './Components/Airtime/Airtime'
import Data from './Components/Data/Data'
import PayBills from './Components/PayBills/PayBills'
import Funding from './Components/Funding/Funding'
import { AuthorizeUser } from './auth/ProtectRoute'
import MyTranscations from './Pages/MyTranscations/MyTranscations'
import WithdrawBonus from './Components/WithdrawBonus/WithdrawBonus'
import WithdrawEarnings from './Components/WithdrawEarnings/WithdrawEarnings'


function App() {
  const [ menuOpen, setMenuOpen ] = useState(false)
  const [ selectedCard, setSelectedCard ] = useState(null)

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  const renderPopupComponent = () => {
    switch(selectedCard) {
      case 'airtime' :
        return (
            <Airtime />
        );
      case 'data' :
        return (
            <Data />
        );
      case 'payBills' :
        return (
            <PayBills />
        );
      case 'funding' :
        return (
            <Funding />
        );
      case 'withdrawBonus' :
        return (
            <WithdrawBonus />
        );
      case 'withdrawEarning' :
        return (
          <WithdrawEarnings />
        );

    }
  }

  /**
   * 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('popup-overlay')) {
        setSelectedCard(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
   */

  const closePopup = () => {
    setSelectedCard(null);
  };

  return (
    <div className='app' >
      {selectedCard && (
        <>
          <div className='popup-overlay'></div>
          <div className={`popup active`}>
              <span className='popup-close' onClick={closePopup}>
                Close
              </span>
            <div className='popup-content'>
                {renderPopupComponent()}
            </div>
          </div>
        </>
      )}
      <Toaster position='top-center'></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route element={<AuthorizeUser />}>
            <Route path='/dashboard' element={<Dashboard menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/taskPoint' element={<TaskPoint menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/wallet' element={<Wallet menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/invite' element={<Invite menuOpen={menuOpen} toggleMenu={toggleMenu} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/support' element={<Support menuOpen={menuOpen} toggleMenu={toggleMenu} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/profile' element={<Profile menuOpen={menuOpen} toggleMenu={toggleMenu} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/createTask' element={<CreateTask menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/myTransactions' element={<MyTranscations menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} />} />
          </Route>


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App