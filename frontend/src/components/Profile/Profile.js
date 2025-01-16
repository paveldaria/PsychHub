import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../Post/Post";
import "./Profile.css";

export default function Profile({ setCurrentPage, currentPage }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:8082/post/${userId}/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        setError("Failed to load posts.");
        console.error("Error fetching user posts:", error);
      });
  }, [userId]);


  const handlePostDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <div className="profile-container">
      <h1>My posts</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts.length === 0 ? (
        <p></p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onDelete={handlePostDelete} 
            currentPage={currentPage}
          />
        ))
      )}
    </div>
  );
}
