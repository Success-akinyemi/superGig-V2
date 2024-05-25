import { useEffect, useState } from 'react';
import '../CreateTask.css'
import { useDispatch, useSelector } from 'react-redux';
import { useFetchAllSocialMediaCategory, useFetchSocialMediaTask } from '../../../hooks/fetch.hooks';
import Select from '../../../Components/Select/Select';
import { createTask } from '../../../helper/api';
import { signInSuccess } from '../../../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function SocialMedia({content, setContent}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    //Error state
    const [ noPlatform, setNoplatform ] = useState('')
    const [ noTask, setNoTask ] = useState('')
    const [ noTaskUrl, setNoTaskUrl ] = useState('')
    const [ noWorkers, setNoWorkers ] = useState('')
  
    //loading State
    const [ isLaoding, setIsLoading ] = useState(false)
  
  
    const [ taskFormHeading, setTaskformHeading ] = useState('Create Task')
    //const [ content, setContent ] = useState(1)
    const [ formData, setFormData ] = useState({ createdBy: user?._id })

    const { isLoadingSocialMediaCategory, SocialMediaCategoryData } = useFetchAllSocialMediaCategory();
    const socialMediaData = SocialMediaCategoryData?.data
    //console.log(socialMediaData)
    const { isLoadingSocialMediaTaskData, socialMediaTaskData } = useFetchSocialMediaTask()
    const socialMediaTask = socialMediaTaskData?.data
    //console.log(socialMediaTask)
    
  
    const [selectedTaskCategory, setSelectedTaskCategory] = useState('');
    
    const [selectedPlatform, setSelectedPlaform] = useState('')
    const [selectedSocialMediaData, setSelectedSocialMediaData] = useState([]);
  
    useEffect(() => {
      if(selectedPlatform){
          const trimmedSelectedTaskCategory = selectedPlatform;
          //console.log('selectedPlatform', trimmedSelectedTaskCategory)
          const filterSocialMediaData = socialMediaTask?.filter(socialMediaTask => socialMediaTask?.platformCode === trimmedSelectedTaskCategory)
          setSelectedSocialMediaData(filterSocialMediaData)
          //console.log('DATA',selectedSocialMediaData)
      } else {
          setSelectedSocialMediaData([])
      }
    }, [selectedPlatform, socialMediaTask])
  
    const handleChange = (e) => {
      const { id, value } = e.target
      const updatedFormData = {
        ...formData,
        [id]: id === 'numberOfWorkers' ? parseInt(value, 10) : value
      };
    
      setFormData(updatedFormData);
      if(id === 'categoryCode'){
        setSelectedTaskCategory(value)
      }
  
      if(id === 'platformCode'){
        setSelectedPlaform(value)
      }
    }
  
    const handleBack = () => {
      setContent(content === 1 ? 1  : content - 1)
    }
  
    const handleNextSlide = (prop) => {
      if(prop === 'two'){
        if(!formData.platformCode){
          setNoplatform('Select a platfom ')
          setTimeout(() => setNoplatform(null), 4000)
          return
        }
        if(!formData.platform){
          setNoplatform('Select a platfom ')
          setTimeout(() => setNoplatform(null), 4000)
          return
        }
        setContent(3)
      }
      if(prop === 'three'){
        if(!formData.task && !!formData.platform){
          setNoTask('Select a task')
          setTimeout(() => setNoTask(null), 4000)
          return
        }
        if(!formData.taskUrl){
          setNoTaskUrl('Enter Task URL/Link')
          setTimeout(() => setNoTaskUrl(null), 4000)
          return
        }
        setContent(4)
      }
      if(prop === 'four'){
        if(!formData.numberOfWorkers){
          setNoWorkers('Enter number of workers needed')
          setTimeout(() => setNoWorkers(null), 4000)
          return
        }
        if(formData.numberOfWorkers < formData.minWorkers){
          setNoWorkers(`minimium workers needed is: ${formData.minWorkers}`)
          setTimeout(() => setNoWorkers(null), 4000)
          return
        }
        setContent(5)
        setTaskformHeading('Task Description')
      }
    }
  
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
  
    const handleTask = (e, taskOption) => {
      const selectedTask = taskOption.find(item => item.taskId === e.target.value);
  
      if(selectedTask){
        setFormData({...formData, task: selectedTask.task, taskId: selectedTask.taskId, unitPrice: selectedTask.unitPrice, pricePerFreelancer: selectedTask.pricePerFreelancer, minWorkers: selectedTask.minWorkers})
      }
    };
  
    const handlePlatform = (e, taskOption) => {
      const selectedTask = taskOption.find(item => item.code === e.target.value);
  
      if(selectedTask){
        setFormData({...formData, platformCode: selectedTask.code, platform: selectedTask.platform, icon: selectedTask.icon })
        setSelectedPlaform(selectedTask.code)
      }
    };
  
    useEffect(() => {
      console.log('formData', formData)
    }, [formData])

  return (
    <div style={{width: '100%'}}>
         {
            content === 2 && (
                <div className='contentCard'>
                    <div className="card">
                    <label>Select Platform</label>
                    <Select 
                    data={socialMediaData}
                    onChange={(e) => handlePlatform(e, socialMediaData)}
                    //id={`platformCode`}
                    value={`code`}
                    text={`platform`}
                    heading= {`Select Platform`}
                    />
                </div>

                    <p className='danger errorMsg'>{noPlatform ? noPlatform : ''}</p>
                    <div className='btn'>
                    <button onClick={() => handleNextSlide('two')}>
                        Proceed
                    </button>
                    </div>
                </div>
            )}
                  {
            content === 3 && (
              <div className="contentCard">
                <div className="card">
                  <label>Select Task</label>
                  <Select 
                    data={selectedSocialMediaData}
                    onChange={(e) => handleTask(e, selectedSocialMediaData)}
                    //id={``}
                    value={`taskId`}
                    text={`task`}
                    heading= {`Select Task`}
                  />
                </div>  
                <p className='danger errorMsg'>{noTask ? noTask : ''}</p>
                
                <div className="card">
                  <label>Enter Task URL (Link)</label>
                  <input type="text" onChange={handleChange} id='taskUrl' placeholder='Enter Task Url' />
                </div>
                <p className='danger errorMsg'>{noTaskUrl ? noTaskUrl : ''}</p>
                
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
                  <label>Enter Number of workers needed</label>
                  <input type="number" onChange={handleChange} id='numberOfWorkers' placeholder='Enter Number of Workers Needed' />
                </div>
                <p className='danger errorMsg'>{noWorkers ? noWorkers : ''}</p>
                
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

export default SocialMedia