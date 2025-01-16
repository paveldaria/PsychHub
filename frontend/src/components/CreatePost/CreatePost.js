import { useState } from "react";
import axios from "axios";
import "./CreatePost.css";

export default function CreatePost({ posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit() {
    setError("");
    setSuccess("");

    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User is not logged in.");
      return;
    }

    const postCreate = {
      title,
      content,
      userId,
    };

    try {
      const response = await axios.post(
        "http://localhost:8082/post",
        postCreate,
        { withCredentials: true }
      );

      if (response.status === 201) {
        setSuccess("Post created successfully!");
        setTitle("");
        setContent("");
      }
    } catch (error) {
      setError("Failed to create post. Please try again.");
      console.error("Error:", error);
    }
  }

  return (
    <div className="create-post-container">
      <h2>Create a new post</h2>

      <input
        type="text"
        placeholder="Title"
        className="create-post-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        className="create-post-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <button className="create-post-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
