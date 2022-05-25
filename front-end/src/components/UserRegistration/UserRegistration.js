import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function UserRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userReg, setUserReg] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log(userReg);
  const HandleChange = (event) => {
    setUserReg({ ...userReg, [event.target.id]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API}/user/registration`, userReg)
      .then((response) => {
        console.log(response);
        if (response.data.id) {
          navigate("/activity/login");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.warn(error);
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
      <h3>Register</h3>
      <div className="RegistrationForm">
        <form onSubmit={onSubmit}>
          <label htmlFor="UserName"> Name:</label>
          <input
            id="name"
            value={userReg.name}
            type="text"
            onChange={HandleChange}
            placeholder="enter your name"
            required
          />
          <br></br>
          <label htmlFor="UserEmail">Email:</label>
          <input
            id="email"
            value={userReg.email}
            type="email"
            onChange={HandleChange}
            placeholder="enter your email"
            required
          />
          <br></br>
          <label htmlFor="Password">Password:</label>
          <input
            id="password"
            value={userReg.password}
            type="password"
            onChange={HandleChange}
            placeholder="enter your password"
            required
          />
          <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UserRegistration;
