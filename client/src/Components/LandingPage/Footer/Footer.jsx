import { Link } from 'react-router-dom'
import './Footer.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import LanguageIcon from '@mui/icons-material/Language';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function Footer() {
  return (
    <div className='footer'>
        <div className="footerCard">
            <div className="up">
                <div className="logo">
                    <div className="name">Supergig</div>
                    <a className='link' target='_blank' href="mailto:supergig50@gmail.com">supergig50@gmail.com</a>
                    <p className='link'>Nigeria NG</p>
                </div>

                <div className="linksMenu">
                    <div className="links">
                        <Link className='link'>For Business</Link>
                        <Link className='link'>For Freelancers</Link>
                        <Link className='link'>Terms and Condition T&C</Link>
                    </div>
                    <div className="links">
                        <Link className='link'>How to create task</Link>
                        <Link className='link'>Policy</Link>
                    </div>
                </div>

                <div className="socials">
                    <h3>Follow us on:</h3>

                    <div className="socialsIcons">
                        <a className='link' href='https://www.instagram.com/supergig1' target='_blank'><InstagramIcon className='icon' /></a>
                        <a className='link' href='https://www.instagram.com/supergig1' target='_blank'><TelegramIcon className='icon' /></a>
                    </div>
                </div>
            </div>

            <div className="down">
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
    </div>
  )
}

export default Footer