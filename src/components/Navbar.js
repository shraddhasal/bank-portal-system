import "./../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const isLoggedIn = email && email !== "undefined";

  // extract username safely
  let username = "";
  if (isLoggedIn && email.includes("@")) {
    username = email.split("@")[0];
    username = username.charAt(0).toUpperCase() + username.slice(1);
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");   // better than window.location
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <span className="logo-icon">S</span>
        <span>SecureBank</span>
      </div>

      <ul className="nav-links">
        <li>Profile</li>
        <li>News</li>
        <li>About</li>
        <li>Service</li>
        <li>Contact</li>
      </ul>

      <div className="nav-buttons">

        {isLoggedIn ? (
          <>
            <span style={{ marginRight: "15px" }}>
              Welcome {username}
            </span>

            <button className="login" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">
              <button className="signup">Sign up</button>
            </Link>

            <Link to="/login">
              <button className="login">Login</button>
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;