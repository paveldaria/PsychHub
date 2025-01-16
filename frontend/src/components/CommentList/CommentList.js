import React from "react";
import { useState, useEffect } from "react";
import "./CommentList.css";
import Comment from "../Comment/Comment";

export default function CommentList({ postId }) {
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [viewComments, setViewComments] = useState(false);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`http://localhost:8082/comment/${postId}`);

        if (response.ok) {
          const data = await response.json();
          setCommentList(data); 
        } else {
          console.error("Failed to fetch comments.");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    fetchComments();
  }, [postId]); 

  async function handleAddComment() {
    if (!newComment.trim()) return;

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const commentData = {
      content: newComment,
      postId: postId,
      userId: userId,
    };

    try {
      const response = await fetch(`http://localhost:8082/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        const addedComment = await response.json();
        setCommentList([...commentList, addedComment]); 
        setNewComment("");
      } else {
        alert("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment.");
    }
  }

  function handleDeleteComment(commentId) {
    setCommentList(commentList.filter((comment) => comment.id !== commentId));
  }

  return (
    <>
      <span
        className="view-comments"
        value={viewComments}
        onClick={() => setViewComments(!viewComments)}
      >
        {viewComments
          ? "Hide comments"
          : `View all ${commentList.length} comments`}
      </span>

      {viewComments && (
        <div className="commentList">
          {commentList.length > 0
            ? commentList.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onDelete={handleDeleteComment}
                />
              ))
            : null}

          <div className="add-comment">
            <input
              type="text"
              placeholder="Add a comment..."
              className="comment-input"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
            />
            <button className="comment-submit" onClick={handleAddComment}>
              Post
            </button>
          </div>
        </div>
      )}
    </>
  );
}
