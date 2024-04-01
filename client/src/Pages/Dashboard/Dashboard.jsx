import { useEffect, useState } from 'react'
import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Dashboard.css'
import TaskIcon from '@mui/icons-material/Task';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import PaymentsIcon from '@mui/icons-material/Payments';
import AddCardIcon from '@mui/icons-material/AddCard';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

import Loading from '../../Components/Loading/Loading'
import { Link } from 'react-router-dom';
import ImageSlider from '../../Components/ImageSlider/ImageSlider';
import { useFetchTransaction } from '../../hooks/fetch.hooks';
import { slidesData } from '../../data/general';
import { useDispatch, useSelector } from 'react-redux';
import TransactionData from '../../Components/TransactionData/TransactionData';
import { verifyFunding } from '../../helper/api';
import { signInSuccess } from '../../redux/user/userSlice';

function Dashboard({toggleMenu, menuOpen, setSelectedCard}) {
    const dispatch = useDispatch()
    const slides = slidesData
    const [ isLoadingData, setIsLoadingData ] = useState(false)
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const { isLoadingTransaction, transactionData, transactionServerError } = useFetchTransaction(user?._id);
    const data = transactionData?.data
    const sortedData = data?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    const maxData = sortedData?.slice(0, 5);

    useEffect(() => {
      const fetchData = async () => {
        // Parse the URL parameters
        const queryParams = new URLSearchParams(window.location.search);
        const reference = queryParams.get('reference');
        
        if (reference) {
          try {
            setIsLoadingData(true)
            const res = await verifyFunding({reference})
            if (res?.data.success) {
              dispatch(signInSuccess(res.data.data));
            }
          } catch (error) {
            console.log(error)
          } finally{
            setIsLoadingData(false)
          }
        }
      }
  
      fetchData();
    }, []);


  return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className="dashboard">
              <h1 className="h-1">Dashboard</h1>
                <div className="top">
                  <div className="create">
                    <Link to='/createTask' className='link'>Create Task</Link>
                  </div>

                  <div className="cards">

                      <div className="card">
                        <div className="iconCard">
                          <TaskIcon className='icon' />
                        </div>
                        <h3 className="h-3">
                          Completed Task
                        </h3>
                        <h1 className="h-1">
                          {user.completedTask}
                        </h1>

                      </div>

                      <div className="card">
                        <div className="iconCard two">
                          <StarHalfIcon className='icon' />
                        </div>
                        <h3 className="h-3">
                          Total Earnings
                        </h3>
                        <h1 className="h-1">
                          NGN {user.earningWallet}
                        </h1>

                      </div>

                      <div className="card">
                        <div className="iconCard three">
                          <AccountBalanceIcon className='icon' />
                        </div>
                        <h3 className="h-3">
                          Fund Balance
                        </h3>
                        <h1 className="h-1">
                          NGN {user.fundWallet}
                        </h1>

                      </div>

                      <div className="card">
                        <div className="iconCard four">
                          <AccountBalanceWalletIcon className='icon' />
                        </div>
                        <h3 className="h-3">
                          Total Balance
                        </h3>
                        <h1 className="h-1">
                          NGN {user.fundWallet + user.earningWallet}
                        </h1>

                      </div>

                  </div>

                  <div className="actions">
                    <div className="actionsCard">
                      More Actions
                    </div>

                    <span className="line"></span>
                    
                    <div className="moreActions">
                      {/**
                       * 
                      <span onClick={() => setSelectedCard('airtime')}><SmartphoneIcon className='icon' /> Buy Airtime</span>
                      <span onClick={() => setSelectedCard('data')}><SignalWifi4BarIcon className='icon' /> Buy Data</span>
                      <span onClick={() => setSelectedCard('payBills')}><PaymentsIcon className='icon' /> Pay Bills</span>
                       */}
                      <span onClick={() => setSelectedCard('funding')}><AddCardIcon className='icon' /> Fund Account</span>
                    </div>

                  </div>

                </div>

                <div className="middle">
                  <ImageSlider slides={slides} />
                </div>

                <div className="Dashboardtable">
                  <h3 className="h-3 ">Recent Transactions</h3>
                  <TransactionData 
                    data={maxData}
                    error={transactionServerError}
                    isLoading={isLoadingTransaction}
                  />
                  <Link to='/myTransactions' className='link'>View All</Link>
                </div>
            </div>
        </div>

        <div className="asideContainer">
            <Aside toggleMenu={toggleMenu} />
        </div>
    </div>
  )
}

export default Dashboard