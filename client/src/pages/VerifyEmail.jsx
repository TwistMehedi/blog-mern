import { useLocation, useNavigate } from 'react-router'
import { useVerifyUserEmailQuery } from '../features/user/userApi';
import { useEffect } from 'react';

export default function VerifyEmail() {
   const query = new URLSearchParams(useLocation().search);
   const token = query.get("token");
   const navigate = useNavigate();
  const {data, error, isLoading} = useVerifyUserEmailQuery(token);


  const redirect =()=>{
    const timer = setTimeout(()=>{
      navigate("/")
    },2000);
    return ()=> clearTimeout(timer)
  };

  useEffect(()=>{

    if(data){
       redirect();
    };
    
  },[data, navigate])

  return (
     <div>
      {isLoading && <p>Email verifying...</p>}
      {error && <p>{JSON.stringify(error)}</p>}
      {data && <p>Email verified! Redirecting home page</p>}
    </div>
  )
}
