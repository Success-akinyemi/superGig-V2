import { useState } from 'react'
import AllPayment from '../../Helpers/AllPayment/AllPayment'
import PaidPayment from '../../Helpers/PaidPayment/PaidPayment'
import PendingPayment from '../../Helpers/PendingPayment/PendingPayment'
import './PaymentOrder.css'


function PaymentOrder({setSelectedCard, setPaymentOrderId}) {
  const [option, setOption] = useState('all')
  return (
    <div className='paymentOrder'>
        <div className="options">
            <span onClick={() => setOption('all')} className={`option ${option === 'all' ? 'active' : ''}`}>ALL</span>
            <span onClick={() => setOption('paid')} className={`option ${option === 'paid' ? 'active' : ''}`}>PAID</span>
            <span onClick={() => setOption('pending')} className={`option ${option === 'pending' ? 'active' : ''}`}>PENDING</span>
        </div>
        {
            option === 'all' && (
                <div className="card">
                    <AllPayment />
                </div>
            )
        }
                {
            option === 'paid' && (
                <div className="card">
                    <PaidPayment />
                </div>
            )
        }
        {
            option === 'pending' && (
                <div className="card">
                    <PendingPayment setSelectedCard={setSelectedCard} setPaymentOrderId={setPaymentOrderId} />    
                </div>
            )
        }
    </div>
  )
}

export default PaymentOrder