import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateSubCategories = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [categories, setCategories] = useState([]);

  console.log(category);

  const getAllCategories = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/category/get-categories");
      if (data.success) {
        console.log(data);
        setCategories(data.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong in getting category");
    }
  };

  const getAllSubCategories = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/category/get-sub-categories");
      if (data.success) {
        console.log(data);
        setSubCategory(data.subCategory);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong in getting category");
    }
  };

  //   const handleChange = (event) => {
  //     const { name, value } = event.target;
  //     setFormData((prevVal) => ({
  //       ...prevVal,
  //       [name]: [value],
  //     }));
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      try {
        const { data } = await axios.put(
          `/api/v1/category/update-sub-category/${id}`,
          {
            name,
            category,
          }
        );
        setId("");
        setName("");
        setCategory("");
        <Link to={"/dashboard/admin/create-sub-category"}></Link>;
        console.log(data);
        if (data?.success) {
          toast.success(`${name} category updated`);
          <Link to={"/dashboard/admin/create-sub-category"}></Link>;
          getAllSubCategories();
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const { data } = await axios.post(
          "/api/v1/category/create-sub-category",
          {
            name,
            category,
          }
        );
        console.log(data);
        if (data?.success) {
          toast.success(`${name} sub category created`);
          getAllSubCategories();
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDelete = async (cId, cname) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-sub-category/${cId}`
      );
      if (data.success) {
        toast.success(`${cname} sub-category deleted`);

        getAllSubCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("somtihing went wrong");
    }
  };

  useEffect(() => {
    getAllSubCategories();
    getAllCategories();
  }, []);
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>{id ? "Update Sub Category" : "Manage Sub Category"}</h1>
            <div className="p-3 w-50">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <select
                    bordered={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {id ? (
                      <option value={category._id} disabled selected>
                        {category}
                      </option>
                    ) : (
                      <option value="" disabled selected>
                        Select an option
                      </option>
                    )}

                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter new category"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <button type="submit" className="btn btn-primary">
                    {id ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Category Name</th>
                    <th scope="col">Sub Category Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subCategory.map((category) => (
                    <tr>
                      <td key={category.category._id}>
                        {category.category.name}
                      </td>
                      <td key={category._id}>{category.name}</td>
                      <td>
                        <Link
                          key={category._id}
                          to={`/dashboard/admin/update-sub-category/${category._id}`}
                        >
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setId(category._id);
                              setName(category.name);
                              setCategory(category.category._id);
                            }}
                          >
                            Edit
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(category._id, category.name);
                          }}
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
      </div>
    </Layout>
  );
};

export default CreateSubCategories;
