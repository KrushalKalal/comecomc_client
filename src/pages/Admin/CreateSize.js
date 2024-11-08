import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";

const CreateSize = () => {
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizeName, setSizeName] = useState("");
  const [category, setCategory] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [sizeId, setSizeId] = useState(null);
  useEffect(() => {
    getAllSizes();
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-categories");
      if (data.success) {
        setCategories(data.category);
      } else {
        toast.error("Error fetching categories");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error fetching categories");
    }
  };
  const getAllSizes = async () => {
    try {
      const { data } = await axios.get("/api/v1/size/get-all-sizes");
      if (data.success) {
        setSizes(data.size);
      } else {
        toast.error("Error fetching sizes");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error fetching sizes");
    }
  };

  const handleCategoryChange = async (categoryId) => {
    setCategory(categoryId);
  };
  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const sizeData = {
      sizeName,
      category,
    };
    try {
      if (editMode) {
        // Update size
        const { data } = await axios.put(
          `/api/v1/size/update-size/${sizeId}`,
          sizeData
        );
        if (data.success) {
          toast.success("size updated successfully");
        } else {
          toast.error(data.message);
        }
      } else {
        // Create new size
        const { data } = await axios.post("/api/v1/size/create-size", sizeData);
        console.log(data);
        if (data.success) {
          toast.success("Size created successfully");
        } else {
          toast.error(data.message);
        }
      }
      // Reset form and fetch all brands
      resetForm();
      getAllSizes();
    } catch (err) {
      console.log(err);
      toast.error("Error creating/updating size");
    }
  };

  const handleEdit = (size) => {
    setEditMode(true);
    setSizeId(size._id);
    setSizeName(size.sizeName);
    setCategory(size.category._id);
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/size/delete-size/${id}`);
      if (data.success) {
        toast.success("Size deleted successfully");
        getAllSizes();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting size");
    }
  };
  const resetForm = () => {
    setEditMode(false);
    setSizeId(null);
    setSizeName("");
    setCategory("");
  };
  return (
    <Layout title={"Dashboard -  Brand"}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>{editMode ? "Update Size" : "Create Size"}</h1>
            <form onSubmit={handleCreateOrUpdate} className="w-75">
              <div>
                <input
                  type="text"
                  placeholder="Enter Size Name"
                  className="form-control mb-3"
                  value={sizeName}
                  onChange={(e) => setSizeName(e.target.value)}
                  required
                />
              </div>
              <div>
                <select
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="form-select mb-3"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                {editMode ? "Update" : "Create"}
              </button>
              <button
                type="button"
                className="btn btn-info mx-2"
                onClick={resetForm}
              >
                Reset
              </button>
            </form>
            <h2>Size List</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Size Name</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((size) => (
                  <tr key={size._id}>
                    <td>{size.sizeName}</td>
                    <td>{size.category.name}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(size)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => handleDelete(size._id)}
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

export default CreateSize;
