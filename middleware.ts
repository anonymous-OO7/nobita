import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BASE_URL_TEXT_FILE =
  "https://raw.githubusercontent.com/anonymous-OO7/assets/refs/heads/master/workisturl.txt";
const LOCAL_STORAGE_KEY = "onePieceBaseURL";

const fetchBaseURL = async (): Promise<string> => {
  try {
    const response = await axios.get(BASE_URL_TEXT_FILE);
    return response.data.trim();
  } catch (error) {
    console.error("Error fetching base URL:", error);
    return "https://fallback-url.com";
  }
};

export function middleware(req: NextRequest) {
  console.log("Middleware is running on:", req.nextUrl.pathname);

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
