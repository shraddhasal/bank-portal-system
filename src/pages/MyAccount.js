import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/myAccount.css";
import { useNavigate } from "react-router-dom";

function MyAccount(){

const navigate = useNavigate();
const [account,setAccount] = useState(null);
const [loading,setLoading] = useState(true);

const [profile,setProfile] = useState({
name:"",
email:"",
password:""
});


useEffect(()=>{

const email = localStorage.getItem("email");

if(!email){
setLoading(false);
return;
}

axios.get("http://localhost:8080/api/accounts/myaccount/" + email)
.then(res=>{

if(res.data){

setAccount(res.data);

setProfile({
name:res.data.name || "",
email:res.data.email || "",
password:""
});

}

setLoading(false);

})
.catch(err=>{
console.log(err);
setLoading(false);
});

},[]);


const handleProfileChange = (e)=>{
setProfile({...profile,[e.target.name]:e.target.value});
};


const updateProfile = ()=>{

axios.put("http://localhost:8080/api/users/update",profile)
.then(()=>{
alert("Profile Updated Successfully");
})
.catch(()=>{
alert("Update Failed");
});

};


if(loading){
return <h2 className="loading">Loading account data...</h2>;
}

if(!account){
return <h2 className="loading">No account found</h2>;
}


return(

<div className="account-container">
<div className="cards-wrapper">
{/* Account Details Card */}

<div className="account-card">

<h2 className="title">My Account</h2>

<div className="info">

<p><strong>Name :</strong> {account.name}</p>
<p><strong>Email :</strong> {account.email}</p>
<p><strong>Account Number :</strong> {account.accountNumber}</p>
<p><strong>Account Type :</strong> {account.accountType}</p>

</div>

<div className="balance-card">

<h3>Available Balance</h3>
<h1>₹ {account.balance}</h1>

</div>

</div>



{/* Premium Update Profile Card */}

<div className="account-card premium-card">

<h2 className="title">Update Profile</h2>

<div className="profile-form">

<input
name="name"
placeholder="Full Name"
value={profile.name}
onChange={handleProfileChange}
/>

<input
name="email"
placeholder="Email Address"
value={profile.email}
onChange={handleProfileChange}
/>

<input
type="password"
name="password"
placeholder="New Password"
onChange={handleProfileChange}
/>

<button className="update-btn" onClick={updateProfile}>
Update Profile
</button>
</div>
</div>
</div>
<button className="back-btn" onClick={()=>navigate("/dashboard")}>
      Back to Dashboard
    </button>
</div>
);

}

export default MyAccount;