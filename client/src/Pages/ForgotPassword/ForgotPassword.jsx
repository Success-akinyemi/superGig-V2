import { useState } from 'react';
import './ForgotPassword.css'
import LogoImg from '../../assets/Supergig.png'
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../helper/api';

function ForgotPassword() {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('')
    const [ error, setError ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
  
    const handleForgotPassword = async (e) => {
      e.preventDefault();
  
      if(!email){
          setEmail('')
          setTimeout(() => {
            setError('')
          }, 3000)
          return setError('Email required')
        } else if(email.includes(" ")){
          setEmail('')
          setTimeout(() => {
            setError('')
          }, 3000)
          return setError('Invalid Email')
        } 
  
        try {
          setIsLoading(true)
          const res = await resetPassword({ email })
  
          //console.log('rES from client', res)
          if(res.data.success){
            navigate('/resetEmailSent', { state: {resMsg: res?.data.data}})
          }
          
        } catch (errorMsg) {
          console.log('ERROR SENDING LINK USER:', errorMsg)
          const errorM = errorMsg.response?.data?.data || 'An error occurred during the request.';
          console.log('ER', errorM)
          setError(errorM)
          setTimeout(() => {
            setError('')
          }, 5000)
      } finally {
          setIsLoading(false)
        }
  }

  return (
    <div className='ForgotPassword'>
        <div className="container">
        <div className="box" style={{ paddingTop: '60px' }} >
          <img src={LogoImg} alt='logo' className='logo' />
            <form
              className={`box-ForgotPassword show`}
              id="login"
              onSubmit={handleForgotPassword}
            >
              <div className="top-header">
                <h2 className='h-2'>Forgot Password</h2>
                <small className='bold'>Enter registered email to get reset link</small>
              </div>

              <div className="input-group">
                <div className="input-field">
                  <input
                    type="email"
                    id="logEmail"
                    className="input-box"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="logEmail">Email Address</label>
                </div>

                {
                  error && (
                    <p className="error">{error}</p>
                  )
                }

                <div className="input-field">
                  {isLoading ? (
                    <button disabled>
                      <div className="spinner"></div>
                    </button>
                  ) : (
                    <input type="submit" className="input-submit" value="Submit" />
                  )}
                </div>
                <div className="forgot">
                  <Link className="link menuLink" to="/login">
                    Remeber Password
                  </Link>
                </div>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword