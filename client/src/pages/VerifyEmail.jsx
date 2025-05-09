import React from "react";
import { useForm } from "react-hook-form";

const VerifyEmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  export default function onSubmit (){
    console.log("Verifying email:", data.email);
    // Add your email verification logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Verify Email</h2>

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
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <span className="text-error text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!isValid}
        >
          Send Verification
        </button>
      </form>
    </div>
  );
};
 
