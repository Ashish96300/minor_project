import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../src/context/Usercontext";

function Logout() {
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);

  useEffect(() => {
    console.log("User before logout:", user);
    const handleLogout = async () => {
      try {
       // const token = localStorage.getItem('token')
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/users/logout`,
          {},
          { withCredentials: true },
        
          
        );
        console.log("Logout response:", response.data);
        setUser(null);
        localStorage.removeItem("Acesstoken");
        navigate("/Home");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    handleLogout();
  }, []);

  return null; 
}

export default Logout;
