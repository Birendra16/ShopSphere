"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import api from "@/utils/api";
import { toast } from "sonner";

interface Props {
  type: "login" | "signup";
  initialValues: any;
  validationSchema: any;
}

const AuthForm = ({ type, initialValues, validationSchema }: Props) => {
  const isSignup = type === "signup";

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        {isSignup ? "Create Account" : "Welcome Back"}
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await api.post(`/api/auth/${type}`, values);

            // Save auth data
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            toast.success(
                isSignup ? "Account created successfully" : "Login successful"
            );

          } catch (err: any) {
            toast.error(err.response?.data?.message || "Something went wrong");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3">

            {isSignup && (
              <>
                <Field name="name" 
                placeholder="Name" 
                className="border p-2 rounded" 
                />
                <ErrorMessage name="name" component="div" className="text-red-500" />
              </>
            )}

            <Field name="email" 
            placeholder="Email" 
            className="border p-2 rounded" />
            <ErrorMessage name="email" component="div" className="text-red-500" />

            <Field name="password" 
            type="password" 
            placeholder="Password" 
            className="border p-2 rounded" />
            <ErrorMessage name="password" component="div" className="text-red-500" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white p-2 rounded mt-2"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;