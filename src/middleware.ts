import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/authService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];
const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/dashboard/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`http://localhost:3000/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (userInfo.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const proctedRoutes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (proctedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};
