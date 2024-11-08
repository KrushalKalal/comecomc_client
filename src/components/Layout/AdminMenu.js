import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-sub-category"
            className="list-group-item list-group-item-action"
          >
            Create Sub Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-sup-sub-category"
            className="list-group-item list-group-item-action"
          >
            Create Super Sub Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-brand"
            className="list-group-item list-group-item-action"
          >
            Create Brand
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-color"
            className="list-group-item list-group-item-action"
          >
            Create Color
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-size"
            className="list-group-item list-group-item-action"
          >
            Create Size
          </NavLink>

          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/product-list"
            className="list-group-item list-group-item-action"
          >
            Product List
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
