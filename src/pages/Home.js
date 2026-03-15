
import Features from "../components/Features";
import Footer from "../components/Footer";
import "../styles/home.css";

function Home(){

return(

<div className="home-container">

<div className="hero">

<div className="hero-left">

<h1>
Easy Transaction <br/>
With Mobile Banking
</h1>

<p>
SecureBank helps you manage money easily and safely.
</p>

<button className="learn-btn">
Learn More
</button>

</div>

<div className="hero-right">

<img
src="https://cdn-icons-png.flaticon.com/512/2830/2830284.png"
alt="bank"
/>

</div>

</div>

<Features/>

<Footer/>

</div>

);

}

export default Home;