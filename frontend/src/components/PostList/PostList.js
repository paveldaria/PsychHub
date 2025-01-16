import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PostList.css";
import Post from "../Post/Post";
import CreatePost from "../CreatePost/CreatePost";

export default function PostList({ currentPage }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8082/post/published")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        setError("Failed to load posts.");
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handlePostDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <div className="post-list-container">
      <CreatePost posts={posts} setPosts={setPosts} />{" "}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts.length === 0 ? (
        <p>No posts available.</p>
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
