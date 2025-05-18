import { useGetCurrentUserQuery } from "../features/user/userApi";

import CreatePost from "../components/Post/CreatePost";
 
import ProfileCard from "../components/Profile/ProfileCard";
import PostEditeModal from "../components/Post/PostEditeModal";
import UserAllPosts from "../components/Profile/UserAllPosts";

export default function Profile() {
  const { data } = useGetCurrentUserQuery();
  const user = data?.user;
  console.log(user);
 

  const openCreateModal = () => {
    const modablog = document.getElementById("my_modal_4");
    if (modablog) {
      modablog.showModal();
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center px-4 py-10">
      <ProfileCard />
      <div className="bg-white shadow-md p-4 mt-8 rounded w-220">
        <div className="text-right">
          <button onClick={openCreateModal} className="btn btn-neutral">
            Create Blog
          </button>
          <CreatePost />
        </div>
        <UserAllPosts/>
        <PostEditeModal />
      </div>
    </div>
  );
}
