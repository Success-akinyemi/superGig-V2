import './ReferreesInfo.css'

function ReferreesInfo({refUser}) {
  return (
    <div className='referreesInfo'>
        <h2 className="h-2">Your referral User Infomation</h2>
        <div className="infoCard">
            <div className="info">
                <p>Username:</p>
                <p>{refUser.username}</p>
            </div>
            <div className="info">
                <p>Email:</p>
                <p>{refUser.email}</p>
            </div>
            {/**
            <div className="info">
                <p>Total Deposit:</p>
                <p>{refUser.totalDepositedAmount}</p>
            </div>
             * 
             */}
            <div className="info">
                <p>Verified user:</p>
                <p>{refUser.verified ? 'Verified' : 'Not Verified'}</p>
            </div> 
        </div>
    </div>
  )
}

export default ReferreesInfo