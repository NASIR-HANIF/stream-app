import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

export const middleware = async (request) => {
    const response = NextResponse.next();
    //securing admin panel
    const pathname = request.nextUrl.pathname;
    if (request.nextUrl.pathname.startsWith("/admin-panel")) {
        let cookie = request.cookies.get("authToken")
        if (!cookie) {
            return NextResponse.redirect(new URL("/", request.url))
        }

        try {
            // text encode algorethem
            const secret = new TextEncoder().encode(process.env.ADMIN_SECRET);
            const tokenData = await jwtVerify(cookie.value, secret);
            if (tokenData.payload.role === "ADMIN") {
                return NextResponse.rewrite(new URL(pathname, request.url))
            } else {
                return NextResponse.redirect(new URL("/", request.url))
            }

        } catch (error) {
            return NextResponse.redirect(new URL("/", request.url))
        }

    }

    // handling registration
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    if (!token) {
        response.cookies.delete("admin")
        return response;
    }

    try {

        // text encode algorethem
        const secret = new TextEncoder().encode(process.env.ADMIN_SECRET);
        await jwtVerify(token, secret);
        response.cookies.set(
            "admin",
            token,
            { httpOnly: true }
        );
        return response;

    } catch (error) {
        response.cookies.delete("admin")
        return response;
    }

}

export const config = {
    matcher: [
        "/register",
        "/admin-panel/:path*"
    ]
}