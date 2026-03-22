import { useState } from "react";
import axios from "axios";
import "../styles/billPayment.css";

function Recharge() {

  const [form, setForm] = useState({
    accountNumber: "",
    mobileNumber: "",
    operator: "",
    amount: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/recharge/do", form);
      alert(res.data);
    } catch (err) {
      alert("Recharge failed");
    }
  };

  return (
    <div className="bill-container">
      <div className="bill-card">
        <h2>📱 Mobile Recharge</h2>

        <input name="accountNumber" placeholder="Account Number" onChange={handleChange} />
        <input name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} />

        <select name="operator" onChange={handleChange}>
          <option value="">Select Operator</option>
          <option>Jio</option>
          <option>Airtel</option>
          <option>Vi</option>
          <option>DTH</option>
        </select>

        <input name="amount" type="number" placeholder="Amount" onChange={handleChange} />

        <button onClick={handleSubmit}>Recharge Now</button>
      </div>
    </div>
  );
}

export default Recharge;