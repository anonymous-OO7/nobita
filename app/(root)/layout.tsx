import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Providers } from "./providers";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import AdSense from "@/components/AdSense";
import { Suspense } from "react";

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
      <head>
        {/* Google AdSense Script */}
        {/* <AdSense pId={"ca-pub-2888315269414105"} /> */}
        {/* <meta
          name="google-adsense-account"
          content="ca-pub-2888315269414105"
        ></meta>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2888315269414105"
          crossOrigin="anonymous"
        ></script> */}
        <meta name="google-adsense-account" content="ca-pub-2888315269414105" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2888315269414105"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${poppins.variable}`}>
        <Suspense>
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
        </Suspense>
      </body>
    </html>
  );
}
