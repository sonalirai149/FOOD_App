import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine, RiEyeOffLine, RiEyeLine } from "react-icons/ri";
import "./LoginForm.css";
import UserContext from "../../utils/UserContext";

const LogOut = ({ onClose, setModalType, setIsModalOpen }) => {
  const { setUserName,setUserEmail,setPassword} = useContext(UserContext);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [email, setEmail] = useState("");
const [password, setUPassword] = useState("");
const [name,setName]=useState("");
  //const [passwordVisible, setPasswordVisible] = useState(false);
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle password visibility
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Clear user info
    setUserName("");
    setUserEmail("");
    setPassword("");
    window.location.reload(); // Refresh UI
  };

  // Switch to Login Modal
  const handleLoginButton = () => {
    onClose();
    setModalType("login");
    setIsModalOpen(true);
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    const newUser = {
      name: name,
      email: email,
      password: password,
      country,
      gender,
      contactNo,
    };
  
    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check if user already exists
    if (existingUsers.some((user) => user.email === email)) {
      setError("Email already registered. Please log in.");
      return;
    }
  
    // Save new user to localStorage
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
  
    // ✅ Also update logged-in user in localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
  
    // ✅ Update Context so UI reflects the new user
    // setUserName(newUser.name);
    // setUserEmail(newUser.email);
    // setPassword(newUser.password);
  
    alert("Signup successful! Please log in.");
    onClose(); // Close signup modal
    setModalType("login"); // Switch to login modal
    setIsModalOpen(true); // Open login modal
  };
  
  

  return (
    <div className="wrapper1">
      <div className="form-box register active">
        <form onSubmit={handleSignup} autoComplete="off">
          <h1>SignUp</h1>
          {error && <p className="error-message">{error}</p>}
          <div className="input-box1">
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box1">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
            <MdEmail className="icon" />
          </div>
          <div className="input-box1">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setUPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <span onClick={handlePasswordVisibility} className="eye-icon">
              {passwordVisible ? <RiEyeOffLine className="icon" /> : <RiEyeLine className="icon" />}
            </span>
          </div>
          <div className="input-box1">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <RiLockPasswordLine className="icon" />
          </div>
          <div className="input-box1">
            <div className="custom-select">
              <select value={country} onChange={(e) => setCountry(e.target.value)} required>
                <option value="" disabled>
                  Select Country
                </option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
          </div>
          <div className="input-box1">
            <div className="custom-select">
              <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="input-box1">
            <input
              type="text"
              placeholder="Enter Contact no."
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              required
            />
            <FaPhone className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" required />I agree to the terms & conditions
            </label>
          </div>
          <button type="submit">Register</button>
          <div className="register-link">
            <p>
              Already have an account? <button onClick={handleLoginButton}> Login</button>
            </p>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default LogOut;
