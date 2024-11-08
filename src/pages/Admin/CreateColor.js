import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const CreateColor = () => {
  const [colors, setColors] = useState([]);
  const [colorName, setColorName] = useState("");
  const [hexCode, setHexcode] = useState("");
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [colorId, setColorId] = useState(null);
  useEffect(() => {
    getAllColors();
  }, []);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("colorName", colorName);
    formData.append("hexCode", hexCode);
    if (image) formData.append("image", image);

    try {
      if (editMode) {
        // Update color
        const { data } = await axios.put(
          `/api/v1/color/update-color/${colorId}`,
          formData
        );
        if (data.success) {
          toast.success("Color updated successfully");
        } else {
          toast.error(data.message);
        }
      } else {
        // Create new color
        const { data } = await axios.post(
          "/api/v1/color/create-color",
          formData
        );
        console.log(data);
        if (data.success) {
          toast.success("Color created successfully");
        } else {
          toast.error(data.message);
        }
      }
      // Reset form and fetch all colors
      resetForm();
      getAllColors();
    } catch (err) {
      console.log(err);
      toast.error("Error creating/updating color");
    }
  };

  const handleEdit = (color) => {
    setEditMode(true);
    setColorId(color._id);
    setColorName(color.colorName);
    setHexcode(color.hexCode);
    setImage(null);
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/color/delete-color/${id}`);
      if (data.success) {
        toast.success("Color deleted successfully");
        getAllColors();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting Color");
    }
  };
  const resetForm = () => {
    setEditMode(false);
    setColorId(null);
    setColorName("");
    setHexcode("");
    setImage(null);
  };

  const getAllColors = async () => {
    try {
      const { data } = await axios.get("/api/v1/color/get-all-colors");
      if (data.success) {
        setColors(data.color);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error fetching colors");
    }
  };

  return (
    <Layout title={"Dashboard -  Color"}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>{editMode ? "Update Color" : "Create Color"}</h1>
            <form onSubmit={handleCreateOrUpdate} className="w-75">
              <div>
                <input
                  type="text"
                  placeholder="Enter Color Name"
                  className="form-control mb-3"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter hexcode"
                  className="form-control mb-3"
                  value={hexCode}
                  onChange={(e) => setHexcode(e.target.value)}
                  required
                />
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
            <h2>Colors List</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Color Image</th>
                  <th>Color Name</th>
                  <th>Hexcode</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {colors.map((color) => (
                  <tr key={color._id}>
                    <td>
                      <img
                        src={color.image}
                        alt={color.colorName}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </td>
                    <td>{color.colorName}</td>
                    <td>{color.hexCode}</td>

                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(color)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => handleDelete(color._id)}
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

export default CreateColor;
