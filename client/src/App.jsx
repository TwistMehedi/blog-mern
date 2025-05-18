import { Route, Routes } from 'react-router'
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from './pages/Login.jsx';
import Navbar from './shared/Navbar.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import Profile from './pages/Profile.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userApi } from './features/user/userApi.js';
import { login } from './features/user/userSlice.js';
import PostDetails from './components/Post/PostDetails.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
     try {
      const fetch = async () => {
      const result = await dispatch(userApi.endpoints.getCurrentUser.initiate()).unwrap();
      if(result){
        dispatch(login(result))
      }
    };
    fetch();
     } catch (error) {
      console.log("Golobal user load error")
     }
  },[dispatch]);
    
  return (
      <>
      <Navbar></Navbar>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/verify" element={<VerifyEmail/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/post" element={<PostDetails/>}></Route>
      <Route path="/forgot-password/:token" element={<ForgotPassword/>}></Route>
     </Routes>
     </>
  )
}

export default App
