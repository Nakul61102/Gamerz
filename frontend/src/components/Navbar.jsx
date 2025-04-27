import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // ✅ Remove stored user data
    setUser(null);
    navigate("/login"); // ✅ Redirect to login after logout
  };

  return (
    // <div className="w-screen bg-gray-100 overflow-hidden">
      <nav className="navbar">
        <h1 className="text-2xl font-bold">
          <Link to="/">🎮 GamerSocial</Link>
        </h1>
  
        <div className="space-x-4">
          
  
          {user ? (
            <>
              <Link to="/feed" className="hover:text-gray-300">Feed</Link>
              <Link to="/community" className="hover:text-gray-300">Communities</Link>
              <Link to="/profile" className="hover:text-gray-300">Profile</Link>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </nav>
  
      
    // </div>
  );
};

export default Navbar;
