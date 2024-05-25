import { useFetch } from '../../../hooks/fetch.hooks'
import './AllUsers.css'

function AllUsers() {
  const { apiData, isLoading } = useFetch()
  const userData = apiData?.data
  console.log(apiData)
  return (
    <div className='allUsers'>
        <div className="top">
          All Users {userData?.length}
        </div>

        <div className="bodyItem">
          {}
        </div>
    </div>
  )
}

export default AllUsers