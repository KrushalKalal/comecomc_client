import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUserList] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/get-all-users");
      if (data.success) {
        console.log(data);
        setUserList(data.users);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong in getting user list");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  const handleUpdateRole = async (id, newRole) => {
    try {
      const { data } = await axios.put(
        `/api/v1/auth/update-user-role/${id}/role`,
        {
          role: newRole,
        }
      );
      if (data.success) {
        toast.success("User role updated successfully");
        getAllUsers();
      } else {
        toast.error("Failed to update role");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error while changing role");
    }
  };
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const { data } = await axios.put(
        `/api/v1/auth/update-user-status/${id}/status`,
        {
          status: newStatus,
        }
      );
      if (data.success) {
        toast.success("User Status updated successfully");
        getAllUsers();
      } else {
        toast.error("Failed to update Status");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error while changing status");
    }
  };
  const handleDeleteUser = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/auth/delete-user/${id}`);
      if (data.success) {
        toast.success("user deleted successfully");
        getAllUsers();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting order");
    }
  };
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>User List</h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <select
                        value={user.role === 1 ? "admin" : "user"}
                        onChange={(e) =>
                          handleUpdateRole(
                            user._id,
                            e.target.value === "admin" ? 1 : 0
                          )
                        }
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className={`btn ${
                          user.status === "active"
                            ? "btn-danger"
                            : "btn-success"
                        }`}
                        onClick={() =>
                          handleToggleStatus(user._id, user.status)
                        }
                      >
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageUsers;
