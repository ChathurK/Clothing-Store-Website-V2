import React, { useState } from "react";
import { ArrowRightIcon, CaretRightIcon } from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper/modules";
import teen1Avif from "../../assets/teen/teen_1.avif";
import teen1Webp from "../../assets/teen/teen_1.webp";
import teen1Png from "../../assets/teen/teen_1.png";
import teen2Avif from "../../assets/teen/teen_2.avif";
import teen2Webp from "../../assets/teen/teen_2.webp";
import teen2Png from "../../assets/teen/teen_2.png";
import teen3Avif from "../../assets/teen/teen_3.avif";
import teen3Webp from "../../assets/teen/teen_3.webp";
import teen3Png from "../../assets/teen/teen_3.png";
import kid1Avif from "../../assets/teen/kid_1.avif";
import kid1Webp from "../../assets/teen/kid_1.webp";
import kid1Png from "../../assets/teen/kid_1.png";
import kid2Avif from "../../assets/teen/kid_2.avif";
import kid2Webp from "../../assets/teen/kid_2.webp";
import kid2Png from "../../assets/teen/kid_2.png";
import kid3Avif from "../../assets/teen/kid_3.avif";
import kid3Webp from "../../assets/teen/kid_3.webp";
import kid3Png from "../../assets/teen/kid_3.png";

const ContentSectionThree = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const kidsProducts = [
    {
      id: 1,
      name: "Cool Graphic Tee",
      price: 3500,
      imageAvif: teen1Avif,
      imageWebp: teen1Webp,
      imagePng: teen1Png,
      link: "/products/kids/cool-graphic-tee",
    },
    {
      id: 2,
      name: "Sporty Hoodie Set",
      price: 5500,
      imageAvif: teen2Avif,
      imageWebp: teen2Webp,
      imagePng: teen2Png,
      link: "/products/kids/sporty-hoodie-set",
    },
    {
      id: 3,
      name: "Trendy Denim Jacket",
      price: 6500,
      imageAvif: teen3Avif,
      imageWebp: teen3Webp,
      imagePng: teen3Png,
      link: "/products/kids/trendy-denim-jacket",
    },
    {
      id: 4,
      name: "Playful Print Dress",
      price: 4500,
      imageAvif: kid1Avif,
      imageWebp: kid1Webp,
      imagePng: kid1Png,
      link: "/products/kids/playful-print-dress",
    },
    {
      id: 5,
      name: "Adventure Cargo Pants",
      price: 4000,
      imageAvif: kid2Avif,
      imageWebp: kid2Webp,
      imagePng: kid2Png,
      link: "/products/kids/adventure-cargo-pants",
    },
    {
      id: 6,
      name: "Comfy Sweater Set",
      price: 5000,
      imageAvif: kid3Avif,
      imageWebp: kid3Webp,
      imagePng: kid3Png,
      link: "/products/kids/comfy-sweater-set",
    },
  ];

  return (
    <section
      id="kids-section"
      className="bg-white py-16 md:py-20 lg:py-24 dark:bg-black"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
          {/* Content - Left on desktop, Top on mobile */}
          <div className="w-full lg:w-1/2">
            <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl lg:text-5xl dark:text-white">
              Kids & Teens Collection
            </h2>
            <p className="text-black-800 dark:text-black-300 mb-4 text-lg md:text-xl">
              Style meets playfulness in our vibrant kids and teens collection.
              Designed for comfort, durability, and self-expression, each piece
              celebrates youthful energy and creativity.
            </p>
            <p className="text-black-500 dark:text-black-400 text-base md:text-lg">
              From school essentials to weekend adventures, our collection
              offers trendy, age-appropriate fashion that kids love and parents
              trust.
            </p>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/products/kids";
              }}
              className="group mt-8 inline-flex cursor-pointer items-center gap-2 text-lg font-semibold text-black dark:text-white"
            >
              Explore Collection
              <ArrowRightIcon
                weight="bold"
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1"
              ></ArrowRightIcon>
            </button>
          </div>

          {/* Image Carousel - Right on desktop, Bottom on mobile */}
          <div className="relative w-full lg:w-1/2">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={1}
              navigation={true}
              speed={1000}
              autoplay={{
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              modules={[Navigation, Autoplay]}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="swiper-nav h-[40vh] w-full sm:h-[50vh] lg:h-[60vh]"
            >
              {kidsProducts.map((product, index) => (
                <SwiperSlide
                  key={`${product.id}-${index}`}
                  style={{ width: "auto" }}
                >
                  <picture>
                    <source srcSet={product.imageAvif} type="image/avif" />
                    <source srcSet={product.imageWebp} type="image/webp" />
                    <img
                      src={product.imagePng}
                      alt={product.name}
                      className="h-full w-auto object-cover"
                    />
                  </picture>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Product Description Overlay */}
            <div className="absolute right-0 bottom-0 left-0 z-10 bg-linear-to-t from-black/80 to-transparent p-6">
              <div className="flex items-end justify-between gap-4">
                <div className="flex flex-col text-white">
                  <h3 className="text-lg font-semibold md:text-xl">
                    {kidsProducts[activeIndex]?.name}
                  </h3>
                  <p className="text-xl font-bold md:text-2xl">
                    Rs. {kidsProducts[activeIndex]?.price.toLocaleString()}
                  </p>
                </div>
                <div className="group relative w-fit">
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = kidsProducts[activeIndex]?.link;
                    }}
                    className="relative z-10 inline-flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white hover:text-black active:text-black md:px-6 md:py-3 md:text-base dark:text-black dark:hover:text-white dark:active:text-white"
                  >
                    View Product
                    <CaretRightIcon weight="bold" className="h-4 w-4" />
                  </button>
                  <div className="absolute top-0 left-0 z-0 h-full w-0 bg-white transition-all duration-300 group-hover:w-full group-active:w-full dark:bg-black" />
                  <div className="absolute top-0 right-0 z-0 h-full w-full bg-black transition-all duration-300 group-hover:w-0 group-active:w-0 dark:bg-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSectionThree;
