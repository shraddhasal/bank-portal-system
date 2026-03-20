import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/cdashboard.css";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {

  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
const email = localStorage.getItem("email");

if(!email || email === "undefined"){
  console.log("Email not found");
  setLoading(false);
  return;
}

    axios.get("http://localhost:8080/api/accounts/myaccount/" + email)
      .then((res) => {

        if(res.data){
          setAccount(res.data);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  }, []);

  if(loading){
    return <h2 style={{textAlign:"center"}}>Loading account data...</h2>;
  }

  if(!account){
    return <h2 style={{textAlign:"center"}}>Account not created yet</h2>;
  }

  return (
    <div className="dashboard">

      <div className="sidebar">

        <h2 className="logo">SecureBank</h2>

        <ul>
          <li>Dashboard</li>
          <li onClick={()=>navigate("/myaccount")}>My Account</li>
          <li onClick={() => navigate("/transfer")}>Transfer Money</li>
          <li onClick={() => navigate("/transactions")}> Transactions</li>
          <li>Profile</li>

          <li
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </li>

        </ul>

      </div>

      <div className="main">

        <h1>Welcome 👋</h1>

        <div className="cards">

          <div className="card">
            <h3>Account Number</h3>
            <p>{account.accountNumber || "Not created"}</p>
          </div>

          <div className="card">
            <h3>Balance</h3>
            <h2>₹{account.balance || 0}</h2>
          </div>

        </div>

      </div>

    </div>
  );
}

export default CustomerDashboard;