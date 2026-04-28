import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import Amenities from "@/components/sections/Amenities";
import Dining from "@/components/sections/Dining";
import Events from "@/components/sections/Events";
import Menu from "@/components/sections/Menu";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary-500 selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <AboutUs />
      <Amenities />
      <Dining />
      <Events />
      <Menu />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
