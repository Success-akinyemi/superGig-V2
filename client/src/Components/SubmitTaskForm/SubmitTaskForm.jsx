import './SubmitTaskForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { app } from '../../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import toast from 'react-hot-toast'
import { submitTask } from '../../helper/api'
import { signInSuccess } from '../../redux/user/userSlice'

function SubmitTaskForm({id, userProfile, redirectToTaskPoint}) {
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const userID = user._id
    const [formData, setFormData] = useState({});
    const [image, setImage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false) 
    const [imageError, setImageError] = useState(false);
    const [imageUploadProgress, setImageUploadProgress] = useState(0);

    const fileRef = useRef(null);
    useEffect(() => {
      if (image) {
        handleFileUpload(image);
      }
    }, [image]);
  
    const handleFileUpload = async (image) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          const progress =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          setImageUploadProgress(Math.round(progress));
        },
        (error) => {
          //console.log('ERROR', error)
          setImageError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData({ ...formData, proofImg: downloadURL })
          );
        }
      );
    };

    useEffect(() => {
      setFormData({...formData, userProfile, taskId: id, userId: userID })
    }, [userProfile, id, userID])

    const handleSubmitTask = async () => {
      try {
        if(!formData.proofImg){
          toast.error('Upload job screenshot')
        }
        setIsLoading(true)
        const res = await submitTask(formData)
        console.log('RES', res)
        if(res?.data.success){
          toast.success('Job Submitted Successful')
          dispatch(signInSuccess(res.data.data))
          window.location.reload();
          //window.location.href('/taskPoint')
          //navigate('/')
          //redirectToTaskPoint()
        }
      } catch(error){
        console.log('FAILED TO SUBMIT TASK', error)
      }finally {
        setIsLoading(false)
      }
    }

  return (
    <div className='submitTaskForm'>
        <h3 className="h-3">Submit Task Form</h3>
        <p><b>Platform:</b></p>
        <div className="top">
            <div className="inputGroup">
                <label htmlFor="">Username:</label>
                <input value={userProfile} disabled type="text" />
            </div>

            <div className="middle" onClick={() => fileRef.current.click()} >
              {
                formData.proofImg ? (
                  <img className='screenshootImg' src={formData.proofImg} />
                ) : (
                  <h5>Upload ScreenShot (Tap to Upload)</h5>
                )
              }
              <input
                type="file"
                hidden
                ref={fileRef}
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <p className='danger'>
              {
                imageError && (
                  'Error Uploading Image (file size must be less than 2 MB)'
                )
              }
            </p>

            <div className={`submitBtn ${image ? 'bg' : ''} ${imageUploadProgress === 100 ? 'done' : ''}`}>
              {
                image && (
                  <>
                    {console.log('op', imageUploadProgress)}
                      <span className="text">
                        {
                          formData.proofImg && imageUploadProgress === 100 ? (
                            ''
                          ) : (
                            <>
                              Uploading({imageUploadProgress}%)...
                            </>
                          )
                        }
                      </span>
                    <button disabled={!formData.proofImg && imageUploadProgress !== 100 && isLoading} onClick={handleSubmitTask} style={{width: `${imageUploadProgress}%`}} className={`btn ${formData.proofImg && imageUploadProgress === 100 ? 'finishBtn' : ''}`} >
                      {
                        formData.proofImg && imageUploadProgress === 100 && (
                          isLoading ? (
                            <div className="circle"></div>
                          ) : (
                            'Submit'
                          )
                        )
                      }
                    </button>
                  </>
                )
              }
            </div>

        </div>
    </div>
  )
}

export default SubmitTaskForm