import { formatDistanceToNow } from 'date-fns'
import Spinner from '../Spinner/Spinner'
import './TaskTable.css'
import { Link } from 'react-router-dom'

function TaskTable({ data, isLoading, error, th1, th2, th3, th4, th5, th6, td1, td2, td3, td4, td5, no, total, pageLink }) {
    //console.log('TASK', data)
    return (
    <table className="taskTable">
      {isLoading ? (
        <div className="taskTableSpinner">
          <Spinner />
        </div>
      ) : error ? (
        <p className="danger errorMsg">{error}</p>
      ) : (
        <>
          <thead>
            <tr>
              <th>{th1}</th>
              <th>{th2}</th>
              <th>{th3}</th>
              <th>{th4}</th>
              <th>{th5}</th>
              <th>{th6}</th>
            </tr>
          </thead>
          <tbody>
            {data?.length <= 0 ? (
              <p className="para errorMsg">No Transaction Data</p>
            ) : (
              data?.map((item) => (
                <tr key={item?._id}>
                    <Link to={`${pageLink ? `/${pageLink}/${item?._id}` : ''}`} className='link'>
                        <td>
                            <img src={item[td1]} alt="icon" className='icon' />
                        </td>
                        <td>{item[td2]}</td>
                        <td>{!total ? item[td3] : item[td3] * item[no] }</td>
                        <td>{item[td4]}</td>
                        <td>{`${item[td5]}/${item[no]}`}</td>
                        <td>{formatDistanceToNow(new Date(item?.createdAt))} ago</td>
                    </Link>
                </tr>
              ))
            )}
          </tbody>
        </>
      )}
    </table>
  )
}

export default TaskTable