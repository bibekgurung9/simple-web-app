import { getTokenData } from "@/utils/getTokenData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
  try{
    const userData = await getTokenData(request);
    return NextResponse.json(userData);
    
  } catch(error:any){
    return NextResponse.json({error: error.message}, {status: 400});
  }
}