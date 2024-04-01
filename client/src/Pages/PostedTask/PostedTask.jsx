import { useLocation } from "react-router-dom";
import Aside from "../../Components/Aside/Aside";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./PostedTask.css";
import { useSelector } from "react-redux";
import { useFetchTaskPostedByUser } from "../../hooks/fetch.hooks";
import ReportIcon from "@mui/icons-material/Report";
import { formatDistanceToNow } from "date-fns";

function PostedTask({ toggleMenu, menuOpen, setProofImg, setSelectedCard }) {
  const loc = useLocation();
  const id = loc.pathname.split("/")[2];
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.data;
  const { apiTaskData, taskServerError, isLoadingTask } =
    useFetchTaskPostedByUser(id);
  const task = apiTaskData?.data;
  console.log("TASK", task);

  const percent = (task?.completedRate * 100) / task?.numberOfWorkers;

  //handle Report
  const handleReport = (userId) => {
    const confirm = window.confirm(
      "Reporting User will lead to worker marked down \n Are you sure you want to report this account"
    );
    try {
    } catch (error) {

    }
  };

  const handleViewProof = (img) => {
    setSelectedCard('viewImgProof')
    setProofImg(img)
  }

  return (
    <div className="container">
      <div className="menubarContainer">
        <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
      </div>

      <div className="mainContainer">
        <div className="postedTask">
          <div className="card">
            <div className="top">
              <div className="up">
                <h1 className="h-1">{task?.task}</h1>
                <small>
                  Completed:{" "}
                  {` ${task?.completedRate} / ${task?.numberOfWorkers}`}{" "}
                  <span className={`${percent < 85 ? "warning" : "success"}`}>
                    ({percent}%)
                  </span>{" "}
                </small>
              </div>
              <div className="down">
                <span>
                  Created:{" "}
                  {task ? formatDistanceToNow(new Date(task?.createdAt)) : ""}{" "}
                  ago
                </span>
                <span>Total: {task?.numberOfWorkers * task?.unitPrice}</span>
              </div>
            </div>

            <div className="body">
              <table>
                <thead>
                  <tr>
                    <th>Freelancer Name</th>
                    <th>Profile Url</th>
                    <th>Job Proof</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {task?.approvedWorkers?.map((item) => (
                    <tr key={item?._id} className="cardContent">
                      <td>{item?.freelancerName}</td>
                      <td>
                        <a
                          className="link"
                          href={item?.freelancerUrl}
                          target="_blank"
                        >
                          View Proflie
                        </a>
                      </td>
                      <td
                        onClick={() => handleViewProof(item?.imageProof)}
                        className="jobProof"
                      >
                        View
                      </td>
                      <td
                        className="report"
                        onClick={() => handleReport(item._freelancerId)}
                      >
                        <ReportIcon className="icon" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="asideContainer">
        <Aside toggleMenu={toggleMenu} />
      </div>
    </div>
  );
}

export default PostedTask;
