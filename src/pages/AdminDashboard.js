import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function AdminDashboard(){

const navigate = useNavigate();

useEffect(()=>{

const isAdmin = localStorage.getItem("admin");

if(!isAdmin){
navigate("/admin-login");
}

},[navigate]);

return(

<div className="admin-dashboard">

{/* Sidebar */}

<div className="admin-sidebar">

<h2>Admin Panel</h2>


<ul>
<li>🏠 Dashboard</li>
<li>➕ Create Account</li>
<li>👥 View Users</li>
<li onClick={()=>{
localStorage.removeItem("admin");
navigate("/admin-login");
}}>
🚪 Logout
</li>
</ul>


</div>

{/* Main Content */}

<div className="admin-main">

<h1>Welcome Admin 👋</h1>

<div className="admin-cards">

<div className="admin-card">
<h3>Total Users</h3>
<p>--</p>
</div>

<div className="admin-card">
<h3>Total Accounts</h3>
<p>--</p>
</div>

<div className="admin-card">
<h3>Total Balance</h3>
<p>₹ --</p>
</div>

</div>

</div>

</div>

);

}

export default AdminDashboard;