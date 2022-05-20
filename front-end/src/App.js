import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllActivities from "./components/AllActivities";
import Activity from "./components/Activity";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import Navbar from "./components/Navbar";
import UserLogin from "./components/UserLogin/UserLogin";
import UserRegistration from "./components/UserRegistration/UserRegistration";
import Footer from "./components/Footer";
// import CommentForm from "./components/CommentForm";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<AllActivities />} />
        <Route exact path="/activity/login" element={<UserLogin />} />
        <Route exact path="/activity/registration" element={<UserRegistration />} />
        <Route path="/activity/:id" element={<Activity />} />
        <Route path="/activity/new" element={<NewPost />} />
        <Route path="/activity/:id/edit" element={<EditPost />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
