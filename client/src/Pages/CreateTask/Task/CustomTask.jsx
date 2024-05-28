import { useEffect, useState } from 'react';
import '../CreateTask.css'
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../../Components/Select/Select';
import { createTask } from '../../../helper/api';
import { signInSuccess } from '../../../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function CustomTask({content, setContent}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const [ formData, setFormData ] = useState({ createdBy: user?._id, platform: 'Custom Task', platformCode: '101' })

    const handleCreateNewTask = async () => {
        if(formData.numberOfWorkers * formData.unitPrice > user.fundWallet){
          toast.error('Insufficient Balance to create task.')
          return;
        }
        try {
          console.log(formData)
          setIsLoading(true)
          const res =  await createTask(formData)
          if(res){
            dispatch(signInSuccess(res.data.data))
            navigate('/dashboard')
          }
        } catch (error) {
          console.log('UNABLE TO CREATE TASK', error)
        } finally {
          setIsLoading(false)
        }
      }

      useEffect(() => {
        console.log('formData', formData)
      }, [formData])

      const handleChange = (e) => {
        const { id, value } = e.target
        const updatedFormData = {
          ...formData,
          [id]: id === 'numberOfWorkers' ? parseInt(value, 10) : value
        };
    }
    
  return (
    <div style={{width: '100%'}}>
         {
            content === 2 && (
                <div className='contentCard'>
                <div className="card">
                    <label>Enter Number of workers needed</label>
                    <input type="number" onChange={handleChange} id='numberOfWorkers' placeholder='Enter Number of Workers Needed' />
                </div>
              <p className='danger errorMsg'>{noWorkers ? noWorkers : ''}</p>
              
              <div className='btn'>
                <button onClick={() => handleNextSlide('two')}>
                  Proceed
                </button>
              </div>
            </div> 
            )}
                  {
            content === 3 && (
                <div className='contentCard'>
                <div className="card">
                    <label>Enter Price to be paid to each worker</label>
                    <input type="number" onChange={handleChange} id='unitPrice' placeholder='Enter Price to be paid to each worker' />
                </div>
              <p className='danger errorMsg'>{noWorkers ? noWorkers : ''}</p>
              
              <div className='btn'>
                <button onClick={() => handleNextSlide('three')}>
                  Proceed
                </button>
              </div>
            </div> 
            )
          }

          {
            content === 4 && (
              <div className='contentCard'>
                <div className="card">
                  <label>Enter Task URL (Link)</label>
                  <input type="text" onChange={handleChange} id='taskUrl' placeholder='Enter Task Url' />
                </div>
                <p className='danger errorMsg'>{noTaskUrl ? noTaskUrl : ''}</p>
                
                <div className='btn'>
                  <button onClick={() => handleNextSlide('four')}>
                    Proceed
                  </button>
                </div>
              </div>  
            )
          }

          {
            content === 5 && (
              <div className='contentCard'>
                <div className="card cardList">
                  <span className="info"><p className="name">Platform:</p> <p className="text">{formData.platform}</p></span>
                  <span className="info"><p className="name">Task:</p> <p className="text">{formData.task}</p></span>
                  <span className="info"><p className="name">Workers Needed:</p> <p className="text">{formData.numberOfWorkers}</p></span>
                  <hr />
                  <span className="info"><p className="name">Total:</p> <p className="text">{formData.numberOfWorkers * formData.unitPrice}</p></span>
                </div>
                
                <div className='btn'>
                  {
                    isLaoding ? (
                      <button className='spinBtn' disabled>
                        <div className="spinner"></div>
                      </button>
                    ) : (
                      <button className='create' onClick={handleCreateNewTask}>
                        Create
                      </button>
                    )
                  }
                </div>
              </div>  
            )
          }
    </div>
  )
}

export default CustomTask