import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Providers } from "./providers";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Workist",
  description: "workist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        {/* <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.PUBLIC_GOOGLE_ADSENSE_CLIENTID}`}
          crossOrigin="anonymous"
        ></Script> */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENTID}
        ></script>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
