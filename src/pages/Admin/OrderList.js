import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);

  const getAllOrders = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/order/get-all-orders");
      if (data.success) {
        console.log(data);
        setOrderList(data.orders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong in getting order list");
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await axios.put(
        `/api/v1/order/update-order-status/${orderId}`,
        { orderStatus: newStatus }
      );
      if (data.success) {
        toast.success("Order status updated successfully");
        getAllOrders(); // Refresh the order list
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating order status");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/order/delete-order/${id}`);
      if (data.success) {
        toast.success("order deleted successfully");
        getAllOrders();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting order");
    }
  };

  return (
    <Layout title={"Dashboard - All Orders"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Order List</h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">User</th>
                  <th scope="col">Product Details</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                {orderList.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user?.name}</td>
                    <td>
                      {order.items.map((item) => (
                        <div key={item.product._id}>
                          <strong>{item.product.title}</strong> -{" "}
                          {item.quantity} pcs
                          {item.variant && (
                            <div>
                              <span>Color: {item.variant.color.colorName}</span>
                              <br />
                            </div>
                          )}
                          {item.size && (
                            <div>
                              <span>Size: {item.size.sizeName}</span>{" "}
                            </div>
                          )}
                        </div>
                      ))}
                    </td>
                    <td>{order.totalAmount}</td>
                    <td>
                      <form>
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </form>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => handleDelete(order._id)}
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

export default OrderList;
