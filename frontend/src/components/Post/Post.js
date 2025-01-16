import React from "react";
import "./Post.css";
import CommentList from "../CommentList/CommentList";

export default function Post({ post, onDelete, currentPage }) {
  return (
    <div className="post-container">
      <PostHeader
        username={post.user?.name || "Unknown"}
        postId={post.id}
        onDelete={onDelete}
        currentPage={currentPage}
      />
      <PostContent title={post.title} content={post.content} />
      <CommentList postId={post.id} />
    </div>
  );
}

function PostHeader({ username, postId, onDelete, currentPage }) {
  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8082/post/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onDelete(postId); 
      } else {
        console.error("Failed to delete post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  return (
    <div className="post-header">
      <span className="post-username">{username}</span>

      {currentPage === "profile" ? (
        <button className="post-delete-btn" onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      ) : null}
    </div>
  );
}

function PostContent({ title, content }) {
  return (
    <div>
      <h3 className="post-title">{title}</h3>
      <p className="post-content">{content}</p>
    </div>
  );
}
