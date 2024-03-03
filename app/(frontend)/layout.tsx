"use client"
import Navbar from "@/components/navbar"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const FrontEndlayout = ({
  children,
} : {
  children: React.ReactNode
}) => {
  const router = useRouter();
  const [user, setUser] = useState("nothing");
  const [userEmail, setUserEmail ] = useState("");

  useEffect(() => {
    const userDetails = async () => {
      const res = await axios.get('/api/user')
      console.log("Current User: ", res.data.username)
      setUser(res.data.username);
      setUserEmail(res.data.email)
    } 
    userDetails();
  })
  return(
    <div className="h-full">
      <Navbar />
      {user === 'nothing' ? "No User Found" 
      :
      <div>
        <h2 className="text-center text-xl mt-12 font-bold">Currently Logged In User: 
          <span className="text-slate-500 ml-2">{user.toUpperCase()}</span> <br /> 
        </h2>
        <h2 className="text-center text-xl mt-2 font-bold">Currently Logged In User's Email: 
         <span className="text-slate-500 ml-2">{userEmail.toUpperCase()}</span> 
        </h2>
      </div>

      }
      {children}
    </div>
  )
}
export default FrontEndlayout;