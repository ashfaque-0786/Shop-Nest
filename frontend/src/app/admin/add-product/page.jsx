"use client";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import ImageUploadButton from "../../../components/Upload";

const ProductSchema = Yup.object().shape({
  images: Yup.array().min(1, "At least one image URL is required"),
  brand: Yup.string().required("Brand is required"),
  name: Yup.string().required("Product name is required"),
  shortDescription: Yup.string().required("Short description is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .positive("Price must be a positive number")
    .required("Price is required"),
  discountPrice: Yup.number().min(0, "Discount price cannot be negative"),
  stock: Yup.number()
    .integer()
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
  colorStock: Yup.array().of(
    Yup.object().shape({
      color: Yup.string().required("Color is required"),
      stock: Yup.number().required("Stock is required"),
    })
  ),
  size: Yup.string(),
  weight: Yup.number()
    .positive("Weight must be positive")
    .required("Weight is required"),
});

const AddProduct = () => {
  const productForm = useFormik({
    initialValues: {
      images: [],
      name: "",
      brand: "",
      shortDescription: "",
      category: "",
      description: "",
      price: "",
      discountPrice: "",
      stock: "",
      colorStock: [],
      size: "",
      weight: "",
    },
    validationSchema: ProductSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/add`, values);
        toast.success("Product added successfully!");
        console.log(response.data);
        // Reset form
        productForm.resetForm();
      } catch (error) {
        console.error(error);
        toast.error("Failed to add product.");
      }
    },
  });

  const handleImageUpload = (imageUrl) => {
    productForm.setFieldValue("images", [...productForm.values.images, imageUrl]);
    console.log("Image URL:", imageUrl);
  };

  const handleColorStockChange = (e) => {
    const colors = e.target.value.split(",").map(color => color.trim());
    const colorStock = colors.map(color => ({
      color,
      stock: 0
    }));
    productForm.setFieldValue("colorStock", colorStock);
  };

  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <div className="bg-gray-100 rounded-xl shadow-xl p-4 sm:p-7 dark:bg-neutral-800 border-2">
        <div className="mb-8">
          <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-neutral-200">
            Add Your Product Here
          </h2>
          <p className="text-md text-gray-600 text-center dark:text-neutral-400">
            Manage your product details and inventory
          </p>
        </div>

        <form onSubmit={productForm.handleSubmit}>
          {/* Basic Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                Basic Product Information
              </h3>
              <div className="space-y-4">
                {/* Image Upload */}
                <div className="grid sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-3">
                    <label className="text-sm text-gray-800 dark:text-neutral-200">
                      Product Images
                    </label>
                  </div>
                  <ImageUploadButton onImageUpload={handleImageUpload} />
                </div>

                {/* Product Name */}
                <div className="grid sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-3">
                    <label className="text-sm text-gray-800 dark:text-neutral-200">
                      Product Name
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <input
                      type="text"
                      name="name"
                      value={productForm.values.name}
                      onChange={productForm.handleChange}
                      onBlur={productForm.handleBlur}
                      className="w-full rounded-lg border border-gray-300 p-2"
                    />
                    {productForm.touched.name && productForm.errors.name && (
                      <p className="text-red-500 text-sm mt-1">{productForm.errors.name}</p>
                    )}
                  </div>
                </div>

                {/* Brand */}
                <div className="grid sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-3">
                    <label className="text-sm text-gray-800 dark:text-neutral-200">
                      Brand
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <input
                      type="text"
                      name="brand"
                      value={productForm.values.brand}
                      onChange={productForm.handleChange}
                      onBlur={productForm.handleBlur}
                      className="w-full rounded-lg border border-gray-300 p-2"
                    />
                    {productForm.touched.brand && productForm.errors.brand && (
                      <p className="text-red-500 text-sm mt-1">{productForm.errors.brand}</p>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div className="grid sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-3">
                    <label className="text-sm text-gray-800 dark:text-neutral-200">
                      Category
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <input
                      type="text"
                      name="category"
                      value={productForm.values.category}
                      onChange={productForm.handleChange}
                      onBlur={productForm.handleBlur}
                      className="w-full rounded-lg border border-gray-300 p-2"
                    />
                    {productForm.touched.category && productForm.errors.category && (
                      <p className="text-red-500 text-sm mt-1">{productForm.errors.category}</p>
                    )}
                  </div>
                </div>

                {/* Short Description */}
                <div className="grid sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-3">
                    <label className="text-sm text-gray-800 dark:text-neutral-200">
                      Short Description
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <input
                      type="text"
                      name="shortDescription"
                      value={productForm.values.shortDescription}
                      onChange={productForm.handleChange}
                      onBlur={productForm.handleBlur}
                      className="w-full rounded-lg border border-gray-300 p-2"
                    />
                    {productForm.touched.shortDescription && productForm.errors.shortDescription && (
                      <p className="text-red-500 text-sm mt-1">{productForm.errors.shortDescription}</p>
                    )}
                  </div>
                </div>

                {/* Full Description */}
                <div className="grid sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-3">
                    <label className="text-sm text-gray-800 dark:text-neutral-200">
                      Full Description
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <textarea
                      name="description"
                      value={productForm.values.description}
                      onChange={productForm.handleChange}
                      onBlur={productForm.handleBlur}
                      rows="4"
                      className="w-full rounded-lg border border-gray-300 p-2"
                    />
                    {productForm.touched.description && productForm.errors.description && (
                      <p className="text-red-500 text-sm mt-1">{productForm.errors.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing and Inventory */}
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                Pricing & Inventory
              </h3>
              <div className="space-y-4">
                {/* Price */}
                <div className="grid sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-3">
                    <label className="text-sm text-gray-800 dark:text-neutral-200">
                      Price (₹)
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <input
                      type="number"
                      name="price"
                      value={productForm.values.price}
                      onChange={productForm.handleChange}
                      onBlur={productForm.handleBlur}
                      className="w-full rounded-lg border border-gray-300 p-2"
                    />
                    {productForm.touched.price && productForm.errors.price && (
                      <p className="text-red-500 text-sm mt-1">{productForm.errors.price}</p>
                    )}
                  </div>
                </div>

                {/* Discount Price */}
                <div className="grid sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-3">
                    <label className="text-sm text-gray-800 dark:text-neutral-200">
                      Discount Price (₹)
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <input
                      type="number"
                      name="discountPrice"
                      value={productForm.values.discountPrice}
                      onChange={productForm.handleChange}
                      onBlur={productForm.handleBlur}
                      className="w-full rounded-lg border border-gray-300 p-2"
                    />
                    {productForm.touched.discountPrice && productForm.errors.discountPrice && (
                      <p className="text-red-500 text-sm mt-1">{productForm.errors.discountPrice}</p>
                    )}
                  </div>
                </div>

                {/* Stock */}
                <div className="grid sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-3">
                    <label className="text-sm text-gray-800 dark:text-neutral-200">
                      Total Stock
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <input
                      type="number"
                      name="stock"
                      value={productForm.values.stock}
                      onChange={productForm.handleChange}
                      onBlur={productForm.handleBlur}
                      className="w-full rounded-lg border border-gray-300 p-2"
                    />
                    {productForm.touched.stock && productForm.errors.stock && (
                      <p className="text-red-500 text-sm mt-1">{productForm.errors.stock}</p>
                    )}
                  </div>
                </div>

                {/* Color Variants */}
                <div className="grid sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-3">
                    <label className="text-sm text-gray-800 dark:text-neutral-200">
                      Color Variants
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <input
                      type="text"
                      name="colors"
                      placeholder="Enter colors separated by commas"
                      onChange={handleColorStockChange}
                      className="w-full rounded-lg border border-gray-300 p-2"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Example: Red, Blue, Green
                    </p>
                  </div>
                </div>

                {/* Size */}
                <div className="grid sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-3">
                    <label className="text-sm text-gray-800 dark:text-neutral-200">
                      Size
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <input
                      type="text"
                      name="size"
                      value={productForm.values.size}
                      onChange={productForm.handleChange}
                      onBlur={productForm.handleBlur}
                      className="w-full rounded-lg border border-gray-300 p-2"
                    />
                  </div>
                </div>

                {/* Weight */}
                <div className="grid sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-3">
                    <label className="text-sm text-gray-800 dark:text-neutral-200">
                      Weight (g)
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <input
                      type="number"
                      name="weight"
                      value={productForm.values.weight}
                      onChange={productForm.handleChange}
                      onBlur={productForm.handleBlur}
                      className="w-full rounded-lg border border-gray-300 p-2"
                    />
                    {productForm.touched.weight && productForm.errors.weight && (
                      <p className="text-red-500 text-sm mt-1">{productForm.errors.weight}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => productForm.resetForm()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
