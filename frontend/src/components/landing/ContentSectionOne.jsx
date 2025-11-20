import React, { useState } from "react";
import { ArrowRightIcon, CaretRightIcon } from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper/modules";
import men1Avif from "../../assets/men/men_1.avif";
import men1Webp from "../../assets/men/men_1.webp";
import men1Png from "../../assets/men/men_1.png";
import men2Avif from "../../assets/men/men_2.avif";
import men2Webp from "../../assets/men/men_2.webp";
import men2Png from "../../assets/men/men_2.png";
import men3Avif from "../../assets/men/men_3.avif";
import men3Webp from "../../assets/men/men_3.webp";
import men3Png from "../../assets/men/men_3.png";
import men4Avif from "../../assets/men/men_4.avif";
import men4Webp from "../../assets/men/men_4.webp";
import men4Png from "../../assets/men/men_4.png";
import men5Avif from "../../assets/men/men_5.avif";
import men5Webp from "../../assets/men/men_5.webp";
import men5Png from "../../assets/men/men_5.png";

const ContentSectionOne = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const menProducts = [
    {
      id: 1,
      name: "Classic Denim Jacket",
      price: 8500,
      imageAvif: men1Avif,
      imageWebp: men1Webp,
      imagePng: men1Png,
      link: "/products/men/classic-denim-jacket",
    },
    {
      id: 2,
      name: "Urban Bomber Jacket",
      price: 12500,
      imageAvif: men2Avif,
      imageWebp: men2Webp,
      imagePng: men2Png,
      link: "/products/men/urban-bomber-jacket",
    },
    {
      id: 3,
      name: "Premium Cotton Shirt",
      price: 6500,
      imageAvif: men3Avif,
      imageWebp: men3Webp,
      imagePng: men3Png,
      link: "/products/men/premium-cotton-shirt",
    },
    {
      id: 4,
      name: "Casual Polo Tee",
      price: 4500,
      imageAvif: men4Avif,
      imageWebp: men4Webp,
      imagePng: men4Png,
      link: "/products/men/casual-polo-tee",
    },
    {
      id: 5,
      name: "Slim Fit Chinos",
      price: 7500,
      imageAvif: men5Avif,
      imageWebp: men5Webp,
      imagePng: men5Png,
      link: "/products/men/slim-fit-chinos",
    },
  ];

  return (
    <section
      id="men-section"
      className="bg-white py-16 md:py-20 lg:py-24 dark:bg-black"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
          {/* Content - Left on desktop, Top on mobile */}
          <div className="w-full lg:w-1/2">
            <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl lg:text-5xl dark:text-white">
              Men's Collection
            </h2>
            <p className="text-black-800 dark:text-black-300 mb-4 text-lg md:text-xl">
              Discover the perfect blend of style and comfort with our curated
              men's collection. From timeless classics to contemporary trends,
              each piece is designed to elevate your wardrobe.
            </p>
            <p className="text-black-500 dark:text-black-400 text-base md:text-lg">
              Crafted with premium materials and attention to detail, our men's
              line embodies sophistication and versatility for the modern
              gentleman.
            </p>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/products/men";
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
              //   pagination={{ type: "bullets", dynamicBullets: true }}
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
              {menProducts.map((product, index) => (
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
                    {menProducts[activeIndex]?.name}
                  </h3>
                  <p className="text-xl font-bold md:text-2xl">
                    Rs. {menProducts[activeIndex]?.price.toLocaleString()}
                  </p>
                </div>
                <div className="group relative w-fit">
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = menProducts[activeIndex]?.link;
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

export default ContentSectionOne;
