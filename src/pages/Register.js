import { useState } from "react";
import { register } from "../services/authService";

function Register(){

const [user,setUser]=useState({
name:"",
email:"",
password:""
});

const handleChange=(e)=>{
setUser({...user,[e.target.name]:e.target.value});
};

const handleSubmit=(e)=>{
e.preventDefault();

register(user)
.then(res=>{
alert("User Registered");
})
.catch(err=>{
alert("Error");
});

};

return(

<div className="login-container">

  <div className="login-card">

    <h2>Create Account</h2>

    <form onSubmit={handleSubmit}>

      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
      />

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
        Register
      </button>

      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>

    </form>

  </div>

</div>

);

}

export default Register;