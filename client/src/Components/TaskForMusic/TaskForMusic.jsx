import { useFetchGetAllMusicTask } from '../../hooks/fetch.hooks'
import './TaskForMusic.css'

function TaskForMusic({platformCode, setSelectedCard}) {
    const { isLoadingMusicTaskData, musicTaskData } = useFetchGetAllMusicTask({code: platformCode})
    const data = musicTaskData?.data

  return (
    <div className='taskForMusic'>
                <div className="top">
            <h2>All Task {platformCode}</h2>
            <div className="btn" onClick={() => setSelectedCard('newMusicTask')}>
                <button>Add New</button>
            </div>
        </div>

        <div className="bodyItem">
            <div className="head">
                <h3>Task Id</h3>
                <h3>Task</h3>
                <h3>Unit Price</h3>
                <h3>Freelancer Price</h3>
                <h3>Min workers</h3>
                <h3></h3>
            </div>
            {
                data?.map((item) => (
                    <div className="card">
                        <div>{item?.taskId}</div>
                        <div>{item?.task}</div>
                        <div>{item?.unitPrice}</div>
                        <div>{item?.pricePerFreelancer}</div>
                        <div>{item?.minWorkers}</div>
                        <div className="edit">
                            <button>Edit</button>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default TaskForMusic