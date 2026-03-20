import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/transfer.css"; // reuse your styling
function Transactions() {

  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const accountNumber = localStorage.getItem("accountNumber");

  useEffect(() => {

    if (!accountNumber) return;

    axios.get("http://localhost:8080/api/transfer/" + accountNumber)
      .then(res => {
        console.log(res.data); // debug
        setTransactions(res.data);
      })
      .catch(err => console.log(err));

  }, [accountNumber]);

  return (
    <div className="account-container">

      <div className="account-card">
        <h2 className="title">📊 Transaction History</h2>

        <table className="txn-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5">No transactions found</td>
              </tr>
            ) : (
              transactions.map((txn, index) => {

                const isDebit = txn.fromAccount === accountNumber;

                return (
                  <tr key={index}>
                    <td className={isDebit ? "debit" : "credit"}>
                      {isDebit ? "Debit" : "Credit"}
                    </td>
                    <td>{txn.fromAccount}</td>
                    <td>{txn.toAccount}</td>
                    <td>₹ {txn.amount}</td>
                    <td>
                      {new Date(txn.dateTime).toLocaleString()}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

      </div>

      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

    </div>
  );
}

export default Transactions;