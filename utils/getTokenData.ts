import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { secretKey } from "@/app/api/login/route";
export function getTokenData(request: NextRequest){
  try{
    const token =request.cookies.get("token")?.value || "";
    
    const decodedToken = jwt.verify(token, secretKey!)
    return decodedToken;
  } catch(error:any){
    throw new Error(error.message)
  }
}