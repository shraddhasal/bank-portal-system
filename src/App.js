import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import CustomerDashboard from "./pages/CustomerDashboard";
import MyAccount from "./pages/MyAccount";
import TransferMoney from "./pages/TransferMoney";
import Transactions from "./pages/Transactions";
import BillPayment from "./pages/BillPayment";
import Recharge from "./pages/Recharge";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/transfer" element={<TransferMoney />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/bill-payment" element={<BillPayment />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;