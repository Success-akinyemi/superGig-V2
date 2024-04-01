import { useEffect, useState } from 'react'
import { useFetchTask } from '../../hooks/fetch.hooks'
import TaskTable from '../TaskTable/TaskTable'
import './AvailableTask.css'

function AvailableTask() {
    const { isLoadingTask, apiTaskData, taskServerError } = useFetchTask()
    const allTask = apiTaskData?.data
    const sortedData = allTask?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className='availableTask'>
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

            pageLink={'taskPoint'}
        />
    </div>
  )
}

export default AvailableTask