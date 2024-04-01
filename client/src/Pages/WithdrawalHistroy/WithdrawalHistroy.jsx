import { useSelector } from 'react-redux'
import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Table from '../../Components/Table/Table'
import './WithdrawalHistroy.css'
import { useFetchPaymentOrder } from '../../hooks/fetch.hooks'

function WithdrawalHistroy({ toggleMenu, menuOpen }) {
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const { isLoadingPayment, paymentData, paymentServerError } = useFetchPaymentOrder(user._id)
    const payData = paymentData?.data
    const sortedData = payData?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))


  return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className="withdrawalHistroy">
                <h1 className="h-1">Withdrawal Histroy</h1>
                <Table 
                    data={sortedData}
                    isLoading={isLoadingPayment}
                    error={paymentServerError}
                    td1={`_id`}
                    td2={`bankName`}
                    td3={'amount'}
                    td4={`status`}
                />
            </div>
        </div>

        <div className="asideContainer">
            <Aside toggleMenu={toggleMenu} />
        </div>
    </div>
  )
}

export default WithdrawalHistroy