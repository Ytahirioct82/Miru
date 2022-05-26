import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { instance } from "../../helpers/api";

const API = process.env.REACT_APP_API_URL;

function UserLogin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
  });

  const HandleChange = (event) => {
    setUserLog({ ...userLog, [event.target.id]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    instance
      .post(`${API}/user/login/username/password`, userLog)
      .then((response) => {
        if (response.data.id) {
          setLoggedIn(response.data);
          navigate("/");
        }
      })
      .catch(function (error) {
        console.error(error);
        alert("you have enterd the wrong username or password");
      });

    setUserLog({
      email: "",
      password: "",
    });
  };

  // User Login input section
  return (
    <div className="UserLogin">
      <h3>Login</h3>
      <div className="UserForm">
        <form onSubmit={onSubmit}>
          <label htmlFor="UserEmail"> UserEmail:</label>
          <input
            id="email"
            value={userLog.email}
            type="email"
            onChange={HandleChange}
            placeholder="enter your email"
            required
          />

          <label htmlFor="Password">Password:</label>
          <input
            id="password"
            value={userLog.password}
            type="password"
            onChange={HandleChange}
            placeholder="enter your password"
            required
          />
          <br></br>
          <button type="submit">Login</button>
        </form>
      </div>
      <Link to="/activity/registration" className="nav-link">
        <h4>Register</h4>
      </Link>
    </div>
  );
}

export default UserLogin;
