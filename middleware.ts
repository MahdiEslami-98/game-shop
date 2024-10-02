import { NextResponse, type NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const accessToken = request.cookies.get("access_token")?.value;
  const userRole = request.cookies.get("user_role")?.value;

  if (
    request.nextUrl.pathname.match("/login") ||
    request.nextUrl.pathname.match("/signup")
  ) {
    if (accessToken) {
      if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        return NextResponse.redirect(new URL("/userAccount", request.url));
      }
    }
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
};

export const config = {
  matcher: ["/login", "/signup", "/dashboard"],
};
