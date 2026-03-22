import { useState } from "react";
import axios from "axios";
import "../styles/billPayment.css";
import { useNavigate } from "react-router-dom";
function BillPayment() {
const navigate = useNavigate();
  // 🔹 Bill Payment State
  const [billForm, setBillForm] = useState({
    accountNumber: "",
    billType: "",
    amount: "",
    providerName: ""
  });

  // 🔹 Recharge State
  const [rechargeForm, setRechargeForm] = useState({
    accountNumber: "",
    mobileNumber: "",
    operator: "",
    amount: ""
  });

  // 🔹 Handlers
  const handleBillChange = (e) => {
    setBillForm({ ...billForm, [e.target.name]: e.target.value });
  };

  const handleRechargeChange = (e) => {
    setRechargeForm({ ...rechargeForm, [e.target.name]: e.target.value });
  };

  // 🔹 Submit Bill
  const handleBillSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/bill/pay", billForm);
      alert(res.data);
    } catch (err) {
      alert("Error paying bill");
    }
  };

  // 🔹 Submit Recharge
  const handleRechargeSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/recharge/do", rechargeForm);
      alert(res.data);
    } catch (err) {
      alert("Recharge failed");
    }
  };

  return (
  <div>

    {/* 🔹 Cards Container */}
    <div className="payment-container">

      {/* 💡 BILL PAYMENT CARD */}
      <div className="bill-card">
        <h2>💡 Bill Payment</h2>

        <label>Account Number</label>
        <input name="accountNumber" onChange={handleBillChange} />

        <label>Bill Type</label>
        <select name="billType" onChange={handleBillChange}>
          <option value="">Select Bill Type</option>
          <option>Electricity</option>
          <option>Water</option>
          <option>Gas</option>
        </select>

        <label>Provider Name</label>
        <input name="providerName" onChange={handleBillChange} />

        <label>Amount</label>
        <input type="number" name="amount" onChange={handleBillChange} />

        <button onClick={handleBillSubmit}>Pay Now</button>
      </div>

      {/* 📱 RECHARGE CARD */}
      <div className="bill-card">
        <h2>📱 Mobile Recharge</h2>

        <input name="accountNumber" placeholder="Account Number" onChange={handleRechargeChange} />
        <input name="mobileNumber" placeholder="Mobile Number" onChange={handleRechargeChange} />

        <select name="operator" onChange={handleRechargeChange}>
          <option value="">Select Operator</option>
          <option>Jio</option>
          <option>Airtel</option>
          <option>Vi</option>
          <option>DTH</option>
        </select>

        <input type="number" name="amount" placeholder="Amount" onChange={handleRechargeChange} />

        <button onClick={handleRechargeSubmit}>Recharge Now</button>
      </div>

    </div>

    {/* 🔥 BACK BUTTON BELOW */}
    <div className="back-container">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>

  </div>
);
}

export default BillPayment;