import { useFetchTaskCompletedByUser } from '../../hooks/fetch.hooks'
import TaskTable from '../TaskTable/TaskTable'
import './CompletedTask.css'

function CompletedTask() {
    const { isLoadingTask, apiTaskData, taskServerError } = useFetchTaskCompletedByUser()
    const allTask = apiTaskData?.data
    const sortedData = allTask?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className='completedTask' >
        <TaskTable
            data={sortedData}
            error={taskServerError}
            isLoading={isLoadingTask}
            th1={''}
            th2={''}
            th3={'Earning'}
            th4={'Job Description'}
            th5={'Completion'}
            th6={''}

            td1={`icon`}
            td2={`platform`}
            td3={`pricePerFreelancer`}
            td4={'task'}
            td5={`completedRate`}

            no={`numberOfWorkers`}

            //pageLink={'taskPoint'}
        />
    </div>
  )
}

export default CompletedTask