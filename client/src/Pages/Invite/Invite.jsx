import { useSelector } from 'react-redux';
import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Invite.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { useFetchReferres } from '../../hooks/fetch.hooks';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Spinner from '../../Components/Spinner/Spinner';

function Invite({toggleMenu, menuOpen, setSelectedCard, setRefUser}) {
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const { apiReferresData, isLoadingReferres, referresServerError} = useFetchReferres(user._id)
    const refUsers = apiReferresData?.data
    //console.log('REF', refUsers)
    const clicked = () => {
        toast.success('Copied')
    }

    const handleRef = (data) => {
        setSelectedCard('referrees')
        setRefUser(data)

    }

  return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className="invite">
                <h1 className="h-1">Invite</h1>

                <div className="top">
                    <p>
                        Earn as mush as <span>10%</span> on every deposit made by everyone you invite to <span>SuperGig</span> Earn more by reffering others
                    </p>
                    <h3 className="h-3">Your Ref Link:</h3>
                    <input value={user.referralLink} type="text" disabled />
                    <CopyToClipboard text={user.referralLink} onCopy={clicked} >
                        <div>
                            <span className='copyBtn'>Copy</span>
                        </div>
                    </CopyToClipboard>
                </div>

                <div className="bottom">
                    <div className="head">
                        <h2 className="h-2">Total Invites</h2>
                        <span>Total: 1</span>
                    </div>

                    <div className="body">
                        <div className="head">
                            <h4>User</h4>
                            <h4>Email</h4>
                            <h4>View</h4>
                        </div>

                        <div className="infoCard">
                            {
                                isLoadingReferres ? (
                                    <div className="loading">
                                        <Spinner />
                                    </div>
                                ) : (
                                    refUsers?.map((item) => (
                                        <div className='info'>
                                            <p>{item?.username}</p>
                                            <p>{item?.email}</p>
                                            <p onClick={() => handleRef(item)}><MoreVertIcon className='icon' /></p>
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div className="asideContainer">
            <Aside toggleMenu={toggleMenu} />
        </div>
    </div>
  )
}

export default Invite