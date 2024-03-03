"use client";
import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginForm =  () => {
  const router = useRouter();
  const [ user, setUser ] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const onLogin = async (e:any) =>{
    e.preventDefault();
    console.log("[LOGIN_FUNCTION_CALLED]");
    try{
      const response = await axios.post("/api/login", user);
      console.log("[LOGIN_SUCESS]", response);
      router.push("/home");
    } catch(error:any){
      console.log("[LOGIN_HAS_FAILED]", error.message);
    }
  }
  const autoFill= () => {
    setUser({
      username: "kminchelle",
      email: "kminchelle@qq.com",
      password: "0lelplR",
    })
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-y-2 justify-center items-center min-h-screen'>
      <div className='w-3/4 justify-center items-center text-white rounded-lg p-4 bg-gray-900 text-center text-xs m-auto'>
        <h3 className='text-xl font-bold'>User Login Credentials: </h3>
        <p className='text-lg'>Username: <span className='text-gray-200/90 '>kminchelle</span></p>
        <p className='text-lg'>Email: <span className='text-gray-200/90 '>kminchelle@qq.com</span></p>
        <p className='text-lg'>Password: <span className='text-gray-200/90 '>0lelplR</span></p>
        <button
          onClick={autoFill}
          className='p-4 text-lg bg-black hover:bg-black/40 text-white rounded-lg'>AutoFill Credentials</button>
      </div>
      <div
        className="shadow-2xl rounded-lg w-3/4 p-6 bg-gray-800 m-auto">
          <form className="space-y-6" onSubmit={onLogin}>
            <h3 className="text-2xl font-bold text-white text-center">Login</h3>
            <div className='flex flex-col items-center'>
              <label className="text-l text-white font-medium mb-2">Username: </label>
              <input 
                  type="text" 
                  name="username"
                  value={user.username}
                  onChange={(e) => setUser({...user, username:e.target.value})} 
                  className="text-black rounded-lg w-full p-2"
                  placeholder='Enter Your Email' 
              />
            </div>
            <div className='flex flex-col items-center'>
              <label className="text-l text-white font-medium mb-2">Email Address: </label>
              <input 
                  type="email" 
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({...user, email:e.target.value})} 
                  className="text-black rounded-lg w-full p-2"
                  placeholder='Enter Your Email' 
              />
            </div>
            <div className='flex flex-col items-center'>
              <label className="text-l text-white font-medium mb-2">Password</label>
              <input 
                  type="password" 
                  name="password"
                  value={user.password}
                  onChange={(e) => setUser({...user, password:e.target.value})}  
                  className="text-black rounded-lg w-full p-2"
                  placeholder='Enter Your Password' 
              />
            </div>
            <button type="submit" className="w-full bg-black text-white rounded-xl p-2 hover:bg-black/40">Login to your account</button>
          </form>
      </div>
    </div>


  )
}

export default LoginForm