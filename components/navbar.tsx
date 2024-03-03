"use client";
import Link from "next/link"
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Navbar(){
  const router = useRouter();

  const logoutUser = async () => {
    try{
      await axios.get('/api/logout')
      router.push('/')
    } catch(error:any){
      console.log("[LOGOUT_ERROR]", error.message);
    }
  }

  return(
    <header>
      <nav
        className="flex items-center justify-between p-6 lg:px-8 h-14 border border-t-0 border-l-0 border-r-0 border-b-gray-600 bg-sky-400/70 border-b-2">
          <div className="text-xl flex gap-x-6 font-bold">
            <Link href={"/home"} className=" hover:scale-105">Home</Link>
            <Link href={"/products"} className=" hover:scale-105">Product</Link>
            <Link href={"/chart"} className=" hover:scale-105">Chart</Link>
          </div>
          <button 
            className="bg-black hover:bg-black/60 text-white p-2 rounded-lg  hover:scale-105"
            onClick={logoutUser}>
            Logout
          </button>
      </nav>
    </header>
  )
}