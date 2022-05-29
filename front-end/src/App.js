import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllActivities from "./components/AllActivities/AllActivities";
import Activity from "./components/Details/Activity";
import NewPost from "./components/EditAndNewPost/NewPost";
import EditPost from "./components/EditAndNewPost/EditPost";
import Navbar from "./components/NavAndFooter/Navbar";
import UserLogin from "./components/UserLogin/UserLogin";
import UserRegistration from "./components/UserRegistration/UserRegistration";
import Footer from "./components/NavAndFooter/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<AllActivities />} />
        <Route exact path="/activity/login" element={<UserLogin />} />
        <Route
          exact
          path="/activity/registration"
          element={<UserRegistration />}
        />
        <Route path="/activity/:id" element={<Activity />} />
        <Route path="/activity/new" element={<NewPost />} />
        <Route path="/activity/:id/edit" element={<EditPost />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
