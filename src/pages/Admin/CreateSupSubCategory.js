import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateSupSubCategory = () => {
  const [category, setCategories] = useState([]);
  const [subcategory, setSubCategories] = useState([]);
  const [supSubCategory, setSupSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    subCategory: "",
    category: "",
  });
  const [id, setId] = useState("");
  console.log(id);
  console.log(formData);
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

  const getAllSupSubCategories = async (req, res) => {
    try {
      const { data } = await axios.get(
        "/api/v1/category/get-sup-sub-categories"
      );
      if (data.success) {
        console.log(data);
        setSupSubCategories(data.supSubCategory);
      }
    } catch (err) {
      console.log(err);
      toast.error("error while gettinh all super sub categories");
    }
  };

  //   const getAllSubCategories = async (req, res) => {
  //     try {
  //       const { data } = await axios.get("/api/v1/category/get-sub-categories");
  //       if (data.success) {
  //         console.log(data);
  //         setSubCategories(data.subCategory);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       toast.error("something went wrong in getting category");
  //     }
  //   };

  const handleCategory = async (e) => {
    const id = e.target.value;
    setFormData((prevVal) => ({
      ...prevVal,
      category: e.target.value,
    }));
    try {
      const { data } = await axios.get(
        `/api/v1/category/sub-category-on-category/${id}`
      );
      if (data.success) {
        console.log(data);
        setSubCategories(data.subCategory);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong in getting category");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      try {
        const name = formData.name[0];
        const subCategory = formData.subCategory;
        const category = formData.category;
        const { data } = await axios.put(
          `/api/v1/category/update-sup-sub-category/${id}`,
          {
            name,
            category,
            subCategory,
          }
        );
        setFormData({});

        console.log(data);
        if (data?.success) {
          toast.success(`${name} category updated`);
          <Link to={"/dashboard/admin/create-sub-category"}></Link>;
          getAllSupSubCategories();
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const name = formData.name[0];
        const subCategory = formData.subCategory[0];
        const category = formData.category;
        const { data } = await axios.post(
          "/api/v1/category/create-sup-sub-category",
          {
            name,
            subCategory,
            category,
          }
        );
        console.log(data);
        if (data?.success) {
          toast.success(`${formData.name} sub category created`);
          getAllSupSubCategories();
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
        `/api/v1/category/delete-sup-sub-category/${cId}`
      );
      if (data.success) {
        toast.success(`${cname} is deleted`);

        getAllSupSubCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("somtihing went wrong");
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prevVal) => ({
      ...prevVal,
      [name]: [value],
    }));
  };

  useEffect(() => {
    getAllCategories();
    getAllSupSubCategories();
  }, []);

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <select
                    bordered={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    name="category"
                    onChange={(e) => handleCategory(e)}
                  >
                    {id ? (
                      <option value={formData.category} selected>
                        {formData.category}
                      </option>
                    ) : (
                      <option value="" disabled selected>
                        Select an option
                      </option>
                    )}

                    {category.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <select
                    bordered={false}
                    placeholder="Select a sub category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    name="subCategory"
                    onChange={handleChange}
                  >
                    {id ? (
                      <option value={formData.subCategory} selected>
                        {formData.subCategory}
                      </option>
                    ) : (
                      <option value="" disabled selected>
                        Select an option
                      </option>
                    )}

                    {subcategory.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter new category"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </div>
              </form>
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Sub Category</th>
                    <th scope="col">Sup Sub Category</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {supSubCategory.map((category) => (
                    <tr>
                      <td key={category._id}>{category.category.name}</td>
                      <td key={category._id}>{category.subCategory.name}</td>
                      <td key={category._id}>{category.name}</td>
                      <td>
                        <Link
                          key={category._id}
                          to={`/dashboard/admin/update-sup-sub-category/${category._id}`}
                        >
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setId(category._id);
                              setFormData({
                                category: category.category._id,
                                name: category.name,
                                subCategory: category.subCategory._id,
                              });
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

export default CreateSupSubCategory;
