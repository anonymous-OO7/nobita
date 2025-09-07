import "./blogs.css";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import Navbar from "@/components/pages/landing/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Workist ",
  description: "Workist blogs!",
};

export default function RootLayout({ children }) {
  return (
    <ThemeContextProvider>
      <ThemeProvider>
        <Navbar />
        <main className="mainContainer">
          <div className="container">
            <div className="wrapper"></div>
            {children}
          </div>
        </main>
        <Footer />
      </ThemeProvider>
    </ThemeContextProvider>
  );
}
