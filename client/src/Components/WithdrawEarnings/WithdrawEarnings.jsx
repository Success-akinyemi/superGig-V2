import { useEffect, useState } from 'react'
import './WithdrawEarnings.css'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { withdrawEarning } from '../../helper/api';
import { signInSuccess } from '../../redux/user/userSlice';

function WithdrawEarnings() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.data;
  const [ earningAmount, setEarningAmount ] = useState()
  const [ loading, setLoading ] = useState(false)
  const [transactionFee, setTransactionFee] = useState(0)


  useEffect(() => {
    if(earningAmount){
      const fee = (3 * parseFloat(earningAmount)) / 100
      setTransactionFee((parseFloat(earningAmount) + fee).toFixed(2))
    }
  },[earningAmount])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try { 
      if(user?.earningWallet < transactionFee){
        toast.error('Insuffient Balance')
        return
      }
      if(transactionFee < 500){
        toast.error('Minimuin amount is 500')
        return
      }
      setLoading(true)
      const res = await withdrawEarning({earningAmount, userId: user?._id})
      if (res?.data.success) {
        dispatch(signInSuccess(res.data.data));
      }
    } catch (error) {
      console.log('COULD NOT PROCESS WITHDRAWAL', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='withdrawEarnings'>
        <h2 className='h-2'>Withdraw Earning</h2>
        <span>Balance: {user?.earningWallet}</span>
        <form className="bonusForm" onSubmit={handleSubmit}>
          <input className='input' type="number" value={earningAmount} onChange={(e) => setEarningAmount(e.target.value)} placeholder='Enter Amount to withdraw'/>
          <button disabled={loading || earningAmount < 500} className={`${loading ? 'active' : ''}`}>
            {loading ? 'Processing' : (earningAmount >= 500 ? 'Withdraw' : 'Minimum amount is 500')}
          </button>
          <p className='fee'>Transaction fee (3%): {transactionFee && (<span>{transactionFee}</span>)}</p>
        </form>
    </div>
  )
}

export default WithdrawEarnings