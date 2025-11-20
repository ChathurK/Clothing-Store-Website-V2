import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/landing/HeroSection";
import CTASectionPrimary from "../components/landing/CTASectionPrimary";
import CarousalSection from "../components/landing/CarousalSection";
import CTASectionSecondary from "../components/landing/CTASectionSecondary";
import ScrollerToTopBtn from "../components/common/ScrollerToTopBtn";

const Landing = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 sm:pt-12">
        <HeroSection />
        <CTASectionPrimary />
        <CarousalSection />
        <CTASectionSecondary />
      </main>
      <Footer />
      <ScrollerToTopBtn />
    </>
  );
};

export default Landing;
