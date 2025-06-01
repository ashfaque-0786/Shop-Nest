"use client";
import { IconLoader3, IconSend2 } from "@tabler/icons-react";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import Link from "next/link";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short")
    .max(50, "Too Long")
    .required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string()
    .required("Password is required ")
    .matches(/[a-z]/, "Lowercase letter is required ")
    .matches(/[A-Z]/, "Uppercase letter is required ")
    .matches(/[0-9]/, "Number is required ")
    .matches(/[\W]/, "Special Character is required"),
  confirmPassword: Yup.string()
    .required("Confirm password is required ")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
          name: values.name,
          email: values.email,
          password: values.password,
        });
        toast.success("Your registration is successful");
        resetForm();
        router.push("/login");
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Something went wrong");
        setSubmitting(false);
      }
    },
    validationSchema: SignupSchema,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 py-8 px-4 sm:px-6 lg:px-8 dark:from-neutral-900 dark:to-neutral-800 mt-16  ">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-xl">
        {/* Header */}
        <div className="mb-8 ">
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Create an Account
          </h1>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Social Sign Up */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-700"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-neutral-600"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500 dark:bg-neutral-900 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={signupForm.handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.name}
              className="block w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white text-sm"
            />
            {signupForm.touched.name && signupForm.errors.name && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {signupForm.errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.email}
              className="block w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white text-sm"
            />
            {signupForm.touched.email && signupForm.errors.email && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {signupForm.errors.email}
              </p>
            )}
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={signupForm.handleChange}
                  onBlur={signupForm.handleBlur}
                  value={signupForm.values.password}
                  className="block w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={signupForm.handleChange}
                  onBlur={signupForm.handleBlur}
                  value={signupForm.values.confirmPassword}
                  className="block w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 hover:text-gray-500"
                >
                  {showConfirmPassword ? (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Password Errors */}
          <div className="space-y-1">
            {signupForm.touched.password && signupForm.errors.password && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {signupForm.errors.password}
              </p>
            )}
            {signupForm.touched.confirmPassword &&
              signupForm.errors.confirmPassword && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {signupForm.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-neutral-600 dark:bg-neutral-800"
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-xs text-gray-700 dark:text-gray-300"
            >
              I accept the{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={signupForm.isSubmitting}
            className="w-full flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {signupForm.isSubmitting ? (
              <IconLoader3 className="animate-spin h-4 w-4" />
            ) : (
              <>
                <IconSend2 className="h-4 w-4 mr-2" />
                Create Account
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
