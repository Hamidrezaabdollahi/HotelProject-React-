import { useEffect, useState } from "react";
import { useAuth } from "../HotelsContext/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("Kr1234!@#$");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Logged in successfully")
      navigate("/", {replace: true});
    }
  }, [isAuthenticated, navigate]); 

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">
            <span style={{ color: "#fff" }}> Login</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
