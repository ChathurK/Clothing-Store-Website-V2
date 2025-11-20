import React, { useState } from "react";
import { ArrowRightIcon, CaretRightIcon } from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper/modules";
import women1Avif from "../../assets/women/women_1.avif";
import women1Webp from "../../assets/women/women_1.webp";
import women1Png from "../../assets/women/women_1.png";
import women2Avif from "../../assets/women/women_2.avif";
import women2Webp from "../../assets/women/women_2.webp";
import women2Png from "../../assets/women/women_2.png";
import women3Avif from "../../assets/women/women_3.avif";
import women3Webp from "../../assets/women/women_3.webp";
import women3Png from "../../assets/women/women_3.png";
import women4Avif from "../../assets/women/women_4.avif";
import women4Webp from "../../assets/women/women_4.webp";
import women4Png from "../../assets/women/women_4.png";
import women5Avif from "../../assets/women/women_5.avif";
import women5Webp from "../../assets/women/women_5.webp";
import women5Png from "../../assets/women/women_5.png";

const ContentSectionTwo = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const womenProducts = [
    {
      id: 1,
      name: "Elegant Summer Dress",
      price: 9500,
      imageAvif: women1Avif,
      imageWebp: women1Webp,
      imagePng: women1Png,
      link: "/products/women/elegant-summer-dress",
    },
    {
      id: 2,
      name: "Bohemian Maxi Dress",
      price: 11500,
      imageAvif: women2Avif,
      imageWebp: women2Webp,
      imagePng: women2Png,
      link: "/products/women/bohemian-maxi-dress",
    },
    {
      id: 3,
      name: "Classic Blazer Set",
      price: 14500,
      imageAvif: women3Avif,
      imageWebp: women3Webp,
      imagePng: women3Png,
      link: "/products/women/classic-blazer-set",
    },
    {
      id: 4,
      name: "Silk Evening Gown",
      price: 18500,
      imageAvif: women4Avif,
      imageWebp: women4Webp,
      imagePng: women4Png,
      link: "/products/women/silk-evening-gown",
    },
    {
      id: 5,
      name: "Casual Denim Jacket",
      price: 7500,
      imageAvif: women5Avif,
      imageWebp: women5Webp,
      imagePng: women5Png,
      link: "/products/women/casual-denim-jacket",
    },
  ];

  return (
    <section
      id="women-section"
      className="bg-black-50 py-16 md:py-20 lg:py-24 dark:bg-black"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-8 lg:flex-row-reverse lg:gap-12">
          {/* Content - Right on desktop, Top on mobile */}
          <div className="w-full lg:w-1/2">
            <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl lg:text-5xl dark:text-white">
              Women's Collection
            </h2>
            <p className="text-black-800 dark:text-black-300 mb-4 text-lg md:text-xl">
              Embrace elegance and confidence with our exclusive women's
              collection. Each piece tells a story of grace, empowerment, and
              timeless beauty.
            </p>
            <p className="text-black-500 dark:text-black-400 text-base md:text-lg">
              From everyday essentials to statement pieces, our carefully
              curated selection celebrates the diverse styles and personalities
              of modern women.
            </p>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/products/women";
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

          {/* Image Carousel - Left on desktop, Bottom on mobile */}
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
              {womenProducts.map((product, index) => (
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
                    {womenProducts[activeIndex]?.name}
                  </h3>
                  <p className="text-xl font-bold md:text-2xl">
                    Rs. {womenProducts[activeIndex]?.price.toLocaleString()}
                  </p>
                </div>
                <div className="group relative w-fit">
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = womenProducts[activeIndex]?.link;
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

export default ContentSectionTwo;
