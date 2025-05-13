import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useLoginUserMutation } from "../features/user/userApi";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (loginData) => {
    try {
      const res = await loginUser(loginData);

      if (res.data) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      };

      if (res.data) {
        toast.success(res.data.message);
      };
    } catch (error) {
      console.error("Login user failed", error);
      toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          {/* Email Field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className={`input input-bordered w-full ${
                errors.email ? "input-error" : ""
              }`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-error text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className={`input input-bordered w-full ${
                errors.password ? "input-error" : ""
              }`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-error text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!isValid}
          >
            Login
          </button>
          <Link to="/register">Don't have your account so register please</Link>
        </form>
      </div>
    </>
  );
}
