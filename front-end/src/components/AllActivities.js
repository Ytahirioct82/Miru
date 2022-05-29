import { useState, useEffect } from "react";
import { instance } from "../helpers/api";
import Category from "./Category";
import Content from "./Content";
import SearchActivity from "./SearchActivity";
const API = process.env.REACT_APP_API_URL;

function AllActivities(props) {
  const [posts, setPosts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(props.fav);
    instance
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
    filteredCategory === "All" ? posts : posts.filter((category) => category.category === filteredCategory);

  const found = selectedCategory.filter((category) => category.city.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <section className="body">
        <section className="cat-search">
          <div className="cat">
            <Category handleCategoryChange={handleCategoryChange} selected={filteredCategory} />
          </div>
          <div className="search">
            <SearchActivity search={search} setSearch={setSearch} />
            {!found.length && (
              <p
                style={{
                  color: "#F6BE00",
                  borderRadius: "7px",
                  marginTop: "5px",
                  backgroundColor: "#540B0C",
                  textAlign: "center",
                  fontSize: "20px",
                  border: "1px solid purple",
                }}
              >{`Sorry, our App does not have parks or sightSeeing in ${search} city`}</p>
            )}
          </div>
        </section>
        <section className="AllPosts">
          <Content
            activities={selectedCategory.filter((activity) =>
              activity.city.toLowerCase().includes(search.toLowerCase().trim())
            )}
            fav={favorites}
          />
        </section>
      </section>
    </>
  );
}

export default AllActivities;
