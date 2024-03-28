import { useSelector } from 'react-redux'
import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { useFetchPaymentOrder } from '../../hooks/fetch.hooks'
import './Wallet.css'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import Table from '../../Components/Table/Table'

function Wallet({toggleMenu, menuOpen, setSelectedCard}) {
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const { isLoadingPayment, paymentData, paymentServerError } = useFetchPaymentOrder(user._id)
    console.log('PAYMENT', paymentData)
    const payData = paymentData?.data
    const sortedData = payData?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    const maxData = sortedData?.slice(0, 5);

    return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className="wallet">
                <h1 className="h-1">Wallet</h1>
                <div className="top">
                    <div className="cards">
                        <div className="card">
                            <div className="iconCard two">
                            <StarHalfIcon className='icon' />
                            </div>
                            <h3 className="h-3">
                            Bounus Balance:
                            </h3>
                            <h1 className="h-1">
                            NGN {user.totalReferralEarnings}
                            </h1>

                      </div>

                      <div className="card">
                            <div className="iconCard four">
                            <AccountBalanceWalletIcon className='icon' />
                            </div>
                            <h3 className="h-3">
                            Wallet Balance:
                            </h3>
                            <h1 className="h-1">
                            NGN {user.earningWallet}
                            </h1>

                      </div>
                    </div>

                    <div className="actions">
                        <div onClick={() => setSelectedCard('withdrawBonus') }>Withdraw Bonus</div>
                        <div onClick={() => setSelectedCard('withdrawEarning') }>Withdraw Wallet</div>
                    </div>

                    <div className="paymentTable">
                        <h3 className="h-3">Withdrawal Histroy</h3>
                        <Table 
                            data={maxData}
                            isLoading={isLoadingPayment}
                            error={paymentServerError}
                            td1={`_id`}
                            td2={`bankName`}
                            td3={'amount'}
                            td4={`status`}
                        />
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

export default Wallet