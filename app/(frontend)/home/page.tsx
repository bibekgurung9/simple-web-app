"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

const HomePage = () => {
  const router = useRouter();
  const logout = async () => {
    try{
      await axios.get('/api/logout')
      router.push('/login')
    } catch(error:any){
      console.log("[LOGOUT_ERROR]", error.message);
    }
  }
  return (
    <div className="flex items-center justify-center mt-16">
      <div className="bg-white p-8 m-6 rounded shadow-xl border-2 border-rounded border-slate-400/90">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-black bg-white text-center">Simple Web App</h1>
        <div className="flex space-x-4 bg-white text-center">
          <Link href="/products" className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-blue-600">View Products</Link>
          <Link href="/chart" className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-blue-600">View Chart</Link>
          <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-500/80">Logout</button>
        </div>
      </div>
    </div>
  )
}

export default HomePage