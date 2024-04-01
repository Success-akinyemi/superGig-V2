import { formatDistanceToNow } from 'date-fns'
import Spinner from '../Spinner/Spinner'
import './Table.css'

function Table({ data, isLoading, error, td1, td2, td3, td4 }) {
  return (
    <table className="table">
      {isLoading ? (
        <div className="tableSpinner">
          <Spinner />
        </div>
      ) : error ? (
        <p className="danger errorMsg">{error}</p>
      ) : (
        <>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.length <= 0 ? (
              <p className="para noData">No Transaction Data</p>
            ) : (
              data?.map((item) => (
                <tr key={item?._id}>
                  <td>{item[td1]}</td>
                  <td>{item[td2]}</td>
                  <td>{item[td3]}</td>
                  <td className={`${item[td4] === 'Pending' ? 'warning' : 'success'}`} >{item[td4]}</td>
                  <td>{formatDistanceToNow(new Date(item?.createdAt))} ago</td>
                </tr>
              ))
            )}
          </tbody>
        </>
      )}
    </table>
  )
}

export default Table