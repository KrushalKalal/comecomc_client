import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CreateVariant from "./CreateVariant";
import { Link, Navigate } from "react-router-dom";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    description: "",
    title: "",
    price: "",
    brand: "",
    category: "",
    subCategory: "",
    superSubCategory: "",
    rating: 0,
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [createdProductId, setCreatedProductId] = useState(null);

  useEffect(() => {
    getAllCategories();
  }, []);

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

  const manageDataOnCategory = async (e) => {
    const id = e.target.value;
    setProduct((prevVal) => ({
      ...prevVal,
      category: e.target.value,
    }));
    try {
      const [subCategoryResponse, brandResponse, sizeResponse] =
        await Promise.all([
          axios.get(`/api/v1/category/sub-category-on-category/${id}`),
          axios.get(`/api/v1/brand/get-brand-on-category/${id}`),
          axios.get(`/api/v1/size/size-on-category/${id}`),
        ]);

      if (subCategoryResponse.data.success) {
        console.log(subCategoryResponse.data);
        setSubCategories(subCategoryResponse.data.subCategory);
      } else {
        console.log(
          "Subcategory fetch failed:",
          subCategoryResponse.data.message
        );
      }
      if (brandResponse.data.success) {
        console.log(brandResponse.data);
        setBrands(brandResponse.data.brand);
      } else {
        console.log("Brand fetch failed:", brandResponse.data.message);
      }
      if (sizeResponse.data.success) {
        console.log(sizeResponse.data);
        setSizes(sizeResponse.data.size);
      } else {
        console.log("Brand fetch failed:", brandResponse.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong in getting details on category id");
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });
    images.forEach((image) => {
      formData.append("images", image);
    });
    console.log(formData);
    try {
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        formData
      );
      setCreatedProductId(data.product._id);
      if (data?.success) {
        toast.success("Product created successfully");
      } else {
        toast.error(data.message);
      }
      console.log(data);
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit} className="w-75">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Product Name"
                  className="form-control mb-3"
                  value={product.name}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Product title"
                  className="form-control mb-3"
                  value={product.title}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter Product description"
                  className="form-control mb-3"
                  value={product.description}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter Price of the product"
                  className="form-control mb-3"
                  value={product.price}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div>
                <select
                  value={product.category}
                  name="category"
                  onChange={manageDataOnCategory}
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
                  value={product.subCategory}
                  name="subCategory"
                  onChange={handleProductChange}
                  className="form-select mb-3"
                  required
                >
                  <option value="">Select Subcategory</option>
                  {subCategories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={product.brand}
                  name="brand"
                  onChange={handleProductChange}
                  className="form-select mb-3"
                  required
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.brandName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="form-control mb-3"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create Product
              </button>
            </form>
            {createdProductId && (
              <CreateVariant productId={createdProductId} sizes={sizes} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
