import './UseCase.css'

function UseCase({data}) {
  return (
    <div className='useCase'>
        <div className="container">
            <div className="up">
            <   h1>Supergig is For You</h1>
                <p>Supergig works with any niche using our platform, to power your Online growth!</p>
            </div>

            <div className="cases">
                {
                    data.map((item, idx) => (
                        <div key={idx} className="case">
                            <div className="top">
                                <p>{item?.name}</p>
                                <span></span>
                            </div>
                            <img src={item?.img} alt={item?.name} />
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default UseCase