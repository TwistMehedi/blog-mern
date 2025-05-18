import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function EditeModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const [image, setImage] = useState(null);
  const handleImageChange = (e) =>{
    const file = e.target.files[0];
    if(file){
        setImage(file)
    };
     
  };

  const onSubmit = async (editeData) => {
    const formData = new FormData();
    formData.append("name", editeData.name)
     if(image){
        formData.append("image", image)
     };
    console.log(editeData);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => document.getElementById("my_modal_3").close()}
        >
          ✕
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered w-full my-2"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        <input
        type="file"
       accept="image/*"
            className="file-input file-input-bordered w-full my-2"
        onChange={handleImageChange}
        />
          <button type="submit" className="btn btn-primary mt-2">
             Save
          </button>
        </form>
      </div>
    </dialog>
  );
}
