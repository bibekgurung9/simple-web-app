import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/logout'

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/home', request.nextUrl))
  }
  
  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }


}

export const config = {
  matcher: [
    '/',
    '/home',
    '/login',
    '/products',
    '/piechart',
  ]
}