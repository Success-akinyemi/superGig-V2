import { useState } from 'react'
import './NewsLetter.css'
import toast from 'react-hot-toast'
import { joinNewsLetter } from '../../helper/api'
import Loading from '../../Components/Loading/Loading'

function NewsLetter() {
    const [ loading, setLoading ] = useState(false)
    const [ check, setCheck ] = useState(false)
    const [ formData , setFormData ] = useState({})

    const handleCheck = () => {
        setCheck(prev => !prev)
    }

    const handleChange = () => {
        setFormData({...formData, [e.target.id]: e.target.value })
    }

    const newSubscriber = async (e) => {
        e.preventDefault()
        if(!formData.email){
            toast.error('Please enter a valid email')
            return
        }
        if(!formData.name){
            toast.error('Please first name')
            return
        }
        if(!formData.phoneNumber){
            toast.error('Please enter Phone Number')
            return
        }
        if(!check){
            toast.error('Please agree to recieve mail on the check box.')
            return
        }
        try {
            setLoading(true)
            const res = await joinNewsLetter(formData) 
            if(res.success){
                toast.success(res.data)
            }
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }
    
    return (
    <div className='newsLetter'>
        <div className="logo">Supergig</div>
        <form onSubmit={newSubscriber}>
            <div className="heading">
                <h3>Get first hand tips and tricks on how to boost your online presence</h3>
                <p>Subscribe to our news letter list and be the first to now.</p>
            </div>

            <div className="inputGroup">
                <label htmlFor="name">First Name</label>
                <input onChange={handleChange} type="text" name="name" id="name" placeholder='Enter First Name' />
            </div>

            <div className="inputGroup">
                <label htmlFor="email">Email Adress</label>
                <input onChange={handleChange} type="email" name="email" id="email" placeholder='Enter email address' />
            </div>

            <div className="inputGroup">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input onChange={handleChange} type="text" name='phoneNumber' id="phoneNumber" placeholder='Enter Phone Number' />
            </div>

            <div className="agree">
                <div className="box">
                    <input onClick={handleCheck} type="checkbox" name="check" id="check" />
                    <p>By clicking to this check box you agree to recieve emails from supergig.</p>
                </div>
                <small>you can unsubscribe your email at anytime</small>
            </div>

            <div className="btn">
                {
                    loading ? (
                        <button disabled className='Loadbutton'>
                            <div className="spinner"></div>
                        </button>
                    ) : (
                        <button type='submit' className="button">Subscribe</button>
                    )
                }
            </div>
        </form>
    </div>
  )
}

export default NewsLetter