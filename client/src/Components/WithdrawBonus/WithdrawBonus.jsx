import { useDispatch, useSelector } from 'react-redux';
import './WithdrawBonus.css'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { withdrawBonusEarning } from '../../helper/api';
import { signInSuccess } from '../../redux/user/userSlice';

function WithdrawBonus() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.data;
  const [ bonusAmount, setBonusAmount ] = useState()
  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(bonusAmount < 500){
        toast.error('Minimuin withdrawal amount is 500')
        return
      }
      if(user?.totalReferralEarnings < 500){
        toast.error('Insuffient Bonus Balance')
        return;
      }
      if(user?.totalReferralEarnings < bonusAmount){
        toast.error('Insuffient Balance')
        return;
      }
      setLoading(true)
      const res = await withdrawBonusEarning({bonusAmount, userId: user?._id})
      if (res?.data.success) {
        dispatch(signInSuccess(res.data.data));
      }
    } catch (error) {
      console.log('COULD NOT PROCESS BONUS WITHDRAWAL', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='withdrawBonus'>
        <h2 className='h-2'>Withdraw Referral Bonus</h2>
        <span>Balance: {user?.totalReferralEarnings}</span>
        <form className="bonusForm" onSubmit={handleSubmit}>
          <input className='input' type="number" value={bonusAmount} onChange={(e) => setBonusAmount(e.target.value)} placeholder='Enter Amount to withdraw'/>
          <button disabled={loading} className={`${loading ? 'active' : ''}`}>
            {
              bonusAmount >= 500 ?
              'Withdraw' :
              loading ? 
              'Processing' :
              'Minimuin amount is 500'
            }
          </button>
        </form>
    </div>
  )
}

export default WithdrawBonus