import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useRegisterUserMutation } from "../features/user/userApi";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

export default function Register() {
  const [registerUser] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (registerData) => {
    try {
      const res = await registerUser(registerData);

      if (res.data) {
       toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Register failed", error);
       toast.error(error?.data?.message || "Registration failed");
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
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {/* Name Field */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className={`input input-bordered w-full ${
              errors.name ? "input-error" : ""
            }`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-error text-sm mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
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
            placeholder="Enter your password"
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

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your confirm password"
            className={`input input-bordered w-full ${
              errors.confirmPassword ? "input-error" : ""
            }`}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Password do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-error text-sm mt-1">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!isValid}
        >
          Register
        </button>
        <Link to="/login" className="text-blue-500">
          You have account so login please
        </Link>
      </form>
    </div>
    </>
  );
}
