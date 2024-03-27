import { useState } from 'react';
import './CreateTask.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';

function CreateTask() {
  const {currentUser} = useSelector(state => state.user)
  const user = currentUser?.data
  console.log('ID', user._id)
  const [ formData, setFormData ] = useState({ createdBy: user?._id })
  
  const handleChange = () => {
    setFormData({...formData, [e.target.id]: e.target.value })
  }
  return (
    <div className='createTask'>
      <div className="back">
          <ArrowBackIcon className='backIcon' />
      </div>
      <div className="title">
        Supergig
      </div>

      <div className="content">
        <h2 className='head'>Create Task</h2>

        <div className="body">
          
        </div>
      </div>
    </div>
  )
}

export default CreateTask