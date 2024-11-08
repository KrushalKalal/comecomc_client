import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
// import Sidebar from "../../components/Layout/Sidebar";
// import AdminTopBar from "../../components/Layout/AdminTopBar";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const CreateBrand = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [brandId, setBrandId] = useState(null);

  useEffect(() => {
    getAllBrands();
    getAllCategories();
  }, []);

  const getAllBrands = async () => {
    try {
      const { data } = await axios.get("/api/v1/brand/get-all-brand");
      if (data.success) {
        setBrands(data.brand);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error fetching brands");
    }
  };

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

  const handleCategoryChange = async (categoryId) => {
    setCategory(categoryId);
    try {
      const { data } = await axios.get(
        `/api/v1/category/sub-category-on-category/${categoryId}`
      );
      if (data.success) {
        setSubCategories(data.subCategory); // Update subcategories based on category
        setSubCategory(""); // Reset subcategory on category change
      } else {
        toast.error("Error fetching subcategories");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error fetching subcategories");
    }
  };
  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brandName", brandName);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    if (image) formData.append("image", image);

    try {
      if (editMode) {
        // Update brand
        const { data } = await axios.put(
          `/api/v1/brand/update-brand/${brandId}`,
          formData
        );
        if (data.success) {
          toast.success("Brand updated successfully");
        } else {
          toast.error(data.message);
        }
      } else {
        // Create new brand
        const { data } = await axios.post(
          "/api/v1/brand/create-brand",
          formData
        );
        console.log(data);
        if (data.success) {
          toast.success("Brand created successfully");
        } else {
          toast.error(data.message);
        }
      }
      // Reset form and fetch all brands
      resetForm();
      getAllBrands();
    } catch (err) {
      console.log(err);
      toast.error("Error creating/updating brand");
    }
  };
  const handleEdit = (brand) => {
    setEditMode(true);
    setBrandId(brand._id);
    setBrandName(brand.brandName);
    setCategory(brand.category._id);
    setSubCategory(brand.subCategory);

    setImage(null);
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/brand/delete-brand/${id}`);
      if (data.success) {
        toast.success("Brand deleted successfully");
        getAllBrands();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting brand");
    }
  };
  const resetForm = () => {
    setEditMode(false);
    setBrandId(null);
    setBrandName("");
    setCategory("");
    setSubCategory("");
    setImage(null);
  };
  return (
    <Layout title={"Dashboard -  Brand"}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>{editMode ? "Update Brand" : "Create Brand"}</h1>
            <form onSubmit={handleCreateOrUpdate} className="w-75">
              <div>
                <input
                  type="text"
                  placeholder="Enter Brand Name"
                  className="form-control mb-3"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
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
              <div>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="form-select mb-3"
                  required
                >
                  <option value="">Select Sub Category</option>
                  {subCategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  type="file"
                  className="form-control mb-3"
                  onChange={(e) => setImage(e.target.files[0])}
                />
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
            <h2>Brands List</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Brand Image</th>
                  <th>Brand Name</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => (
                  <tr key={brand._id}>
                    <td>
                      <img
                        src={brand.image}
                        alt={brand.brandName}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </td>
                    <td>{brand.brandName}</td>
                    <td>{brand.category.name}</td>
                    <td>{brand.subCategory.name}</td>

                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(brand)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => handleDelete(brand._id)}
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

export default CreateBrand;
