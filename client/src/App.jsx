 
import { Route, Routes } from 'react-router'
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
 import Login from './pages/Login.jsx';

function App() {
  return (
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
     </Routes>
  )
}

export default App
