import { useEffect, useState } from 'react';
import '../CreateTask.css'
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../../Components/Select/Select';
import { createTask } from '../../../helper/api';
import { signInSuccess } from '../../../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function CustomTask({content, setContent, setTaskformHeading}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ taskTitle, setTaskTitle ] = useState()
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const icon = import.meta.env.VITE_CUSTOM_TASK_ICON
    const [ formData, setFormData ] = useState({ createdBy: user?._id, platform: `Custom Task: ${taskTitle ? taskTitle : ''}`, platformCode: '101', icon: icon, categoryCode: 4})
    const [ noTask, setNoTask ] = useState('')
    const [ noTaskUrl, setNoTaskUrl ] = useState('')
    const [ noWorkers, setNoWorkers ] = useState('')
    const [ noPrice, setNoPrice ] = useState('')

    const [ isLaoding, setIsLoading ] = useState(false)


    const minPrice = parseInt(import.meta.env.VITE_CUSTOM_TASK_PRICE, 10);
    //setFormData({...formData, platform: `Custom Task: ${taskTitle ? taskTitle : ''}`})

    const handleNextSlide = (prop) => {
        if(prop === 'two'){
          if(!formData.numberOfWorkers){
            setNoWorkers('Enter number of freelancers needed')
            setTimeout(() => setNoWorkers(null), 4000)
            return
          }
          setContent(3)
        }
        if(prop === 'three'){
          if(!formData.unitPrice){
            setNoPrice('Enter price to be paid to each freelancer')
            setTimeout(() => setNoPrice(null), 4000)
            return
          }
          if(formData.unitPrice < minPrice){
            setNoPrice('Minimium price for freelancers is 70.')
            setTimeout(() => setNoPrice(null), 4000)
            return
          }
          setContent(4)
        }
        if(prop === 'four'){
          if(!formData.taskUrl){
            setNoTaskUrl('Enter number of workers needed')
            setTimeout(() => setNoTaskUrl(null), 4000)
            return
          }
          if(!formData.task){
            setNoTask(`Enter task instructions`)
            setTimeout(() => setNoTask(null), 4000)
            return
          }
          setContent(5)
          setTaskformHeading('Task Description')
        }
      }

      useEffect(() => {
        setFormData(prevData => ({
          ...prevData,
          platform: `Custom Task: ${taskTitle}`,
        }));
      }, [taskTitle]);

    const handleCreateNewTask = async () => {
        if(formData.unitPrice < minPrice){
            toast.error('Minimium price for freelancers is 70.')
            return;
        }
        if(formData.numberOfWorkers * formData.unitPrice > user.fundWallet){
          toast.error('Insufficient Balance to create task.')
          return;
        }
        try {
            if(taskTitle){
                setFormData({...formData, platform: `Custom Task: ${taskTitle ? taskTitle : ''}`})
            }
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
       setFormData({...formData, [e.target.id]: e.target.value})
    }

  return (
    <div style={{width: '100%'}}>
         {
            content === 2 && (
                <div className='contentCard'>
                <div className="card">
                    <label>Enter Number of freelancers needed</label>
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
                    <label>Enter Price to be paid to each freelancers</label>
                    <input type="number" onChange={handleChange} id='unitPrice' placeholder='Enter Price to be paid to each worker' />
                </div>
              <p className='danger errorMsg'>{noPrice ? noPrice : ''}</p>
              
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
                  <label>Enter Task Title</label>
                  <input type="text" onChange={(e) => setTaskTitle(e.target.value)} value={taskTitle} placeholder='What do you want to do' />
                </div>
            
                <div className="card">
                  <label>Enter Task URL (Link)</label>
                  <input type="text" onChange={handleChange} id='taskUrl' placeholder='Enter Task Url' />
                </div>
                <p className='danger errorMsg'>{noTaskUrl ? noTaskUrl : ''}</p>
                
                <div className="card">
                  <label>Enter Task Instruction</label>
                  <input type="text" onChange={handleChange} id='task' placeholder='Enter Task instructions' />
                </div>
                <p className='danger errorMsg'>{noTask ? noTask : ''}</p>
                
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