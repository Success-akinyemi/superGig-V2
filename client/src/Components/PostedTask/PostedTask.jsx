import React, { useState } from 'react'
import TaskTable from '../TaskTable/TaskTable'
import { useFetchTaskPostedByUser } from '../../hooks/fetch.hooks'

function PostedTask() {
    const { apiTaskData, taskServerError, isLoadingTask } = useFetchTaskPostedByUser()
    const allTask = apiTaskData?.data
    const sortedData = allTask?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    //console.log('DATA POSTED', sortedData)
   
  return (
    <div className='postedTask'>
        <TaskTable 
            data={sortedData}
            error={taskServerError}
            isLoading={isLoadingTask}
            th1={''}
            th2={''}
            th3={'Amount'}
            th4={'Job Description'}
            th5={'Completion'}
            th6={''}

            td1={`icon`}
            td2={`platform`}
            td3={`unitPrice`}
            td4={'task'}
            td5={`completedRate`}

            no={`numberOfWorkers`}
            total={true}

            pageLink={'postedTask'}
        />
    </div>
  )
}

export default PostedTask