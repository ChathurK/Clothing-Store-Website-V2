import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper/modules";

import cloth1Avif from "../../assets/carousal/carousal_img_portrait_of_businessman.avif";
import cloth1Webp from "../../assets/carousal/carousal_img_portrait_of_businessman.webp";
import cloth1Jpg from "../../assets/carousal/carousal_img_portrait_of_businessman.jpg";
import cloth2Avif from "../../assets/carousal/carousal_img_woman_in_summer_floral_fashion.avif";
import cloth2Webp from "../../assets/carousal/carousal_img_woman_in_summer_floral_fashion.webp";
import cloth2Jpg from "../../assets/carousal/carousal_img_woman_in_summer_floral_fashion.jpg";
import cloth3Avif from "../../assets/carousal/carousal_img_bright_modern_mens_fashion.avif";
import cloth3Webp from "../../assets/carousal/carousal_img_bright_modern_mens_fashion.webp";
import cloth3Jpg from "../../assets/carousal/carousal_img_bright_modern_mens_fashion.jpg";
import cloth4Avif from "../../assets/carousal/carousal_img_fall_fashion_on_black_brick.avif";
import cloth4Webp from "../../assets/carousal/carousal_img_fall_fashion_on_black_brick.webp";
import cloth4Jpg from "../../assets/carousal/carousal_img_fall_fashion_on_black_brick.jpg";
import cloth5Avif from "../../assets/carousal/carousal_img_modern_man_in_suit_and_glasses.avif";
import cloth5Webp from "../../assets/carousal/carousal_img_modern_man_in_suit_and_glasses.webp";
import cloth5Jpg from "../../assets/carousal/carousal_img_modern_man_in_suit_and_glasses.jpg";
import cloth6Avif from "../../assets/carousal/carousal_img_woman_in_red_perches_on_stool.avif";
import cloth6Webp from "../../assets/carousal/carousal_img_woman_in_red_perches_on_stool.webp";
import cloth6Jpg from "../../assets/carousal/carousal_img_woman_in_red_perches_on_stool.jpg";
import cloth7Avif from "../../assets/carousal/carousal_img_classy_tuxedo_fashion.avif";
import cloth7Webp from "../../assets/carousal/carousal_img_classy_tuxedo_fashion.webp";
import cloth7Jpg from "../../assets/carousal/carousal_img_classy_tuxedo_fashion.jpg";
import { CaretRightIcon } from "@phosphor-icons/react";

const images = [
  {
    id: 1,
    name: "Navy Blue Slim-Fit Business Suit for Men with Burgundy Tie",
    price: 8500,
    srcAvif: cloth1Avif,
    srcWebp: cloth1Webp,
    srcJpg: cloth1Jpg,
    link: "/product/1",
  },
  {
    id: 2,
    name: "Black Floral Print Two-Piece Summer Skirt Set (Crop Top and Maxi Skirt)",
    price: 4500,
    srcAvif: cloth2Avif,
    srcWebp: cloth2Webp,
    srcJpg: cloth2Jpg,
    link: "/product/2",
  },
  {
    id: 3,
    name: "Azure Blue Tailored Blazer and Abstract Print Button-Up Shirt",
    price: 6500,
    srcAvif: cloth3Avif,
    srcWebp: cloth3Webp,
    srcJpg: cloth3Jpg,
    link: "/product/3",
  },
  {
    id: 4,
    name: "Striped Blue and White Denim Overalls/Jumpsuit for Women",
    price: 3800,
    srcAvif: cloth4Avif,
    srcWebp: cloth4Webp,
    srcJpg: cloth4Jpg,
    link: "/product/4",
  },
  {
    id: 5,
    name: "Dark Navy Suit with Micro-Patterned Dress Shirt",
    price: 7800,
    srcAvif: cloth5Avif,
    srcWebp: cloth5Webp,
    srcJpg: cloth5Jpg,
    link: "/product/5",
  },
  {
    id: 6,
    name: "Bold Red Tailored Women's Pantsuit / Business Set",
    price: 5500,
    srcAvif: cloth6Avif,
    srcWebp: cloth6Webp,
    srcJpg: cloth6Jpg,
    link: "/product/6",
  },
  {
    id: 7,
    name: "Luxury Red Velvet Tuxedo Jacket with Black Contrast Lapel",
    price: 12000,
    srcAvif: cloth7Avif,
    srcWebp: cloth7Webp,
    srcJpg: cloth7Jpg,
    link: "/product/7",
  },
];

const CarousalSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section id="carousal" className="relative">
      <Swiper
        spaceBetween={5}
        slidesPerView={1}
        grabCursor={false}
        navigation={true}
        speed={1000}
        loop={true}
        onActiveIndexChange={(e) => setActiveIndex(e.realIndex)}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          // pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Navigation]}
        className="continuous-swiper h-[40vh] w-full sm:h-[50vh] lg:h-[75vh] xl:h-[calc(100vh-268px)]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <picture className="flex h-full w-full items-center justify-center">
              <source srcSet={image.srcAvif} type="image/avif" />
              <source srcSet={image.srcWebp} type="image/webp" />
              <img
                className="h-full w-full object-cover object-center"
                src={image.srcJpg}
                alt={image.name}
              />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-0 z-20 grid h-1/3 w-full grid-cols-2 items-center bg-linear-to-t from-black/50 to-transparent px-14 pb-2 max-sm:px-12">
        <h3
          key={`name-${activeIndex}`}
          className="animate-fadeIn col-span-2 line-clamp-2 text-base font-semibold text-white sm:text-xl md:text-2xl lg:text-3xl"
        >
          {images[activeIndex]?.name}
        </h3>
        <p
          key={`price-${activeIndex}`}
          className="animate-fadeIn text-xl font-bold text-white md:text-2xl"
        >
          Rs. {images[activeIndex]?.price.toLocaleString()}
        </p>
        <button
          type="button"
          onClick={() => {
            window.location.href = images[activeIndex]?.link;
          }}
          className="inline-flex cursor-pointer items-center justify-end text-xl font-semibold text-nowrap text-white opacity-80 duration-300 hover:opacity-100 active:opacity-100 md:text-2xl"
        >
          View Product
          <CaretRightIcon weight="bold" />
        </button>
      </div>
    </section>
  );
};

export default CarousalSection;
