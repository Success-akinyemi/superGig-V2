import './Aside.css'
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { recentUpdates } from '../../data/recentUpdates';
import { formatDistanceToNow } from 'date-fns';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add'; 
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { useFetchTask } from '../../hooks/fetch.hooks';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';

function Aside({toggleMenu}) {
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data

    const { isLoadingTask, apiTaskData, taskServerError } = useFetchTask()
    const data = apiTaskData?.data
    const sortedData = data?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    const maxData = sortedData?.slice(0, 2);


  return (
    <div className='aside'>
        <div className="a-top">
            <div className="menu" onClick={toggleMenu}>
                <MenuIcon className='menuIcon' />
            </div>
            <div className="a-profile">
                <div className="info">
                    <p>Hey, <b className="bold">{user?.username}</b></p>
                    <small className="small text-muted">Status: {user?.verified && !user.isSuspended ? 'Active' : 'InActive'}</small>
                </div>
                <div className="admin-profile">
                    <img className='adminImg' src={user?.profileimage} alt='profile' />
                </div>
            </div>
        </div>

        <div className="recentUpdates">
            <h2 className="h-2">Recent Tasks</h2>
            <div className="updates">
                {
                    maxData?.map((item) => (
                        <Link to={`/taskPoint/${item?._id}`} className="link update" key={item?._id}>
                            <div className="admin-profile">
                                <img style={{width: '70%'}} src={item?.icon} />
                            </div>
                            <div className="message">
                                <p className="para">
                                    {item?.task}
                                </p>
                                <small className="small text-muted">
                                    {formatDistanceToNow(new Date(item?.createdAt))} Ago.
                                </small>
                            </div>
                        </Link>
                    ))
                }
                <Link to='/taskPoint' className='link viewAll'>
                    View All
                </Link>

            </div>
        </div>

        <div className="sales-analytics">
            <h2 className="h-2">Stay Updated -  
                <small>
                    {' '}Follow us on our social
                </small> 
            </h2>
            <a target='_blank' href='' className="link item online">
                <div className="icon">
                    <span className="cartIcon"><TelegramIcon /></span>
                </div>
                <div className="right">
                    <div className="info">
                        <h3 className="h-3">Join our Telegram</h3>
                        <p style={{fontSize: '14px'}} className='text-muted'>join our telegram channel to get recent updates on new jobs</p>
                    </div>
                </div>
            </a>

            <a target='_blank' href='https://www.instagram.com/supergig1' className="link item offline">
                <div className="icon">
                    <span className="cartIcon"><InstagramIcon /></span>
                </div>
                <div className="right">
                    <div className="info">
                        <h3 className="h-3">Follow us on instagram</h3>
                    </div>
                </div>
            </a>

        </div>
    </div>
  )
}

export default Aside