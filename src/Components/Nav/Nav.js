import React, { useState ,useContext} from 'react'; 
import './Nav.css';
//import logo from '../Config/img.webp'; 
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";
import useOnlinestatus from '../../utils/useOnlinestatus';
import { useSelector } from 'react-redux';
import UserContext from '../../utils/UserContext.js';

const Nav = ()=>{
  const [btnName, setbtnName] = useState("Login")
  const onlineStatus =useOnlinestatus();
//Subscribing to the store a small portion of the store
  const cartItems=useSelector((store) => store.cart.items);
  const sum=cartItems.reduce((acc,item) => {
    return acc+item.quantity;
},0);
  console.log("cartItems", cartItems);
  const {loggedInUser}=useContext(UserContext);
  return (
    <div>
      <nav className="container">
        <img  alt="Logo" /> 
      
      <h3>Foodie-woodie</h3>
      <ul className=''>
        <li><FaUser />{onlineStatus ? "✅" : "🔴"}</li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Cart">🛒({sum})</Link></li>
        <li><Link to="/AboutUs">AboutUs</Link></li>
        <li><Link to="/Help">Help</Link></li>
        <li><Link to="/Grocery">Grocery</Link></li>
        
        <button className="button" onClick={() => {
        btnName ==="Login" ? 
          setbtnName("Logout") : setbtnName("Login");}
        }
        > {btnName}</button>
        <li>{loggedInUser}</li>
        {/* <h1 class="text-4xl font-bold text-blue-500">Tailwind CSS is Working! 🎉</h1> */}
      </ul>
      
    </nav>

    </div>
    
  );
}
export default Nav;