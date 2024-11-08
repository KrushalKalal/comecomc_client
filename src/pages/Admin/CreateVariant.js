import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const CreateVariant = ({ productId, sizes }) => {
  const [colors, setColors] = useState([]);
  const [variants, setVariants] = useState([
    { color: "", sizes: [{ size: "", stock: "", sku: "" }], images: [] },
  ]);

  const fetchColors = async () => {
    try {
      const { data } = await axios.get("/api/v1/color/get-all-colors");
      if (data.success) {
        setColors(data.color);
      }
    } catch (error) {
      console.error("Failed to fetch colors:", error);
    }
  };
  useEffect(() => {
    fetchColors();
  }, []);

  const handleVariantChange = (variantIndex, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex][field] = value;
    setVariants(updatedVariants);
  };

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      { color: "", sizes: [{ size: "", stock: "", sku: "" }], images: [] },
    ]);
  };

  const handleSizeChange = (variantIndex, sizeIndex, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes[sizeIndex][field] = value;
    setVariants(updatedVariants);
  };

  const handleAddSize = (variantIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes.push({ size: "", stock: "", sku: "" });
    setVariants(updatedVariants);
  };

  const handleImageUpload = (variantIndex, event) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].images = Array.from(event.target.files);
    setVariants(updatedVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const variant of variants) {
        const formData = new FormData();
        formData.append("color", variant.color);
        formData.append("sizes", JSON.stringify(variant.sizes));
        variant.images.forEach((image) => formData.append("images", image));

        const response = await axios.post(
          `/api/v1/product/create-variant-product/${productId}/variant`,
          formData
        );

        if (response.data.success) {
          toast.success("Variant created successfully");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error creating variant:", error);
      toast.error("Failed to create variant");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded bg-light w-75 my-3"
    >
      <h4 className="mb-3">Create Product Variants</h4>

      {variants.map((variant, variantIndex) => (
        <div key={variantIndex} className="variant-group">
          <select
            value={variant.color}
            className="form-select mb-3"
            onChange={(e) =>
              handleVariantChange(variantIndex, "color", e.target.value)
            }
            required
          >
            <option value="">Select Color</option>
            {colors.map((color) => (
              <option key={color._id} value={color._id}>
                {color.colorName}
              </option>
            ))}
          </select>

          {variant.sizes.map((size, sizeIndex) => (
            <div key={sizeIndex} className="size-group">
              <select
                value={size.size}
                className="form-select mb-3"
                onChange={(e) =>
                  handleSizeChange(
                    variantIndex,
                    sizeIndex,
                    "size",
                    e.target.value
                  )
                }
                required
              >
                <option value="">Select Size</option>
                {sizes.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.sizeName}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Stock"
                value={size.stock}
                className="form-control mb-3"
                onChange={(e) =>
                  handleSizeChange(
                    variantIndex,
                    sizeIndex,
                    "stock",
                    e.target.value
                  )
                }
                required
              />
              <input
                type="text"
                placeholder="SKU"
                value={size.sku}
                className="form-control mb-3"
                onChange={(e) =>
                  handleSizeChange(
                    variantIndex,
                    sizeIndex,
                    "sku",
                    e.target.value
                  )
                }
                required
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => handleAddSize(variantIndex)}
            className="btn btn-info"
          >
            + Add Size
          </button>

          <input
            type="file"
            className="form-control my-3"
            multiple
            onChange={(e) => handleImageUpload(variantIndex, e)}
          />
          {variant.images.length > 0 && (
            <div className="mt-3">
              <h5>Selected Images:</h5>
              <div className="d-flex flex-wrap">
                {variant.images.map((image, index) => (
                  <div key={index} className="me-2">
                    <image
                      src={URL.createObjectURL(image)}
                      alt={`Variant ${variantIndex + 1} Image ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <button type="button" onClick={handleAddVariant} className="btn btn-info">
        + Add Variant
      </button>
      <div>
        <button type="submit" className="btn btn-primary my-4">
          Submit Variants
        </button>
      </div>
    </form>
  );
};

export default CreateVariant;
