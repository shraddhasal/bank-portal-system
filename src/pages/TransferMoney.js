import axios from "axios";
import "../styles/transfer.css"; // reuse your styling
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function TransferMoney() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fromAccount: "",
    toAccount: "",
    amount: ""
  });
useEffect(() => {
  const accNo = localStorage.getItem("accountNumber");

  console.log("Fetched Account:", accNo); // 🔍 debug

  if (accNo) {
    setForm((prev) => ({
      ...prev,
      fromAccount: accNo
    }));
  }
}, []);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/transfer", form);
      alert(res.data);
      navigate("/dashboard");
    } catch (err) {
  console.log(err.response); // 🔍 debug

  if (err.response && err.response.data) {
    alert(err.response.data.message); // ✅ THIS LINE FIX
  } else {
    alert("Transfer failed");
  }
}
  };

  return (
    <div className="transfer-container">

  <div className="transfer-card">

    <h2 className="transfer-title">💸 Transfer Money</h2>

    <form onSubmit={handleTransfer} className="transfer-form">

      <input
        type="text"
        name="fromAccount"
        value={form.fromAccount}
        disabled
        placeholder="From Account Number"
      />

      <input
        type="text"
        name="toAccount"
        placeholder="Enter Receiver Account Number"
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="amount"
        placeholder="Enter Amount"
        onChange={handleChange}
        required
      />

      <button type="submit" className="transfer-btn">
        Transfer Money
      </button>

    </form>
  </div>

  <button className="back-btn" onClick={()=>navigate("/dashboard")}>
    Back to Dashboard
  </button>

</div>
  );
}

export default TransferMoney;