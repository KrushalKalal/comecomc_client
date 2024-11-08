import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState("");
  console.log(id);
  console.log(name);
  console.log(image);
  //get all categories
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name); // Append category name
    if (image) {
      formData.append("image", image); // Append image file
    }
    if (id) {
      try {
        const { data } = await axios.put(
          `/api/v1/category/update-category/${id}`,
          formData
        );
        setId("");
        setName("");
        setImage(null);
        <Link to={"/dashboard/admin/create-category"}></Link>;
        console.log(data);
        if (data?.success) {
          toast.success(`${name} category updated`);
          getAllCategories();
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const { data } = await axios.post(
          "/api/v1/category/create-category",
          formData
        );
        setName("");
        setImage(null);
        console.log(data);
        if (data?.success) {
          toast.success(`${name} category created`);
          getAllCategories();
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // const handleUpdate = async (cid, cname) => {
  //   setId(cid);
  //   setName(cname);
  // };

  const handleDelete = async (cId, cname) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${cId}`
      );
      <Navigate to={"/dashboard/admin/create-category"}></Navigate>;
      if (data.success) {
        toast.success(`${cname} category deleted`);

        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout title={"Dashboard -  Category"}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>{id ? "Update Category" : "Manage Category"}</h1>
            <div className="p-3 w-50">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter new category"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    required
                  />
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Select an image"
                    onChange={(e) => setImage(e.target.files[0])}
                    name="image"
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
                    <th scope="col">Image</th>
                    <th scope="col">Category</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr>
                      <td key={category._id}>
                        <img
                          src={category.image}
                          alt={category.name}
                          style={{
                            height: "80px",
                            width: "80px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td key={category._id}>{category.name}</td>
                      <td>
                        <Link
                          key={category._id}
                          to={`/dashboard/admin/update-category/uploads${category._id}`}
                        >
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setId(category._id);
                              setName(category.name);
                              // handleUpdate(category._id, category.name);
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

export default CreateCategory;
