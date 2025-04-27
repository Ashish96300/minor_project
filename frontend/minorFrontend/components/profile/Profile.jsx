
import UserContext from "../../src/context/Usercontext.js";
import { useContext } from "react";

function Profile() {
    const {user}= useContext(UserContext)

    if(!user) 
        return <div>please login</div>
    
        
      return <div>welcome {user.name}</div>
}

export default Profile;