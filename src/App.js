import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import CustomerDashboard from "./pages/CustomerDashboard";
import MyAccount from "./pages/MyAccount";
function App() {
  return (
    <Router>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<CustomerDashboard />} />
      <Route path="/myaccount" element={<MyAccount/>}/>
      </Routes>
    </Router>
  );
}

export default App;