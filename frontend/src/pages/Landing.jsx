import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/landing/HeroSection";
import CTASectionPrimary from "../components/landing/CTASectionPrimary";
import CarousalSection from "../components/landing/CarousalSection";
import CTASectionSecondary from "../components/landing/CTASectionSecondary";
import ScrollerToTopBtn from "../components/common/ScrollerToTopBtn";
import ParallaxSection from "../components/landing/ParallaxSection";
import ParallaxSectionMobile from "../components/landing/ParallaxSectionMobile";

const Landing = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 sm:pt-12">
        <HeroSection />
        <CTASectionPrimary />
        <CarousalSection />

        {/* For mobile devices */}
        <div className="block sm:hidden">
          <ParallaxSectionMobile />
        </div>
        {/* For screens larger than small */}
        <div className="hidden sm:block">
          <ParallaxSection />
        </div>
        
        <CTASectionSecondary />
      </main>
      <Footer />
      <ScrollerToTopBtn />
    </>
  );
};

export default Landing;
