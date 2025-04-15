import About from "../../components/Home/About";
import Footer from "../../components/Home/Footer";
import Hero from "../../components/Home/Hero";
import Navbar from "../../components/Home/Navbar";
import Services from "../../components/Home/Services";
import TestimonialPage from "../../components/Home/Testimonials";

// src/pages/Home/Page.js
export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <TestimonialPage />
      <Footer />
    </>
  );
}
