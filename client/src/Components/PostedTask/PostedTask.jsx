import React, { useState } from 'react'
import TaskTable from '../TaskTable/TaskTable'
import { useFetchTaskPostedByUser } from '../../hooks/fetch.hooks'
import './PostedTask.css'

function PostedTask() {
    const { apiTaskData, taskServerError, isLoadingTask } = useFetchTaskPostedByUser()
    const allTask = apiTaskData?.data
    const sortedData = allTask?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    //console.log('DATA POSTED', sortedData)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)

        // Calculate the total number of pages
        const totalPages = Math.ceil(sortedData?.length / itemsPerPage)

        // Change page
        const paginate = (pageNumber) => {
            setCurrentPage(pageNumber)
        }
    
        // Go to previous page
        const goToPrevPage = () => {
            setCurrentPage(prevPage => prevPage - 1)
        }
    
        // Go to next page
        const goToNextPage = () => {
            setCurrentPage(prevPage => prevPage + 1)
        }

        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const currentItems = sortedData?.slice(indexOfFirstItem, indexOfLastItem)
    

   
  return (
    <div className='postedTask'>
        <TaskTable 
            data={currentItems}
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

        {
          !isLoadingTask && (
            <div className="pagination">
                    <button onClick={goToPrevPage} disabled={currentPage === 1}>Prev</button>
                    <span>{currentPage} / {totalPages}</span>
                    <button onClick={goToNextPage} disabled={currentPage === totalPages || totalPages <= 0}>Next</button>
            </div>
          )
        }
    </div>
  )
}

export default PostedTask