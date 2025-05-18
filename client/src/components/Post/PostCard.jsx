import React from "react";

export default function PostCard({ post }) {
  return (
    <div
       
      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
    >
      <img
        src={post?.image?.url}
        alt="UX Review"
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <p className="text-sm text-indigo-600 font-medium mb-1">
          {post.subTitle}
        </p>
        <h3 className="text-lg font-semibold text-gray-900">
          {post.postTitle}
        </h3>
        <p className="mt-2 text-gray-600 text-sm">{post.postDescription}</p>

        <div className="text-sm">
          <p className="text-gray-900 font-medium">{post?.user?.name}</p>
          <p className="text-gray-500">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
