import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { instance } from "../../helpers/api";
import "./UserLogin.css";

function UserLogin(props) {
  const navigate = useNavigate();

  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
  });

  const HandleChange = (event) => {
    setUserLog({ ...userLog, [event.target.id]: event.target.value });
  };

  const loggedIn = (user) => {
    props.isLogged(user);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    instance
      .post(`/user/login`, userLog)
      .then((response) => {
        if (response.data.id) {
          loggedIn(response.data);
          navigate("/");
        }
      })
      .catch(function (error) {
        console.error(error);
        alert("you have entered the wrong username or password");
      });

    setUserLog({
      email: "",
      password: "",
    });
  };

  // User Login input section
  return (
    <div className="UserLogin">
      <h3>Please login to your account</h3>
      <div className="UserForm">
        <form onSubmit={onSubmit}>
          <label htmlFor="UserEmail"> Email</label>
          <input id="email" value={userLog.email} type="email" onChange={HandleChange} placeholder="Email" required />

          <label htmlFor="Password">Password</label>
          <input
            id="password"
            value={userLog.password}
            type="password"
            onChange={HandleChange}
            placeholder="Password"
            required
          />
          <br></br>
          <button type="submit">Login</button>
        </form>
      </div>
      <Link to="/activity/registration" className="nav-link">
        <h4>Click here to register</h4>
      </Link>
    </div>
  );
}

export default UserLogin;
