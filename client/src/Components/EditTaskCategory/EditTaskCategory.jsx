import { useState } from 'react'
import './EditTaskCategory.css'
import { updateTaskCategory } from '../../helper/api'
import { useSelector } from 'react-redux';
import { useFetchAllTaskCategory } from '../../hooks/fetch.hooks';

function EditTaskCategory({editTaskId}) {
    const { isLoadingTaskCategoryData, taskCategoryData } = useFetchAllTaskCategory()
    const data = taskCategoryData?.data
    const task = data?.find(task => task._id === editTaskId);
    console.log('TASK', task)

    const { currentUser } = useSelector((state) => state.user);
    const user = currentUser?.data;
    const [ isUpdating, setIsUpdating ] = useState(false)
    const [ formData, setFormData ] = useState({ id: editTaskId, createdby: user?._id })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value})
    }

    const handleUpdate = async () => {
        try {
            setIsUpdating(true)
            const res = await updateTaskCategory(formData)
        } catch (error) {
            console.log('UNABLE TO UPDTAE CATEGORY:', error)
        } finally {
            setIsUpdating(false)
        }
    }
  return (
    <form onSubmit={handleUpdate} className='editTaskCategory'>
        EditTaskCategory {editTaskId}
        <div className="inputGroup">
            <label>Enter Task code</label>
            <input onChange={handleChange} type="text" id="code" placeholder='enter task code' defaultValue={task?.code} />
        </div>

        <div className="inputGroup">
            <label>Enter Task category</label>
            <input onChange={handleChange} type="text" id="category" placeholder='enter task category' defaultValue={task?.category} />
        </div>

        <div className="btn">
            <button disabled={isUpdating} className='button'>
                {isUpdating ? 'Uploading' : 'Upload'}
            </button>
        </div>
    </form >
  )
}

export default EditTaskCategory