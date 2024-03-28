import "./TransactionData.css";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import Spinner from "../Spinner/Spinner";
import { formatDistanceToNow } from "date-fns";

function TransactionData({ data, isLoading, error }) {

  return (
    <table className="transactionData">
      {isLoading ? (
        <div className="transactionSpinner">
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
                  <td
                    className={`${
                      item?.credit === true ? "success" : "danger"
                    } `}
                  >
                    {item?.credit === true ? (
                      <CallReceivedIcon />
                    ) : (
                      <CallMadeIcon />
                    )}
                  </td>
                  <td>N {item.amount}</td>
                  <td
                    className={`${
                      item?.credit === true ? "success" : "danger"
                    } `}
                  >
                    {item?.action}
                  </td>
                  <td>{item?.fundSource}</td>
                  <td>{formatDistanceToNow(new Date(item?.createdAt))} ago</td>
                </tr>
              ))
            )}
          </tbody>
        </>
      )}
    </table>
  );
}

export default TransactionData;
