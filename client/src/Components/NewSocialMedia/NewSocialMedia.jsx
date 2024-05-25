import { useEffect, useRef, useState } from 'react'
import './NewSocialMedia.css'
import { useSelector } from 'react-redux'
import { app } from '../../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { newSocialMediaPlatform } from '../../helper/api'


function NewSocialMedia() {
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const [ formData, setFormData ] = useState({ createdby: user?._id })
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
              setFormData({ ...formData, icon: downloadURL })
            );
          }
        );
      };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleNewSocialmedia = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            console.log(formData)
            const res = await newSocialMediaPlatform(formData)
        } catch (error) {
            console.log('Unable to create new social media platform::', error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <form className='newSocialMedia' onSubmit={handleNewSocialmedia}>
        <div className="inputGroup">
            <label>Platform Name</label>
            <input onChange={handleChange} type="text" id="platform" placeholder='Enter Platform name' />
        </div>
        <div className="inputGroup">
            <label>Platform code</label>
            <input onChange={handleChange} type="text" id="code" placeholder='Enter Platform code' />
        </div>
        <div className="inputGroup">
            <label>Task category code</label>
            <input onChange={handleChange} type="text" id="taskCategoryCode" placeholder='Enter 1' />
        </div>

        <div className="imgGroup" onClick={() => fileRef.current.click()} >
              {
                formData.proofImg ? (
                  <img className='screenshootImg' src={formData.icon} />
                ) : (
                  <h5>Upload Social media icon (Tap to Upload)</h5>
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
        {
            imageUploadProgress > 0 && (
                <p className='uploadStats'>Uploading: {imageUploadProgress}</p>
            )
        }
                {
            imageError && (
                <p className='uploadStats error'>Error Uplaoding image</p>
            )
        }

        <div className="submitBtn">
            <button onClick={handleNewSocialmedia} disabled={isLoading} >
                {isLoading ? 'Uploading' : 'Upload'}
            </button>
        </div>

    </form>
  )
}

export default NewSocialMedia