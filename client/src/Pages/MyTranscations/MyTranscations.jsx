import { useSelector } from "react-redux";
import TransactionData from "../../Components/TransactionData/TransactionData";
import "./MyTranscations.css";
import { useFetchTransaction } from "../../hooks/fetch.hooks";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Aside from "../../Components/Aside/Aside";


function MyTranscations({toggleMenu, menuOpen}) {
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const { isLoadingTransaction, transactionData, transactionServerError } = useFetchTransaction(user?._id);
    const data = transactionData?.data
    const sortedData = data?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))


  return (
    <div className='container'>
        <div className="menubarContainer">
            <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>

        <div className="mainContainer">
            <div className="myTranscations">
                <h1 className="h-1">My Tranactions</h1>
                <TransactionData 
                    data={sortedData}
                    error={transactionServerError}
                    isLoading={isLoadingTransaction}
                  />
            </div>
        </div>

        <div className="asideContainer">
            <Aside toggleMenu={toggleMenu} />
        </div>
    </div>
  );
}

export default MyTranscations;
