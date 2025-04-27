
import { useState } from "react";
import UserContext from "./Usercontext.js";

const UserContexProvider = ({children})=>{
    const [user, setUser] = useState('')
    return(
        <UserContext.Provider value={{user ,setUser}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContexProvider;