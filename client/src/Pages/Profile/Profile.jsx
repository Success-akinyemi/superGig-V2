import { useEffect, useState } from "react";
import Aside from "../../Components/Aside/Aside";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { addSocialMediaAccount, updateUser, uploadBankInfo } from "../../helper/api";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import { selectAccountPlatform } from "../../data/selectAccountPlatform";
import { useFetchAccount } from "../../hooks/fetch.hooks";
import { bankCode } from "../../data/bankCode";
import toast from "react-hot-toast";
import Loading from "../../Components/Loading/Loading";

function Profile({ toggleMenu, menuOpen }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.data;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ userId: user?._id });

  const [platformCode, setPlatformCode] = useState('');
  const [platform, setPlatform] = useState("");
  const [ isUpdatingAccount, setIsUpdatingAccount ] = useState(false)
  const { apiAccountData, isLoadingAccount } = useFetchAccount()
  const accountData = apiAccountData?.data

  const [accountNumber, setAccountNumber] = useState()
  const [ accountValue, setAccountValue ] = useState('')
  const [getBankCode, setGetBankCode] = useState()
  const [fetchingAccountDetails, setFetchingAccountDetails] = useState(false)
  const [accountName, setAccountName] = useState('')
  const [getBankName, setGetBankName] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [updatingBankInfo, setUpdatingBankInfo] = useState(false)

    //handle get bank code:
    const handleBankCode = (e) => {
        const selectedAccount = bankCode.find(item => item.code === e.target.value)

        if(selectedAccount)
        setGetBankCode(selectedAccount.code)
        setGetBankName(selectedAccount.name)
    }

    useEffect(() => {
        //console.log(accountNumber, getBankCode)
        if(accountNumber?.length === 10 && getBankCode){
            const fetchData = async () => {
                try {
                    setFetchingAccountDetails(true)
                    setAccountName('')
                    const response = await fetch(`${import.meta.env.VITE_VERIFY_URL}?account_number=${accountNumber}&bank_code=${getBankCode}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${import.meta.env.VITE_BANK_TOKEN}` // Replace with your actual Bearer token
                        }
                    });
             
                    if (!response.ok) {
                        setFetchError('Failed to get Bank Details')
                        throw new Error(`Request failed:`);
                    }
             
                    const data = await response.json();
                    if(data?.status === true){
                        setAccountName(data?.data?.account_name)
                    }
                    console.log(data);
                } catch (error) {
                    console.log(error);
                } finally{
                    setFetchingAccountDetails(false)
                }
            };
             
            fetchData();
        }
    }, [accountNumber, getBankCode])

    const updateBankInfo = async () => {
        try {
            setUpdatingBankInfo(true)
            if(!accountName){
                toast.error('Bank Name and Account Name Needed')
                return;
            }
            if(!getBankName){
                toast.error('Bank Name and Account Name Needed')
                return;
            }
            if(!accountNumber){
                toast.error('Bank Name and Account Name Needed')
                return;
            }
            const userId = user?._id
            const res = await uploadBankInfo({userId, getBankName, accountName, accountNumber})
        } catch (error) {
            console.log('FAILED TO UPDATE BANK INFO', error)
        } finally{
            setUpdatingBankInfo(false)
        }
    }


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await updateUser(formData);
      if (res?.data.success) {
        dispatch(signInSuccess(res.data.data));
      }
    } catch (error) {
      console.log("ERROR UPDATING USER", error);
    } finally {
      setIsLoading(false);
    }
  };

  //CARD TWO
    const handleAccount = (e) => {
        const selectedOption = selectAccountPlatform.find(item => item.code === e.target.value)
        
        if(selectedOption){
        setPlatformCode(selectedOption.code)
        setPlatform(selectedOption.platform)
        }
    }

    const addAccount = async (e) => {
        e.preventDefault()
        const userId = user?._id
        try {
            if(!accountValue){
                toast.error('Enter your account url')
                return;
            }
            //check urll based on platformCode
            setIsUpdatingAccount(true)
            console.log(accountValue, platformCode)
            const res = await addSocialMediaAccount({accountValue, platformCode, userId})
            if (res?.data.success) {
                dispatch(signInSuccess(res.data.data));
            }
        } catch (error) {
            console.log('FAILED TO ADD USER ACCOUNT', error)
        } finally {
            setIsUpdatingAccount(false)
        }
    }

  return (
    <div className="container">
      <div className="menubarContainer">
        <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
      </div>

      <div className="mainContainer">
        <div className="profile">
          <h1 className="h-1">Profile</h1>
          <div className="userInfo">
            <h2>Update Account</h2>
            <p>To complete task update accounts here</p>

            <div className="content">
              <div className="inputField">
                <label>First Name</label>
                <input
                  defaultValue={user?.firstName}
                  onChange={handleChange}
                  id="firstName"
                  type="text"
                />
              </div>
              <div className="inputField">
                <label>Middle Name</label>
                <input
                  defaultValue={user?.middleName}
                  onChange={handleChange}
                  id="middleName"
                  type="text"
                />
              </div>
              <div className="inputField">
                <label>Last Name</label>
                <input
                  defaultValue={user?.lastName}
                  onChange={handleChange}
                  id="lastName"
                  type="text"
                />
              </div>
              <div className="inputField">
                <label>Username</label>
                <input
                  defaultValue={user?.username}
                  onChange={handleChange}
                  id="username"
                  type="text"
                />
              </div>
              <div className="inputField">
                <label>Email</label>
                <input
                  defaultValue={user?.email}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="inputField">
                <label>Phone Number</label>
                <input
                  defaultValue={user?.phoneNumber}
                  onChange={handleChange}
                  id="phoneNumber"
                  type="number"
                  minLength={11}
                  maxLength={11}
                />
              </div>
              <div className="inputField">
                <label>Gender ({user?.gender})</label>
                <select onChange={handleChange} id="gender">
                  <option value="">-- SELECT GENDER --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                {user?._id && (
                  <button
                    onClick={handleUpdate}
                    className={isLoading ? "active" : ""}
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Save"}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="userInfo two">
            <h2>Update Social Media Account</h2>
            <p>To perform task update your Social media account here</p>

            <form className="content" onSubmit={handleUpdate}>
              <div className="inputField">
                <label>Instagram Account</label>
                <input
                  defaultValue={user?.instagramAccount}
                  disabled
                  id="firstName"
                  type="text"
                />
              </div>
              <div className="inputField">
                <label>Facebook Account</label>
                <input
                  defaultValue={user?.facebookAccount}
                  disabled
                  id="middleName"
                  type="text"
                />
              </div>
              <div className="inputField">
                <label>Twitter(X) Account</label>
                <input
                  defaultValue={user?.twitterAccount}
                  disabled
                  id="lastName"
                  type="text"
                />
              </div>
              <div className="inputField">
                <label>Threads Account</label>
                <input defaultValue={user?.threadsAccount} disabled />
              </div>
              <div className="inputField">
                <label>Tiktok Account</label>
                <input
                  defaultValue={user?.tiktokAccount}
                  disabled
                  id="username"
                  type="text"
                />
              </div>

              <hr />
              <h2>Add Your Account here</h2>

              <div className="card">
                <div className="inputGroup">
                  <label htmlFor="">Select Type of Account</label>
                  <select onChange={handleAccount}>
                    <option value="">-- SELECT ACCOUNT --</option>
                    {selectAccountPlatform.map((item, idx) => (
                      <option key={idx} value={item.code}>
                        {item.platform}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="inputArea">
                  {platformCode === "01" && (
                    <input
                      type="text"
                      value={accountValue}
                      onChange={(e) => setAccountValue(e.target.value)}
                      placeholder="Input your Instagram account url here"
                      required
                      className="account"
                    />
                  )}
                  {platformCode === "02" && (
                    <input
                      type="text"
                      value={accountValue}
                      onChange={(e) => setAccountValue(e.target.value)}
                      placeholder="Input your Facebook account url here"
                      required
                      className="account"
                    />
                  )}
                  {platformCode === "03" && (
                    <input
                      type="text"
                      value={accountValue}
                      onChange={(e) => setAccountValue(e.target.value)}
                      placeholder="Input your Twitter account url here"
                      required
                      className="account"
                    />
                  )}
                  {platformCode === "04" && (
                    <input
                      type="text"
                      value={accountValue}
                      onChange={(e) => setAccountValue(e.target.value)}
                      placeholder="Input your Threads account url here"
                      required
                      className="account"
                    />
                  )}
                  {platformCode === "05" && (
                    <input
                      type="text"
                      value={accountValue}
                      onChange={(e) => setAccountValue(e.target.value)}
                      placeholder="Input your Tiktok account url here"
                      required
                      className="account"
                    />
                  )}
                  {platformCode === "06" && (
                    <input
                      type="text"
                      value={accountValue}
                      onChange={(e) => setAccountValue(e.target.value)}
                      placeholder="Input your Youtube account url here"
                      required
                      className="account"
                    />
                  )}
                  {platformCode === "07" && (
                    <input
                      type="text"
                      value={accountValue}
                      onChange={(e) => setAccountValue(e.target.value)}
                      placeholder="Input your Telegram number"
                      required
                      className="account"
                    />
                  )}
                </div>
              </div>

              <div>
                {user?._id && (
                  <button onClick={addAccount} className={`${isUpdatingAccount ? 'active' : ''}`} disabled={isUpdatingAccount}>
                    {isUpdatingAccount ? "Updating..." : "Add Account"}
                  </button>
                )}
              </div>

              {/**Account info */}
              <div className="card bankInfo">
                <div className="inputGroup">
                  <label htmlFor="">Update Your Account Information</label>
                </div>
                {
                  <div className="bankInfo">
                    {isLoadingAccount ? (
                        <Loading />
                        ) : (
                            <>
                                <p>
                                Account Name: <span>{accountData?.accountName}</span>
                                </p>
                                <p>
                                Account Name:{" "}
                                <span>{accountData?.accountNumber}</span>
                                </p>
                                <p>
                                Account Name: <span>{accountData?.bankName}</span>
                                </p>
                            </>

                        )
                    }
                  </div>
                }

                <div className="inputArea accountInfo">
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (input.length <= 10 && /^\d*$/.test(input)) {
                        setAccountNumber(input);
                      }
                    }}
                    required
                    placeholder="Enter Account Number"
                    disabled={fetchingAccountDetails}
                  />
                  <div className="inputGroup">
                    <label htmlFor="">Select Bank</label>
                    <select
                      onChange={handleBankCode}
                      disabled={fetchingAccountDetails}
                    >
                      <option value="">-- SELECT ACCOUNT --</option>
                      {bankCode.map((item, idx) => (
                        <option key={idx} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="displayAcountInfo">
                    {fetchingAccountDetails && (
                      <span className="success para bold">Fetching account Details...</span>
                    )}
                    {accountName && (
                      <div style={{display: 'flex', flexDirection: 'column'}}>
                        <span>{accountName}</span>
                        <span>{getBankName}</span>
                      </div>
                    )}
                    {fetchError && !fetchingAccountDetails && !accountName && <span className="danger" >{fetchError}</span>}
                  </p>
                </div>
              </div>

              <div>
                {user?._id && (
                  <button className={`${updatingBankInfo ? 'active' : ''}`} onClick={updateBankInfo} disabled={updatingBankInfo}>
                    {updatingBankInfo ? "Updating..." : "Update Account"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="asideContainer">
        <Aside toggleMenu={toggleMenu} />
      </div>
    </div>
  );
}

export default Profile;
