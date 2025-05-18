import React, { useState } from "react";
import { useGetCurrentUserQuery } from "../../features/user/userApi";
import EditeModal from "./EditeModal";

export default function ProfileCard() {
      const [showPassword, setShowPassword] = useState(false);
    
    const { data } = useGetCurrentUserQuery();
      const user = data?.user;
      console.log(user);

      const openModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.showModal();
    }
  };


  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col items-center">
        <div className="avatar mb-4">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user?.image} alt={user?.name} />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
        <p className="text-sm text-gray-500 mb-4">Profile Information</p>
      </div>
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Name:</span>
          <p className="text-gray-700">{user?.name}</p>
        </div>
        <div>
          <span className="font-semibold">Email:</span>
          <p className="text-gray-700">{user?.email}</p>
        </div>
        <div>
          <span className="font-semibold">Password:</span>
          <p className="text-gray-700">
            {showPassword ? user?.password : "*".repeat(user?.password.length)}
          </p>
          <button
            className="btn btn-sm btn-link text-primary mt-1"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>

        <button onClick={openModal} className="btn btn-neutral">
          Edite
        </button>
        <EditeModal />
      </div>
    </div>
  );
}
