import React, { useState } from "react";
import { useGetCurrentUserQuery } from "../features/user/userApi";

export default function Profile () {
  const [showPassword, setShowPassword] = useState(false);

  // Dummy user data (replace with real data)

  const {data} = useGetCurrentUserQuery()
  const userr = data?.user;
  console.log(userr);
  

  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "supersecret123",
    profilePicture:
      "https://i.pravatar.cc/150?img=3", // Dummy avatar, replace with real image URL
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col items-center">
          <div className="avatar mb-4">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.profilePicture} alt="Profile" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
          <p className="text-sm text-gray-500 mb-4">Profile Information</p>
        </div>

        <div className="space-y-4">
          <div>
            <span className="font-semibold">Name:</span>
            <p className="text-gray-700">{user.name}</p>
          </div>
          <div>
            <span className="font-semibold">Email:</span>
            <p className="text-gray-700">{user.email}</p>
          </div>
          <div>
            <span className="font-semibold">Password:</span>
            <p className="text-gray-700">
              {showPassword ? user.password : "*".repeat(user.password.length)}
            </p>
            <button
              className="btn btn-sm btn-link text-primary mt-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
