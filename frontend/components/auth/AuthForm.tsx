"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "@/utils/api";
import { toast } from "sonner";
import { Mail, Lock, User } from "lucide-react";

interface Props {
  type: "login" | "signup";
  initialValues: any;
  validationSchema: any;
}

const AuthForm = ({ type, initialValues, validationSchema }: Props) => {
  const isSignup = type === "signup";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#0F172A]">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-500 mt-2">
            {isSignup
              ? "Sign up to start shopping"
              : "Login to your account"}
          </p>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await api.post(`/api/auth/${type}`, values);

              toast.success(
                isSignup
                  ? "Account created successfully"
                  : "Login successful"
              );

              window.location.href = "/dashboard";
            } catch (err: any) {
              toast.error(
                err.response?.data?.message || "Something went wrong"
              );
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">

              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-1">
                    Full Name
                  </label>
                  <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-[#22C55E]">
                    <User size={18} className="text-gray-400" />
                    <Field
                      name="name"
                      placeholder="Enter your name"
                      className="w-full p-2 outline-none"
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-1">
                  Email Address
                </label>
                <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-[#22C55E]">
                  <Mail size={18} className="text-gray-400" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 outline-none"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-1">
                  Password
                </label>
                <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-[#22C55E]">
                  <Lock size={18} className="text-gray-400" />
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full p-2 outline-none"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#22C55E] hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200"
              >
                {isSignup ? "Create Account" : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-center text-gray-500 mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <a
            href={isSignup ? "/login" : "/signup"}
            className="text-[#22C55E] font-medium hover:underline"
          >
            {isSignup ? "Login" : "Sign up"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;