import React, { useState, useContext } from 'react';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import './LoginForm.css';
import { FcGoogle } from "react-icons/fc";
import UserContext from "../../utils/UserContext";  // Import UserContext

const LoginForm = ({ onClose, setModalType, setIsModalOpen }) => {
  const [logemail, setLogEmail] = useState('');
  const [logpassword, setLogPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Use UserContext to update logged-in user details
  const { setUserName} = useContext(UserContext);

  const handleRegister = () => {
    onClose();
    setModalType('logout');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get stored users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user in localStorage
    const foundUser = existingUsers.find((user) => user.email === logemail);

    if (!foundUser) {
      alert("User not found. Please register first.");
      return;
    }

    if (foundUser.password !== logpassword) {
      alert("Incorrect password. Please try again.");
      return;
    }

    // Save logged-in user in localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

    // ✅ Update UserContext immediately
    setUserName(foundUser.name);
    // setUserEmail(foundUser.email);
    // setPassword(foundUser.password);

    alert("Login successful!");
    onClose(); // Close modal
  };

  return (
    <div className='wrapper1'>
      <div className='form-box login active'>
        <form onSubmit={handleSubmit} autoComplete="off">
          <h1>Login</h1>
          <div className='input-box1'>
            <input type="email" placeholder='Enter email' value={logemail} onChange={(e) => setLogEmail(e.target.value)} required />
            <MdEmail className='icon'/>
          </div>
          <div className='input-box1'>
            <input type="password" placeholder='Enter Password' value={logpassword} onChange={(e) => setLogPassword(e.target.value)} required />
            <RiLockPasswordLine className='icon'/>
          </div>
          <div className='remember-forgot'>
            <label><input type="checkbox"/>Remember me</label>
            <p><a onClick={(e) => { e.preventDefault(); }}>Forgot Password</a></p>
          </div>
          <button type="submit">Login</button>
          <div className='register-link'>
            <p>Don't have an account? <button onClick={handleRegister}>Register</button></p>
          </div>
          <div className='line'></div>
          <div className='other'>
            <p>OR</p>
            <div className='google'>
              <button><FcGoogle className="google-icon"/>Continue with Google</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
