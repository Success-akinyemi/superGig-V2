import { useLocation, useNavigate } from 'react-router-dom';
import './NewPassword.css'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from 'react';
import LogoImg from "../../assets/Supergig.png";
import { newPassword } from '../../helper/api';

function NewPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const resetToken = path;
  
    const [password, setPassword] = useState("");
    const [comfirmPassword, setComfirmPassword] = useState("");
    const [ error, setError ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
  
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [comfirmPasswordVisible, setComfirmPasswordVisible] = useState(false);
  
    const handleResetpassword = async (e) => {
      e.preventDefault();
      const specialChars = /[!@#$%^&*()_+{}[\]\\|;:'",.<>?]/;
  
      if (!specialChars.test(password)) {
        e.preventDefault();
        setPassword("");
        setComfirmPassword("");
        setTimeout(() => {
          setError("");
        }, 5000);
        return setError("Password must contain at least on special character");
      }
      if (password.length < 6) {
        setPassword("");
        setComfirmPassword("");
        setTimeout(() => {
          setError("");
        }, 5000);
        return setError("Password must be 6 characters long");
      }
      if (password !== comfirmPassword) {
        setPassword("");
        setComfirmPassword("");
        setTimeout(() => {
          setError("");
        }, 3000);
        return setError("Passwords do not match");
      }
  
      try {
        setIsLoading(true);
        const res = await newPassword({ resetToken, password });
  
        if (res?.data?.success) {
          navigate("/login");
        } else if (!res.data.success) {
          setError(res.data.data);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
      } catch (error) {
        console.log("ERROR SETTING USER NEW PASSWORD:", error);
        setTimeout(() => {
          setError("");
        }, 3000);
        return setError("An Error occurred. please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    const myRegPassword = () => {
      setPasswordVisible((prev) => !prev)
    }
  
    const myRegComfirmPassword = () => {
      setComfirmPasswordVisible((prev) => !prev)
    }
  return (
    <div className='newPassword'>
              <div className="container">
        <div className="box" style={{ paddingTop: "60px" }}>
          <img src={LogoImg} alt="logo" className="logo" />
          <form
            className={`box-newPassword show'`}
            id="register"
            onSubmit={handleResetpassword}
          >
            <div className="top-header">
              <h3>Reset Password</h3>
              <small>Enter new Password to reset password</small>
            </div>

            <div className="input-group">

              <div className="input-field">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="regPassword"
                  className="input-box"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="regPassword">Password</label>
                <div className="eye-area">
                  <div className="eye-box" onClick={myRegPassword}>
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

              <div className="input-field">
                <input
                  type={comfirmPasswordVisible ? "text" : "password"}
                  id="regConfirmPassword"
                  className="input-box"
                  required
                  value={comfirmPassword}
                  onChange={(e) => setComfirmPassword(e.target.value)}
                />
                <label htmlFor="regPassword" id="retypePassword">
                  Retype Password
                </label>
                <div className="eye-area">
                  <div className="eye-box" onClick={myRegComfirmPassword}>
                    {comfirmPasswordVisible ? (
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

              {error && <p className="error">{error}</p>}

                <div className="input-field">
                  {isLoading ? (
                    <button disabled>
                      <div className="spinner"></div>
                    </button>
                  ) : (
                    <input type="submit" className="input-submit" value="Submit" />
                  )}
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewPassword