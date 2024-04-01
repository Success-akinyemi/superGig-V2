import { useLocation } from 'react-router-dom';
import './ResetEmailSent.css'
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LogoImg from "../../assets/Supergig.png";

function ResetEmailSent() {
    const location = useLocation();
    const msg = location.state ? location.state.resMsg : 'Check Email Inbox for reset password link';

    const openEmailApp = () => {
        window.location.href = 'mailto:';
    }

    return (
    <div className='resetEmailSent'>
        <img src={LogoImg} alt="logo" className="logo" />
        <div className='container'>
            <div className="box">
                <div className="box-resetEmailSent">
                    <div className="top-header">
                        <h2 className='h-2'>Reset Email Sent</h2>
                        <small>A password reset email successfully sent to you</small>
                    </div>

                    <div className="body">
                        <p>{msg}</p>
                    </div>

                    <div className="action" onClick={openEmailApp}>
                        Go to Email <MarkEmailUnreadIcon className='icon' />
                    </div>

                    <small className='warn'>Check spam box for email also</small>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ResetEmailSent