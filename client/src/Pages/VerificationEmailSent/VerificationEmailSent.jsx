import { useLocation } from 'react-router-dom';
import './VerificationEmailSent.css'
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LogoImg from "../../assets/Supergig.png";

function VerificationEmailSent() {
    const location = useLocation();
    const msg = location.state ? location.state.resMsg : 'Please Check your Email to verify Email';
    
    const openEmailApp = () => {
        window.location.href = 'mailto:';
    };

  return (
    <div className='verificationEmailSent'>
        <img src={LogoImg} alt="logo" className="logo" />
        <div className='container'>
            <div className="box">
                <div className="box-verificationEmailSent">
                    <div className="top-header">
                        <h2 className='h-2'>Account Creeated Successfully</h2>
                        <small>Your account has been successfully created</small>
                    </div>

                    <div className="body">
                        <p>{msg}</p>
                    </div>

                    <div className="action" onClick={openEmailApp}>
                        Click to go to Email <MarkEmailUnreadIcon className='icon' />
                    </div>

                    <small className='warn'>Check spam box for email sent also</small>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VerificationEmailSent