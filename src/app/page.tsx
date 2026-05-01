import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import Dining from "@/components/sections/Dining";
import Menu from "@/components/sections/Menu";
import FeatureTiles from "@/components/sections/FeatureTiles";
import EventGallery from "@/components/sections/EventGallery";
import Gallery from "@/components/sections/Gallery";
import ReadyToVisit from "@/components/sections/ReadyToVisit";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary-500 selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <AboutUs />
      <EventGallery />
      <Dining />
      <FeatureTiles />
      <Menu />
      <Gallery />
      <Testimonials />
      <ReadyToVisit />
      <Contact />
      <Footer />
    </div>
  );
}
