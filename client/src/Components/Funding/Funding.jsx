import { useSelector } from "react-redux";
import "./Funding.css";
import { useState } from "react";
import { paysavings } from "../../helper/api";

function Funding() {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.data;
  const email = user.email
  const [amountValue, setAmountValue] = useState("");
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);

  //FOR PAYSTACK
  //for paystack
  const handlePaystack = async (e) => {
    e.preventDefault();
    const amount = amountValue;
    if (amountValue < 1000) {
      toast.error("Minimuim ammount is 1000");
      return;
    }
    if (!email) {
      toast.error("Email is required");
      return;
    }
    try {
      setIsLoadingAnimation(true);
      const payment = await paysavings({ email, amount });
      console.log(payment);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingAnimation(false);
    }
  };

  return (
    <div className="funding">
      <form onSubmit={handlePaystack} className="fundForm">
        <label className="email">{email}</label>
        <label className="amount">Amount:</label>
        <input
          type="number"
          className="input amountInput"
          value={amountValue}
          onChange={(e) => setAmountValue(e.target.value)}
          placeholder="Amount"
        />
        <p className="danger">
          {amountValue!== '' && amountValue < 1000 ? "Minimium Deposit Amount is NGN 1000" : ""}
        </p>
        <button
          type="submit"
          className={`submitBtn ${isLoadingAnimation ? 'active' : ''}`}
          disabled={amountValue < 1000 || isLoadingAnimation}
        >
          {isLoadingAnimation ? "Please Wait" : "Proceed"}
        </button>
      </form>
    </div>
  );
}

export default Funding;
