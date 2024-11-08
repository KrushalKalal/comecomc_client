import React from "react";
import "../../styles/AdminStyles.css";

const AdminTopBar = (props) => {
  return (
    <div className="topbar">
      <input
        type="text"
        placeholder="Search Product..."
        className="form-control search-bar"
      />
      <div className="dropdowns">
        <select className="form-select">
          <option>Sort By</option>
        </select>
        <select className="form-select">
          <option>Collection Type</option>
        </select>
        <select className="form-select">
          <option>Price Range</option>
        </select>
      </div>
      <div className="user-info">
        <span>Pauline Seitz</span>
        <img
          src="path/to/profile-pic.jpg"
          alt="profile"
          className="profile-pic"
        />
      </div>
    </div>
  );
};

export default AdminTopBar;
