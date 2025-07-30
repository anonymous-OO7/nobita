import { Colors, gradients } from "@/assets/colors";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Clients from "@/components/homelements/Clients";
import Contact from "@/components/homelements/ContactUs";
import Founders from "@/components/homelements/Founders";
import FrontContent from "@/components/homelements/FrontContent";
import TechContent from "@/components/homelements/TechContent";
import Testimonials from "@/components/homelements/Testimonials";
import UserCount from "@/components/homelements/UserCount";
import Accordian from "@/components/homelements/Accordian";

export default function About() {
  return (
    <div>
      <div
        className="flex flex-col min-h-screen "
        style={{ background: Colors.light }}
      >
        <Header />
        <div className="flex-grow">
          <FrontContent />
          <TechContent />
          {/* <Clients /> */}
          <Testimonials />
          {/* <Founders /> */}
          <UserCount />
          <Accordian />
          <Contact />
        </div>
        <Footer />
      </div>
    </div>
  );
}
