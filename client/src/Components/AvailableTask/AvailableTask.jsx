import { useEffect, useState } from 'react'
import { useFetchTask } from '../../hooks/fetch.hooks'
import TaskTable from '../TaskTable/TaskTable'
import './AvailableTask.css'

function AvailableTask() {
    const { isLoadingTask, apiTaskData, taskServerError } = useFetchTask()
    const allTask = apiTaskData?.data
    const sortedData = allTask?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
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
    <div className='availableTask'>
        <TaskTable 
            data={currentItems}
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

        {
          !isLoadingTask && (
            <div className="pagination">
                    <button onClick={goToPrevPage} disabled={currentPage === 1}>Prev</button>
                    <span>{currentPage} / {totalPages}</span>
                    <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          )
        }
    </div>
  )
}

export default AvailableTask