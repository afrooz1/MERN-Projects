import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successful");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-slate-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-slate-800">
        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
          {/* Close Button */}
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            ✕
          </Link>

          {/* Signup Heading */}
          <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
            Signup
          </h3>

          {/* Full Name Input */}
          <div className="space-y-2 mb-4">
            <label className="text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-slate-900 dark:text-white dark:border-gray-700"
              {...register("fullname", { required: true })}
            />
            {errors.fullname && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-2 mb-4">
            <label className="text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-slate-900 dark:text-white dark:border-gray-700"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2 mb-6">
            <label className="text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-slate-900 dark:text-white dark:border-gray-700"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          {/* Signup Button and Login Link */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Signup
            </button>
            {/* <p className="text-gray-700 dark:text-gray-300">
              Have an account?{" "}
              <button
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </button>
              
            </p> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;