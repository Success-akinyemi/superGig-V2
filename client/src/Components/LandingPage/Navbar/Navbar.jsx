import { Link } from 'react-router-dom'
import './Navbar.css'
import CloseIcon from '@mui/icons-material/Close';
import SegmentIcon from '@mui/icons-material/Segment';

function Navbar({setContent, toggle, menuOpen}) {
  return (
    <div className='navbar'>
        <div className="navCard">
            <div className="left">
                <div className="logo">
                    <h1>SuperGig</h1>
                </div>

                <div className={`users ${menuOpen ? 'active' : 'inactive'}`}>
                    <span onClick={() => setContent('business')}>For Business</span>
                    <span onClick={() => setContent('freelance')}>For Freelance</span>
                    <div className="closeBtn" onClick={toggle}>
                        <CloseIcon className='close' />
                    </div>
                </div>

            </div>

            <div className="right">
                <Link to='/login' className='link signin'>
                    Sign in
                </Link>

                <Link to='/register' className='link signup'>
                    Get Started
                </Link>
                <div className={`menuBtn`} onClick={toggle}>
                    <SegmentIcon className='menu' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar