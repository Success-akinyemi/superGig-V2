import { useFetchAllPaymentOrder } from '../../../hooks/fetch.hooks'
import '../styling.css'

function PendingPayment({setSelectedCard, setPaymentOrderId}) {
    const query = 'Pending'
    const { apiData, isLoading } = useFetchAllPaymentOrder(query)
    //console.log('DTA', apiData?.data)
    const data = apiData?.data

    const handleData = (id) => {
        setSelectedCard('approvePayment')
        setPaymentOrderId(id)
    }
  return (
    <div className="paymentCard">
        <div className="headTitle">
            <h2 className="h1">Name</h2>
            <h2 className="h2">Amount</h2>
            <h2 className="h3">Status</h2>
        </div>
        <div className="bodyInfo">
        {
                data?.length <= 0 ? (
                    <p className='noItem'>No Payment torder</p>
                ) : (
                    data?.map((item, idx) => (
                        <div key={idx} className="paymentItem">
                        <p className="p1">{item?.bankName}</p>
                        <p className="p2">{item?.amount}</p>
                        <p className="p3 action" onClick={() => handleData(item?._id)}>{item?.status}</p>
                        </div>
                    ))
                )
            }
        </div>
    </div>
  )
}

export default PendingPayment