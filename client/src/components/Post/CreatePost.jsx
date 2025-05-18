import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateBlogPostMutation } from "../../features/post/postApi";
import { toast } from "react-toastify";

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onSubmit" });

  const [blogImage, setBlogImage] = useState(null);
  const [category, setCategory] = useState("");
  const [createBlogPost] = useCreateBlogPostMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImage(file);
    }
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const onSubmit = async (createBlog) => {
    if (!category) {
      toast("Please select a category");
      return;
    }

    const formData = new FormData();
    formData.append("postTitle", createBlog.postTitle);
    formData.append("postDescription", createBlog.postDescription);
    formData.append("subTitle", createBlog.subTitle);
    formData.append("category", category);
    if (blogImage) {
      formData.append("image", blogImage);
    }

    try {
      const res = await createBlogPost(formData);
      if (res.data) {
        toast.success(res.data.message);
        reset();
        document.getElementById("my_modal_4").close();
        setBlogImage(null);
        setCategory("");
      }
    } catch (error) {
      toast.error(error?.error?.data?.message || "Something went wrong");
    }
  };

  return (
    <dialog id="my_modal_4" className="modal">
      <div className="modal-box">
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => document.getElementById("my_modal_4").close()}
        >
          ✕
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Enter your post title"
            className="input input-bordered w-full my-2"
            {...register("postTitle", { required: "Post title is required" })}
          />
          {errors.postTitle && (
            <p className="text-red-500 text-sm">{errors.postTitle.message}</p>
          )}

          <input
            type="text"
            placeholder="Enter your post description"
            className="input input-bordered w-full my-2"
            {...register("postDescription", {
              required: "Post description is required",
            })}
          />
          {errors.postDescription && (
            <p className="text-red-500 text-sm">
              {errors.postDescription.message}
            </p>
          )}

          <input
            type="text"
            placeholder="Enter your post subtitle"
            className="input input-bordered w-full my-2"
            {...register("subTitle", {
              required: "Subtitle is required",
            })}
          />
          {errors.subTitle && (
            <p className="text-red-500 text-sm">{errors.subTitle.message}</p>
          )}

          <div className="text-left">
            <select
              onChange={handleCategory}
              className="select w-full my-2"
              value={category}
            >
              <option value="" disabled>
                Pick a Category
              </option>
              <option value="technology">Technology</option>
              <option value="news">News</option>
              <option value="sports">Sports</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="health">Health</option>
            </select>
          </div>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full my-2"
            onChange={handleImageChange}
          />

          <div className="text-right">
            <button type="submit" className="btn btn-primary mt-2">
              Create
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
