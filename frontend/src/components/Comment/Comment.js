import React, { useState } from "react";
import "./Comment.css";

export default function Comment({ comment, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.content);

  const currentUserId = localStorage.getItem("userId"); 

  async function handleSave() {
    if (!editedText.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:8082/comment/${comment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: editedText }),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        comment.content = editedText;
      } else {
        console.error("Failed to update comment.");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  }

  async function handleDelete() {
    try {
      const response = await fetch(
        `http://localhost:8082/comment/${comment.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        onDelete(comment.id);
      } else {
        console.error("Failed to delete comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }

  return (
    <div className="comment">
      <span className="comment-text">
        <strong>{comment.user?.name || "Anon"}: </strong>
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="comment-edit-input"
          />
        ) : (
          comment.content
        )}
      </span>

      {currentUserId == comment.user.id && ( 
        <div className="comment-actions">
          {isEditing ? (
            <button className="action-button edit-button" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button
              className="action-button edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}

          <button
            className="action-button delete-button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
