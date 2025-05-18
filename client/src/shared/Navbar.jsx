import { useSelector } from "react-redux";
import { Link } from "react-router"; // corrected router import
import { useLogOutUserMutation } from "../features/user/userApi";
import { toast, ToastContainer } from 'react-toastify';

export default function Navbar() {
  const userr = useSelector((state) => state.user);
  const user = userr?.user;
  // console.log(user);

  const [logOutUser] = useLogOutUserMutation();

  const logOut = async() =>{
    try {
      const res = await logOutUser();
      if(res.data){
        toast(res.data.message);
      }
    } catch (error) {
      console.error(error,"Log out problem");
      toast(res.error.message )
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Left Section */}
      <ToastContainer />
      <div className="flex-1">  
        <Link to="/" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {user && (
                 <Link to="/profile">Profile</Link>
              )}
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
               {
                user && (
                  <Link to="/logout">Logout</Link>
                )
               }
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
               {user && (
                <Link to="/login">Login</Link>
               )}
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-4 items-center">
        <Link to="/" className="btn btn-ghost">
          Home
        </Link>
         {!user && <Link to="/register" className="btn btn-ghost">
          Register
        </Link>}
         {!user && <Link to="/login" className="btn btn-ghost">
          Login
        </Link>}
         {user && <Link to="/profile" className="btn btn-ghost">
          Profile
        </Link>
        }

        {/* Avatar */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
               {
                user && (
                  <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
                )
               }
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
               {user && (
                <button onClick={logOut}>Logout</button>
               )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
