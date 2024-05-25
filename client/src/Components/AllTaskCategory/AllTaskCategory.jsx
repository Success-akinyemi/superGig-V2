import { useFetchAllTaskCategory } from '../../hooks/fetch.hooks';
import './AllTaskCategory.css'

function AllTaskCategory({setSelectedCard, setEditTaskId}) {
    const { isLoadingTaskCategoryData, taskCategoryData } = useFetchAllTaskCategory();
    const data = taskCategoryData?.data
    const handleEditTask = (id) => {
        setEditTaskId(id)
        setSelectedCard('editTaskCategory')
    }
  return (
    <div className='allTaskCategory'>
        <div className="top">
          <h2>All Task Category</h2>
          <div className="btn" onClick={() => setSelectedCard('newTaskCategory')} >
            <button>Add New</button>
          </div>
        </div>

        <div className="bodyItem">
          {
            data?.map((item) => (
              <div className="card">
                <p className='code'>{item?.code}</p>
                <p className='platform'>{item?.category}</p>
                <div className="btn" onClick={() => handleEditTask(item?._id)}>
                  Edit
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default AllTaskCategory