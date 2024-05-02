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
import WithdrawalHistroy from './Pages/WithdrawalHistroy/WithdrawalHistroy'
import ReferreesInfo from './Components/ReferreesInfo/ReferreesInfo'
import TaskPage from './Pages/TaskPage/TaskPage'
import SubmitTaskForm from './Components/SubmitTaskForm/SubmitTaskForm'
import PostedTask from './Pages/PostedTask/PostedTask'
import ViewImgProof from './Components/ViewImgProof/ViewImgProof'
import Register from './Pages/Register/Register'
import VerificationEmailSent from './Pages/VerificationEmailSent/VerificationEmailSent'
import VerifyUser from './Pages/VerifyUser/VerifyUser'
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword'
import ResetEmailSent from './Pages/ResetEmailSent/ResetEmailSent'
import NewPassword from './Pages/NewPassword/NewPassword'
import LandingPage from './Pages/LandingPage/LandingPage'
import Controls from './Pages/Controls/Controls'
import NewSocialMedia from './Components/NewSocialMedia/NewSocialMedia'
import NewSocialMediaTask from './Components/NewSocialMediaTask/NewSocialMediaTask'


function App() {
  const [ menuOpen, setMenuOpen ] = useState(false)
  const [ selectedCard, setSelectedCard ] = useState(null)
  const [ refUser, setRefUser ] = useState()
  const [ taskId, setTaskId ] = useState()
  const [ userProfile, setUserProfile ] = useState()
  const [ proofImg, setProofImg ] = useState()

  const redirectToTaskPoint = () => {
    window.location.href = '/taskPoint'; 
  }

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
      case 'referrees' :
        return (
          <ReferreesInfo refUser={refUser} />
        );
      case 'submitTaskForm' :
        return (
          <SubmitTaskForm id={taskId} userProfile={userProfile} />
        )
      case 'viewImgProof' :
        return (
          <ViewImgProof proofImg={proofImg} />
        );
      case 'newSocialMedia' :
        return (
            <NewSocialMedia />
        );
      case 'newSocialMediaTask' :
        return (
            <NewSocialMediaTask />
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
                {renderPopupComponent(redirectToTaskPoint)}
            </div>
          </div>
        </>
      )}
      <Toaster position='top-center'></Toaster>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<LandingPage />} />


          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/VerificationEmailSent' element={<VerificationEmailSent />} />
          <Route path='/:id/verify/:token' element={<VerifyUser />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/resetEmailSent' element={<ResetEmailSent />} />
          <Route path='/newPassword/:resetToken' element={<NewPassword />} />



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
            <Route path='/invite' element={<Invite menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} setRefUser={setRefUser} />} />
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

          <Route element={<AuthorizeUser />}>
            <Route path='/withdrawal-histroy' element={<WithdrawalHistroy menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/taskPoint/:id' element={<TaskPage menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} setTaskId={setTaskId} setUserProfile={setUserProfile} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/postedTask/:id' element={<PostedTask menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} setProofImg={setProofImg} />} />
          </Route>

          <Route element={<AuthorizeUser />}>
            <Route path='/control' element={<Controls menuOpen={menuOpen} toggleMenu={toggleMenu} setSelectedCard={setSelectedCard} setProofImg={setProofImg} />} />
          </Route>
          
          

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App