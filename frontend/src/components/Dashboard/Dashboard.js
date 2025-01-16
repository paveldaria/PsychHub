import PostList from "../PostList/PostList";
import "./Dashboard.css";

export default function Dashboard({ setCurrentPage, currentPage }) {
  return (
    <div className="dashboard-container">
      <div className="main-content">
        <PostList currentPage={currentPage} />
      </div>
    </div>
  );
}
