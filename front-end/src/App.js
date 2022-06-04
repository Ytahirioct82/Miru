import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllActivities from "./components/AllActivities";
import Activity from "./components/Activity";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import Navbar from "./components/Navbar";
import UserLogin from "./components/UserLogin/UserLogin";
import UserRegistration from "./components/UserRegistration/UserRegistration";
import MyListings from "./components/MyListings/MyListings";
import Footer from "./components/Footer";
import Favorites from "./components/Favorites/Favorites";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  const toggleLog = (user) => {
    setLoggedIn(user);
  };

  return (
    <div>
      <Navbar isLoggedIn={loggedIn} />
      <Routes>
        <Route exact path="/" element={<AllActivities />} />
        <Route path="/activity/login" element={<UserLogin isLogged={toggleLog} />} />
        <Route path="/activity/registration" element={<UserRegistration />} />
        <Route path="/activity/listings" element={<MyListings />} />
        <Route path="/activity/favorites" element={<Favorites />} />
        <Route path="/activity/:id" element={<Activity />} />
        <Route path="/activity/new" element={<NewPost />} />
        <Route path="/activity/:id/edit" element={<EditPost />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
