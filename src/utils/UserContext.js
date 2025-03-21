import { createContext } from "react";

const UserContext=createContext({
    loggedInUser:{
        name:"",
        email:"",
        password:"",
    },
    setUserName: () => {},  // Placeholder function
    setUserEmail: () => {}, 
    setPassword: () => {}, 
    
});

export default UserContext;