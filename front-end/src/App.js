import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllActivities from "./components/AllActivities";
import Activity from "./components/Activity";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<AllActivities />} />
        <Route path="/activity/:id" element={<Activity />} />
        <Route path="/new" element={<NewPost />} />
        <Route path="/activity/edit/:id" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
