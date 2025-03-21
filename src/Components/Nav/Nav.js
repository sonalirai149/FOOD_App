// Nav.js
import React, { useState, useContext } from 'react'; 
import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import useOnlinestatus from '../../utils/useOnlinestatus';
import { useSelector } from 'react-redux';
import UserContext from '../../utils/UserContext';
import SlidingModal from '../LogIn/SlidingModal/SlidingModal';
import LoginForm from '../LogIn/LoginForm';
import LogOut from '../LogIn/LogOut';

const Nav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('login'); // 'login' or 'logout'
  const navigate = useNavigate();
  const onlineStatus = useOnlinestatus();
  const cartItems = useSelector((store) => store.cart.items);
  const sum = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { loggedInUser,setUserName } = useContext(UserContext);


  //const storedUser=JSON.parse(localStorage.getItem("loggedInUser"));
  //setUserName(storedUser ? storedUser.name : null);
  

  const openLoginModal = () => {
    setModalType('login');
    setIsModalOpen(true);
    console.log("Clicked");
  };
  
  const openLogoutModal = () => {
    localStorage.removeItem("loggedInUser"); // Clear user info
    setUserName("Guest");
    //window.location.reload(); // Refresh to update UI
    setModalType('login');
    setIsModalOpen(true);
    console.log("clicked");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <nav className="container">
        <h3>Foodie-woodie</h3>
        <ul>
          <li><FaUser /> {onlineStatus ? '✅' : '🔴'}</li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Cart">🛒({sum})</Link></li>
          <li><Link to="/AboutUs">About Us</Link></li>
          <li><Link to="/Help">Help</Link></li>
          <li><Link to="/Grocery">Grocery</Link></li>
          {!loggedInUser ? (
            <button className="button" onClick={openLoginModal}>Login</button>
          ) : (
            <button className="button" onClick={openLogoutModal}>LogOut</button>
          )}
          <li>{loggedInUser.name ? `👤 ${loggedInUser.name}` : "Guest"}</li>
        </ul>
      </nav>
      
      <SlidingModal isOpen={isModalOpen} onClose={closeModal}>
        {modalType === 'login' ? <LoginForm onClose={closeModal} setModalType={setModalType}
      setIsModalOpen={setIsModalOpen}/> : <LogOut onClose={closeModal}
      setModalType={setModalType}
      setIsModalOpen={setIsModalOpen} />}
      </SlidingModal>
    </div>
  );
};

export default Nav;