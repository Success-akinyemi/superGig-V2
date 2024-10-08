import './NewMusicTask.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchAllMusicPlatform } from '../../hooks/fetch.hooks';
import { newMusicTask } from '../../helper/api';

function NewMusicTask() {
    const { currentUser } = useSelector((state) => state.user);
    const user = currentUser?.data;
    const { isLoadingMusicPlatform, musicPlatformData } = useFetchAllMusicPlatform()
    const musicData = musicPlatformData?.data
    //console.log('AAAAAA',musicData)
    const [ formData, setFormData ] = useState({createdBy: user?._id})
    const [ isloading, setIsLoading ] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value})
    }

    useEffect(() => {console.log(formData)}, [formData])
    const handleNewTask = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await newMusicTask(formData)
        } catch (error) {
            console.log('Unable to create music task', error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <form onSubmit={handleNewTask} className='newMusicTask'>
                <div className="warning">
            <p>. Note taskId must continue from last one</p>
        </div>
        <div className="inputGroup">
            <label>Select Platform</label>
            <select id='platformCode' onChange={handleChange}>
                <option value="">-- SELECT PLATFORM --</option>
                {
                    musicData?.map((item) => (
                        <option value={item?.code}>{item?.platform}</option>
                    ))
                }
            </select>
        </div>

        <div className="inputGroup">
            <label>Enter Task Id</label>
            <input onChange={handleChange} type="text" id="taskId" placeholder='enter task id' />
        </div>

        <div className="inputGroup">
            <label>Enter Task</label>
            <input onChange={handleChange} type="text" id="task" placeholder='enter task' />
        </div>

        <div className="inputGroup">
            <label>Enter Task unit Price</label>
            <input onChange={handleChange} type="number" id="unitPrice" placeholder='enter unit Price' />
        </div>

        <div className="inputGroup">
            <label>Enter Freelancer price</label>
            <input onChange={handleChange} type="number" id="pricePerFreelancer" placeholder='enter Freelancer price' />
        </div>

        <div className="inputGroup">
            <label>Enter Minimium workers needed</label>
            <input onChange={handleChange} type="number" id="minWorkers" placeholder='enter min workers' />
        </div>

        <div className="btn">
            <button disabled={isloading} className='button'>
                {isloading ? 'Uploading' : 'Upload'}
            </button>
        </div>
    </form>
  )
}

export default NewMusicTask