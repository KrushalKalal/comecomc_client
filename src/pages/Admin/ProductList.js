import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";

const ProductList = () => {
  const [productList, setProducts] = useState([]);
  console.log(productList);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/product/get-all-products");
      if (data.success) {
        console.log(data);
        setProducts(data.products);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong in getting category");
    }
  };

  return (
    <Layout title={"Dashboard - All Products"}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Product List</h1>

            <div className="row row-cols-1 row-cols-md-3 g-4">
              {productList.map((product) => (
                <div className="col">
                  <div className="card">
                    {product.variants &&
                    product.variants[0] &&
                    product.variants[0].images &&
                    product.variants[0].images[0] ? (
                      <img
                        src={product.variants[0].images[0].secure_url}
                        className="card-img-top"
                        alt={product.name}
                      />
                    ) : (
                      <img
                        src={product.images[0].secure_url}
                        className="card-img-top"
                        alt={product.name}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
