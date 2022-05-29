import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../helpers/api";
import "./UserRegistration.css";

const API = process.env.REACT_APP_API_URL;

function UserRegistration() {
  const navigate = useNavigate();
  const [userReg, setUserReg] = useState({
    name: "",
    email: "",
    password: "",
  });

  const HandleChange = (event) => {
    setUserReg({ ...userReg, [event.target.id]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    instance
      .post(`${API}/user/registration`, userReg)
      .then((response) => {
        console.log(response);
        if (response.data.id) {
          navigate("/activity/login");
        }
      })
      .catch((error) => {
        console.warn(error);
        alert(error.error);
      });

    setUserReg({
      name: "",
      email: "",
      password: "",
    });
  };

  // User Login input section
  return (
    <div className="UserRegistration">
      <h3>Sign up to experience great new places!</h3>
      <div className="RegistrationForm">
        <form onSubmit={onSubmit}>
          <label htmlFor="UserName"> Name</label>
          <input id="name" value={userReg.name} type="text" onChange={HandleChange} placeholder="Full name" required />

          <label htmlFor="UserEmail">Email</label>
          <input id="email" value={userReg.email} type="email" onChange={HandleChange} placeholder="Email" required />

          <label htmlFor="Password">Password</label>
          <input
            id="password"
            value={userReg.password}
            type="password"
            onChange={HandleChange}
            placeholder="Password"
            required
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default UserRegistration;
