import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/AdminStyles.css";

const Sidebar = () => {
  return (
    <div className="sidebar bg-light">
      <h2>ComEcom-Admin</h2>
      <ul>
        <li>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/create-sub-category"
            className="list-group-item list-group-item-action"
          >
            Create Sub Category
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/create-brand"
            className="list-group-item list-group-item-action"
          >
            Create Brand
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
