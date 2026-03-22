import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";   // ✅ FIX
import "../styles/admin.css";

function AdminLogin(){

const navigate = useNavigate();

const [admin,setAdmin] = useState({
email:"",
password:""
});

const handleChange = (e)=>{
setAdmin({...admin,[e.target.name]:e.target.value});
};

const handleLogin = (e)=>{
e.preventDefault();

axios.post("http://localhost:8080/api/auth/admin-login",admin)
.then(res=>{
localStorage.setItem("admin","true");
navigate("/admin");
})
.catch(()=>{
alert("Invalid Admin Credentials");
});

};

return(

<div className="admin-login-container">

<div className="admin-login-card">

<h2>Admin Login</h2>

<form onSubmit={handleLogin}>

<input
name="email"
placeholder="Admin Email"
onChange={handleChange}
/>

<input
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
/>

<button type="submit">Login</button>

</form>

</div>

</div>

);

}

export default AdminLogin;