import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../src/context/Usercontext";

function Logout() {

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const {user}= useContext(UserContext)
    console.log(user)
    const handleLogout = async () => {
        
        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/users/logout',
                {}, 
                { withCredentials: true }   // <- Send cookies to backend
            );
            console.log('error:' , response.data)
            setUser(null);
            navigate('/Home');
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return handleLogout
    
};

export default Logout;
