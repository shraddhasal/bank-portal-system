import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Login(){

const navigate = useNavigate();

const [user,setUser] = useState({
email:"",
password:""
});

const handleChange = (e)=>{
setUser({...user,[e.target.name]:e.target.value});
};

const handleSubmit = (e)=>{

e.preventDefault();

login(user)
.then(res => {

  console.log("Response:", res.data);

  if(res.data.error){
    alert(res.data.error);
    return;
  }

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("email", res.data.email);

  navigate("/dashboard");

})
.catch(err => {
  console.log("ERROR:", err);
  alert("Login Failed");
});

};

return(

<div className="login-container">

<div className="login-card">

<h2>Login</h2>

<form onSubmit={handleSubmit}>

<input 
name="email" 
placeholder="Email"
onChange={handleChange}
/>

<input 
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
/>

<button type="submit" className="login-btn">
Login
</button>

</form>

</div>

</div>

);
}

export default Login;