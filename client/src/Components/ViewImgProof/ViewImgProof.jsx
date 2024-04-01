import './ViewImgProof.css'

function ViewImgProof({proofImg}) {
  return (
    <div className='viewImgProof'>
        <h3 className="h-3">Job Proof</h3>
        <img src={proofImg} alt="job proof" />
    </div>
  )
}

export default ViewImgProof