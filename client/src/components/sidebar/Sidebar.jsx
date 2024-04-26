import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.scss";

function Sidebar() {
  const navigate = useNavigate();
  const handleHomeClick=()=>{
    navigate("/")
  }
  const handlePatentsClick = () => {
    navigate("/patents");
  };

  const handleProjectsClick = () => {
    navigate("/projects");
  };

  const handlePublicationsClick = () => {
    navigate("/publications");
  };

  const handleReportsClick = () => {
    navigate("/reports");
  };

  return (
    <div className="sidebar">
      <div className="option" onClick={handleHomeClick}>Home</div>
      <div className="option" onClick={handlePatentsClick}>Patents</div>
      <div className="option" onClick={handleProjectsClick}>Projects</div>
      <div className="option" onClick={handlePublicationsClick}>Publications</div>
      <div className="option" onClick={handleReportsClick}>Reports</div>
    </div>
  );
}

export default Sidebar;
