import { useLocation, useNavigate } from 'react-router-dom'
import Aside from '../../Components/Aside/Aside'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './TaskPage.css'
import { useSelector } from 'react-redux'
import { useFetchTask } from '../../hooks/fetch.hooks'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function TaskPage({toggleMenu, menuOpen, setSelectedCard, setTaskId, setUserProfile }) {
    const navigate = useNavigate()
    const [ taskClicked, setTaskClicked ] = useState(false)
    
    const loc = useLocation()
    const id = loc.pathname.split('/')[2]
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data

    const { isLoadingTask, apiTaskData, taskServerError } = useFetchTask(id)
    const task = apiTaskData?.data
    //console.log('TASK ID', task)

    useEffect(() => {
        if (task && (task.approvedWorkers.some(worker => worker.freelancerId === user._id) || task.rejectedWorkers.some(worker => worker.freelancerId === user._id))) {
            navigate('/taskPoint'); 
        }
    }, [task, user._id]);    

    let userHasAccount
    const platformCode = task?.platformCode
    if(platformCode === '01'){
      userHasAccount = user.instagramAccount
      if(!userHasAccount){
        //toast.error(`Update Your ${task?.platform} Account to Perform task`)
        toast.error(`Update Your Social media Account to Perform task`)
        navigate('/profile')
      }
    }
    if(platformCode === '02'){
      userHasAccount = user.facebookAccount
      if(!userHasAccount){
        //toast.error(`Update Your ${task?.platform} Account to Perform task`)
        toast.error(`Update Your Social media Account to Perform task`)
        navigate('/profile')
      }
    }
    if(platformCode === '03'){
      userHasAccount = user.twitterAccount
      if(!userHasAccount){
        //toast.error(`Update Your ${task?.platform} Account to Perform task`)
        toast.error(`Update Your Social media Account to Perform task`)
        navigate('/profile')
      }
    }
    if(platformCode === '04'){
      userHasAccount = user.threadsAccount
      if(!userHasAccount){
        //toast.error(`Update Your ${task?.platform} Account to Perform task`)
        toast.error(`Update Your Social media Account to Perform task`)
        navigate('/profile')
      }
    }
    if(platformCode === '05'){
      userHasAccount = user.tiktokAccount
      if(!userHasAccount){
        //toast.error(`Update Your ${task?.platform} Account to Perform task`)
        toast.error(`Update Your Social media Account to Perform task`)
        navigate('/profile')
      }
    }

    const percent = (task?.completedRate * 100) / task?.numberOfWorkers

    const handleSubmitTask = () => {
        if(taskClicked){
            setSelectedCard('submitTaskForm')
            setTaskId(id)
            setUserProfile(userHasAccount)
        }
    }

    return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className="taskPage">
                <h1 className='h-1' >Task Page</h1>
                {
                    isLoadingTask ? (
                        ''
                    ) : (
                        <>
                            <div className="card">
                                <span>
                                    <p>Platform:</p>
                                    <p className='platform'>
                                        <img src={task?.icon} alt='icon' className='icon' />
                                        {task?.platform}
                                    </p>
                                </span>
                                <span>
                                    <p>Task:</p>
                                    <p>{task?.task}</p>
                                </span>
                                <span>
                                    <p>Completion Rate:</p>
                                    <p>
                                        {task?.completedRate} / {task?.numberOfWorkers}
                                        <small className={percent < 85 ? 'success' : 'warning'} >{percent}%</small>
                                    </p>
                                </span>
                                <span>
                                    <p>Status</p>
                                    <p className={task?.completedRate < task?.numberOfWorkers ? 'success' : 'danger'}>{task?.completedRate < task?.numberOfWorkers ? 'Active' : 'Inactive'}</p>
                                </span>
                                <span>
                                    <p></p>
                                    <p></p>
                                </span>

                                <p className="para danger">
                                All jobs must be done properly before submitting failure to complete jobs can lead to permanent ban of account
                                </p>

                                <div className="btn">
                                    <button onClick={() => setTaskClicked(true)}><a className='link' target='_blank' href={`${task?.taskUrl}`}>Start Job</a></button>
                                </div>
                            </div>

                            <div className="proof">
                                <button className={`${taskClicked ? 'done' : ''}`} disabled={taskClicked === false} onClick={handleSubmitTask}>
                                    { taskClicked ? 'Submit proof of work' : 'Click on Start Job'}
                                </button>
                            </div>
                        </>
                    )
                }

            </div>
        </div>

        <div className="asideContainer">
            <Aside toggleMenu={toggleMenu} />
        </div>
    </div>
  )
}

export default TaskPage