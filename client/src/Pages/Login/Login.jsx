import './Login.css'
import LogoImg from '../../assets/Supergig.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice.js'
import { loginUser } from '../../helper/api';

function Login() {
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const myLogPassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Enter Email Address')
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (!password) {
      setError('Enter Password')
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      dispatch(signInStart())
      setIsLoading(true)
      const res = await loginUser({email, password})
      
      const verify = res?.data.isVerified
      if(!verify){
        navigate("/VerificationEmailSent", {
          state: { resMsg: res?.data.data },
        });
      }
      if(res?.data.success){
        dispatch(signInSuccess(res?.data.data))
        localStorage.setItem('token', res?.data.token)
        navigate('/dashboard')
      }
    } catch (error) {
      setError('Unable to login')
      setTimeout(() => setError(null), 4000)
      console.log('Unable to login', error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className='login'>
      <div className="container">
        <div className="box" style={{ paddingTop: '60px' }} >
          <img src={LogoImg} alt='logo' className='logo' />
            <form
              className={`box-login show`}
              id="login"
              onSubmit={handleLogin}
            >
              <div className="top-header">
                <h2 className='h-2'>Hello, Again</h2>
                <small className='bold'>Continue Earning</small>
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

                <div className="input-field">
                  <input
                    id="logPassword"
                    className="input-box"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    type={passwordVisible ? "text" : "password"}
                  />
                  <label htmlFor="logPassword">Password</label>
                  <div className="eye-area">
                    <div className="eye-box" onClick={myLogPassword}>
                      {passwordVisible ? (
                        <i id="eye-slash">
                          <VisibilityOffIcon />
                        </i>
                      ) : (
                        <i id="eye">
                          <VisibilityIcon />
                        </i>
                      )}
                    </div>
                  </div>
                </div>
                {/**
                 * 
                 <div className="remember">
                   <input type="checkbox" id="formCheck" className="check" />
                   <label htmlFor="formCheck">Remember Me</label>
                 </div>
                 *
                */}

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
                  <Link className="link menuLink" to="/forgotPassword">
                    Forgot Password
                  </Link>
                </div>
                <div className="forgot">
                  <Link className="link menuLink" to="/register">
                    New? Get started here
                  </Link>
                </div>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login