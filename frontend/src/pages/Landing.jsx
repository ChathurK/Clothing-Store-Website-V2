import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/landing/HeroSection";
import CTASectionPrimary from "../components/landing/CTASectionPrimary";
import CarousalSection from "../components/landing/CarousalSection";
import CTASectionSecondary from "../components/landing/CTASectionSecondary";
import ContentSectionOne from "../components/landing/ContentSectionOne";
import ContentSectionTwo from "../components/landing/ContentSectionTwo";
import ContentSectionThree from "../components/landing/ContentSectionThree";
import ScrollerToTopBtn from "../components/common/ScrollerToTopBtn";

const Landing = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 md:pt-20">
        <HeroSection />
        <CTASectionPrimary />
        <CarousalSection />
        <ContentSectionOne />
        <ContentSectionTwo />
        <ContentSectionThree />
        <CTASectionSecondary />
      </main>
      <Footer />
      <ScrollerToTopBtn />
    </>
  );
};

export default Landing;
