function Dashboard(){

const token=localStorage.getItem("token");

return(

<div style={{textAlign:"center",marginTop:"50px"}}>

<h1>User Dashboard</h1>

<p>Welcome to your bank account</p>

<p>JWT Token:</p>

<textarea rows="5" cols="60" value={token} readOnly/>

</div>

);

}

export default Dashboard;