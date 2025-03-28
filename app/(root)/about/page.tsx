import { gradients } from "@/assets/colors";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Founders from "@/components/homelements/Founders";
import FrontContent from "@/components/homelements/FrontContent";
import Testimonials from "@/components/homelements/Testimonials";

export default function About() {
  return (
    <div>
      <div
        className="flex flex-col min-h-screen "
        style={{ background: gradients.gradientbackground }}
      >
        <Header />

        <div className="flex-grow">
          <FrontContent />
          <Testimonials />
          <Founders />
        </div>
        <Footer />
      </div>
    </div>
  );
}
