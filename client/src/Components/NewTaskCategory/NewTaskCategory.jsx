import { useState } from 'react'
import './NewTaskCategory.css'
import { useSelector } from 'react-redux';
import { newTaskCategory } from '../../helper/api';

function NewTaskCategory() {
    const { currentUser } = useSelector((state) => state.user);
    const user = currentUser?.data;
    const [ formData, setFormData ] = useState({createdby: user?._id})
    const [ isloading, setIsLoading ] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value})
    }

    const handleNewCategory = async () => {
        try {
            setIsLoading(true)
            const res = await newTaskCategory(formData)
        } catch (error) {
            console.log('UNABLE TO CREATE TASK', error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <form onSubmit={handleNewCategory} className='newTaskCategory'>
        <div className="warning">
            <p>. Note taskId must continue from last one</p>
        </div>
        <div className="inputGroup">
            <label>Enter Task code</label>
            <input onChange={handleChange} type="text" id="code" placeholder='enter task id' />
        </div>

        <div className="inputGroup">
            <label>Enter Task category</label>
            <input onChange={handleChange} type="text" id="category" placeholder='enter task category' />
        </div>

        <div className="btn">
            <button disabled={isloading} className='button'>
                {isloading ? 'Uploading' : 'Upload'}
            </button>
        </div>
    </form>
  )
}

export default NewTaskCategory