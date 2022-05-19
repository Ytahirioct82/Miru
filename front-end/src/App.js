import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllActivities from "./components/Activities/AllActivities";
import Activity from "./components/Activities/Activity";
import NewPost from "./components/Post/NewPost";
import EditPost from "./components/Post/EditPost";
import Navbar from "./components/NavBar/Navbar";
// import CommentForm from "./components/CommentForm";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<AllActivities />} />
        <Route path="/activity/:id" element={<Activity />} />
        <Route path="/activity/new" element={<NewPost />} />
        <Route path="/activity/:id/edit" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
