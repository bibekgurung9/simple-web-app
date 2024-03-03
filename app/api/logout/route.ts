import { NextResponse } from "next/server";

export function GET(){
  try{
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
    })
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    return response;
  } catch(error:any){
    return NextResponse.json("[ERROR_LOG_OUT]", { status: 500})
  }
}