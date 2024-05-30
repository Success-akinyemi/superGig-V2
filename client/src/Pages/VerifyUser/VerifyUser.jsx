import { useNavigate, useParams } from 'react-router-dom';
import './VerifyUser.css'
import { useEffect, useState } from 'react';
import { verifyUser } from '../../helper/api';
import Loading from '../../Components/Loading/Loading';
import LogoImg from "../../assets/Supergig.png";

function VerifyUser() {
    const navigate = useNavigate()
    const { id, token } = useParams();
    const [ errorMsg, setErrorMsg ] = useState(null)

    useEffect(() => {
        console.log('ID', id, 'TOKEN', token)
        const verify = async () => {
            try {
                setErrorMsg(null)
                const res = await verifyUser({ id, token})

                if(res.data.success){
                    navigate('/login')
                } 
            } catch (error) {
                setErrorMsg('Unable To verify Account')
                
            }    
        }

        verify();
    }, [id, token])

    const relaod = () => {
        window.location.reload()
    }

  return (
    <div className='verifyUser'>
        <img src={LogoImg} alt="logo" className="logo" />
        <div className='container'>
            <div className="box">
                <div className="box-verifyUser">
                    <div className="top-header">
                        <h2 className='h-2'>Verifying Account</h2>
                        <small>Please wait your account is been verified</small>
                    </div>
                    {
                        errorMsg ? (
                            <div className="errorMsg">
                                <p>{errorMsg}</p>
                                <div className="btn">
                                    <button onClick={relaod}>Retry</button>
                                </div>
                            </div>
                        ) : (
                            <Loading 
                                height={80}
                                width={80}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default VerifyUser