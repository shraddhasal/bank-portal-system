import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/cdashboard.css";

function CustomerDashboard() {

  const [account, setAccount] = useState(null);

  useEffect(() => {

    const email = localStorage.getItem("email");

  axios.get("http://localhost:8080/api/accounts/" + email)
      .then((res) => {
        setAccount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  if (!account) {
    return <h2 style={{textAlign:"center"}}>Loading account data...</h2>;
  }

  return (
    <div className="dashboard">

      {/* Sidebar */}

      <div className="sidebar">

        <h2 className="logo">SecureBank</h2>

        <ul>
          <li>Dashboard</li>
          <li>My Account</li>
          <li>Transfer Money</li>
          <li>Transactions</li>
          <li>Profile</li>
          <li
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </li>
        </ul>

      </div>


      {/* Main Content */}

      <div className="main">

        <h1>Welcome 👋</h1>

        {/* Account Cards */}

        <div className="cards">

          <div className="card">
            <h3>Account Number</h3>
            <p>{account.accountNumber}</p>
          </div>

          <div className="card">
            <h3>Balance</h3>
            <h2>₹{account.balance}</h2>
          </div>

        </div>


        {/* Quick Actions */}

        <div className="actions">

          <button>Transfer Money</button>
          <button>Pay Bills</button>
          <button>Recharge</button>

        </div>


        {/* Transactions Placeholder */}

        <div className="transactions">

          <h2>Recent Transactions</h2>

          <table>

            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>15 Mar</td>
                <td>Transfer</td>
                <td>₹2000</td>
              </tr>

              <tr>
                <td>14 Mar</td>
                <td>Recharge</td>
                <td>₹399</td>
              </tr>

              <tr>
                <td>13 Mar</td>
                <td>Deposit</td>
                <td>₹5000</td>
              </tr>
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default CustomerDashboard;