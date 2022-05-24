import React from "react";
import Activity from "./Activity";

export default function SavedActivities(props) {
  const { posts, onAdd } = props;
  return (
    <div className="savedPosts">
      <h2>Saved</h2>
      {posts.length === 0 && <p>No Saved Posts!</p>}
      {posts.map((post) => (
        <div key={Activity.id}></div>
      ))}
    </div>
  );
}
