import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import Content from "./Content";
import SearchActivity from "./SearchActivity";

const API = process.env.REACT_APP_API_URL;
function AllActivities() {
  const [posts, setPosts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(`${API}/activity`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.warn("catch", error));
  }, []);
 

  const handleCategoryChange = (selectedCat) => {
    setFilteredCategory(selectedCat);
  };

  const selectedCategory =
    filteredCategory === "All"
      ? posts
      : posts.filter((category) => category.category === filteredCategory);


  return (
    <>
      <section>
        <section className="cat-search">
          <div className="cat">
            <Category
              handleCategoryChange={handleCategoryChange}
              selected={filteredCategory}
            />
          </div>
          <div className="search">
            <SearchActivity search={search} setSearch={setSearch} />
          </div>
        </section>
        <section className="AllPosts">
            <Content
              activity={selectedCategory.filter((activity) =>
                activity.city.toLowerCase().includes(search.toLowerCase())
              )}
            />
        </section>
      </section>
    </>
  );
}

export default AllActivities;
