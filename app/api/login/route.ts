import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const secretKey = 'secret'; 

export async function POST(request: NextRequest){
  try {
    const reqBody = await request.json();
    const {username, email, password } = reqBody;

    const isValidUser = authUser(username, email, password);
    
    if(!isValidUser) return null;

    const apiResponse = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })

    if (apiResponse.ok) {
      const reponseData = await apiResponse.json();
      console.log(reponseData);
      
      const tokenData = {
        id: reponseData.id,
        username: reponseData.username,
        email: reponseData.email,
      }
      
      const token = await jwt.sign(tokenData, secretKey, {expiresIn: "1d"});

      const response = NextResponse.json({
        message: "Login Successful!",
        success: true,
      })
      response.cookies.set("token", token, {
        httpOnly: true,
      })
      return response;
    }
  } catch(error:any){
    return NextResponse.json({ error: error.message}, {status: 500})
  }
}

function authUser(username: string, email: string, password: string) : boolean {
  const validCredentials = username === 'kminchelle' && email === 'kminchelle@qq.com' && password === '0lelplR';
  return validCredentials;
}