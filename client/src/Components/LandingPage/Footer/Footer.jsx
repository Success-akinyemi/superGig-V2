import { Link } from 'react-router-dom'
import './Footer.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import LanguageIcon from '@mui/icons-material/Language';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function Footer() {
  return (
    <div className='footer'>
        <div className="footerContent">
            <div className="top">
                <div className="left">
                    <h1>
                        <Link to='/' className='link'>SuperGig</Link>
                    </h1>
                    <p className="linkInfo">supergig50@gmail.com</p>
                    <p className="linkInfo">Nigeria NG</p>
                </div>
                <div className="middle">
                    <div className="links">
                        <Link className='link'>For Business</Link>
                        <Link className='link'>For Freelancers</Link>
                        <Link className='link'>FAQ For Businesses</Link>
                    </div>
                    <div className="links">
                        <Link className='link'>FAQ For Freelancers</Link>
                        <Link className='link'>How to create task</Link>
                    </div>
                </div>
                <div className="right">
                    <small>Follow us</small>
                    <div className="icons">
                        <a className='link' href='https://www.instagram.com/supergig1' target='_blank'><InstagramIcon className='icon' /></a>
                        <a className='link' href='https://www.instagram.com/supergig1' target='_blank'><TelegramIcon className='icon' /></a>
                    </div>
                </div>
            </div>

            <div className="tc">
                <Link className='link'>Terms and Condition T&C</Link>
                <Link className='link'>Policy</Link>
            </div>

            <div className="imprint">
                Built, Maintain and Powered by <br />
                Successhub_Technology
                <div className="icons">
                    <a className='link' target='_blank' href="https://www.instagram.com/successhub_technology"><InstagramIcon className='icon' /></a>
                    <a className='link' target='_blank' href="https://success-hub.netlify.app/"><LanguageIcon className='icon' /></a>
                    <a className='link' target='_blank' href="https://api.whatsapp.com/send?phone=+2349059309831"><WhatsAppIcon className='icon' /></a>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Footer