import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AllActivities.css";
import Content from "./Content";
import SearchActivity from "./SearchActivity";

const API = process.env.REACT_APP_API_URL;
function AllActivities() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(`${API}/activity`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.warn("catch", error));
  }, []);
console.log(posts)
  // const activities = posts.map((post) => {
  //   return (
  //     <div className="Post">
  //       <Link to={`/Activity/${post.id}`}>
  //         <img
  //           className="post-picture"
  //           src={post.image}
  //           alt={post.name}
  //           width="300"
  //           height="300"
  //         ></img>
  //         <h3>{post.name}</h3>
  //       </Link>
  //     </div>
  //   );
  // });

  return (
  // <section 
  // className="AllPosts">{activities}
  // </section>
  <>
  <SearchActivity search={search} setSearch={setSearch} />
  <Content 
  activity = {posts.filter(activity => activity.name.includes(search))}
  />
  </>
  )
}

export default AllActivities;
