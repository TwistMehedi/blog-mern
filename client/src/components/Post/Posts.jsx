
import { useAllPostQuery } from "../../features/post/postApi";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchText,
  setSelectedCategory,
} from "../../features/post/postSlice";

export default function Posts() {

  const { searchText, selectedCategory } = useSelector(
    (state) => state.post
  );
   
  const dispatch = useDispatch();
  const { data } = useAllPostQuery();
  const posts = data?.posts || [];

  const filteredPosts = posts?.filter((post) => {
    const matchesCategory = selectedCategory
      ? post.category === selectedCategory
      : true;
      console.log(post)
    const matchesSearch = (post.postTitle || "")
  .toLowerCase()
  .includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const uniqueCategories = [...new Set(posts.map((post) => post.category))];

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-1/4 p-4">
        <h2 className="font-semibold text-lg mb-4">Category</h2>
        <select
          value={selectedCategory}
          onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
          className="select w-full"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
               {category}
            </option>
          ))}
        </select>
      </div>

      {/* Main content */}
      <div className="md:w-3/4">
        <section className="px-4 py-8 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-indigo-600 font-semibold mb-2">Our blog</p>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Resources and insights
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              The latest industry news, interviews, technologies, and resources.
            </p>
            <div className="mt-6">
              <input
              
                type="text"
                 value={searchText}
                placeholder="Search posts..."
                className="input input-bordered w-full max-w-md"
                onChange={(e) => dispatch(setSearchText(e.target.value))}
              />
            </div>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => <PostCard post={post} key={index} />)
            ) : (
              <p className="text-center col-span-3 text-gray-500">
                No posts found.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
