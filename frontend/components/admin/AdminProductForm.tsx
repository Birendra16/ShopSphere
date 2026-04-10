"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "@/utils/api";
import { toast } from "sonner";

interface Props {
  onSuccess: () => void;
}

const ProductSchema = Yup.object({
  name: Yup.string().min(2, "Too short").required("Required"),
  price: Yup.number().min(1, "Must be > 0").required("Required"),
  stock: Yup.number().min(0, "Cannot be negative").required("Required"),
  category: Yup.string().required("Required"),
  description: Yup.string().min(5, "Too short").required("Required"),
  image: Yup.string().url("Invalid URL").optional(),
});

export default function AdminProductForm({ onSuccess }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow max-w-md mb-6">
      <h2 className="text-xl font-semibold mb-4 text-[#0F172A]">
        Create Product
      </h2>

      <Formik
        initialValues={{
          name: "",
          price: "",
          stock: "",
          category: "",
          description: "",
          image: "",
        }}
        validationSchema={ProductSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            await api.post("/api/products", {
              ...values,
              price: Number(values.price),
              stock: Number(values.stock),
            });

            toast.success("Product created successfully");
            resetForm();
            onSuccess();
          } catch (err: any) {
            toast.error(err.response?.data?.message || "Error creating product");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3">

            {/* Name */}
            <div>
              <label className="text-sm font-medium">Product Name</label>
              <Field
                name="name"
                placeholder="Enter product name"
                className="w-full border p-2 rounded mt-1"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-medium">Price (Rs)</label>
              <Field
                name="price"
                type="number"
                placeholder="1000"
                className="w-full border p-2 rounded mt-1"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Stock */}
            <div>
              <label className="text-sm font-medium">Stock</label>
              <Field
                name="stock"
                type="number"
                placeholder="10"
                className="w-full border p-2 rounded mt-1"
              />
              <ErrorMessage name="stock" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium">Category</label>
              <Field
                name="category"
                placeholder="e.g. Electronics"
                className="w-full border p-2 rounded mt-1"
              />
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium">Description</label>
              <Field
                as="textarea"
                name="description"
                placeholder="Enter product description"
                className="w-full border p-2 rounded mt-1"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Image */}
            <div>
              <label className="text-sm font-medium">Image URL</label>
              <Field
                name="image"
                placeholder="https://..."
                className="w-full border p-2 rounded mt-1"
              />
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#22C55E] hover:bg-green-600 text-white py-2 rounded-lg mt-3 transition"
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
}