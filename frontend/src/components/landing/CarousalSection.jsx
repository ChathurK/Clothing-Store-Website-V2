import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { CaretRightIcon } from "@phosphor-icons/react";

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
import { useNavigate } from "react-router-dom";

const images = [
  {
    id: 1,
    name: "Navy Blue Slim-Fit Business Suit for Men with Burgundy Tie",
    price: 8500,
    srcAvif: cloth1Avif,
    srcWebp: cloth1Webp,
    srcJpg: cloth1Jpg,
    link: `${import.meta.env.BASE_URL}/items/1`,
  },
  {
    id: 2,
    name: "Black Floral Print Two-Piece Summer Skirt Set (Crop Top and Maxi Skirt)",
    price: 4500,
    srcAvif: cloth2Avif,
    srcWebp: cloth2Webp,
    srcJpg: cloth2Jpg,
    link: `${import.meta.env.BASE_URL}/items/2`,
  },
  {
    id: 3,
    name: "Azure Blue Tailored Blazer and Abstract Print Button-Up Shirt",
    price: 6500,
    srcAvif: cloth3Avif,
    srcWebp: cloth3Webp,
    srcJpg: cloth3Jpg,
    link: `${import.meta.env.BASE_URL}/items/3`,
  },
  {
    id: 4,
    name: "Striped Blue and White Denim Overalls/Jumpsuit for Women",
    price: 3800,
    srcAvif: cloth4Avif,
    srcWebp: cloth4Webp,
    srcJpg: cloth4Jpg,
    link: `${import.meta.env.BASE_URL}/items/4`,
  },
  {
    id: 5,
    name: "Dark Navy Suit with Micro-Patterned Dress Shirt",
    price: 7800,
    srcAvif: cloth5Avif,
    srcWebp: cloth5Webp,
    srcJpg: cloth5Jpg,
    link: `${import.meta.env.BASE_URL}/items/5`,
  },
  {
    id: 6,
    name: "Bold Red Tailored Women's Pantsuit / Business Set",
    price: 5500,
    srcAvif: cloth6Avif,
    srcWebp: cloth6Webp,
    srcJpg: cloth6Jpg,
    link: `${import.meta.env.BASE_URL}/items/6`,
  },
  {
    id: 7,
    name: "Luxury Red Velvet Tuxedo Jacket with Black Contrast Lapel",
    price: 12000,
    srcAvif: cloth7Avif,
    srcWebp: cloth7Webp,
    srcJpg: cloth7Jpg,
    link: `${import.meta.env.BASE_URL}/items/7`,
  },
];

const CarousalSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  // console.count("Render");

  return (
    <section id="carousel">
      {/* Swiper Carousal */}
      <div id="carousel-swiper" className="relative">
        <Swiper
          spaceBetween={5}
          slidesPerView={1}
          navigation
          speed={1000}
          loop={true}
          onActiveIndexChange={(e) => setActiveIndex(e.realIndex)}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          // onSlideChange={() => console.log("slide change")}
          modules={[Autoplay, Navigation, Pagination]}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <picture>
                <source srcSet={image.srcAvif} type="image/avif" />
                <source srcSet={image.srcWebp} type="image/webp" />
                <img
                  className="h-[50vh] min-h-[50vh] w-full object-cover sm:h-[75vh] sm:min-h-[75vh] md:h-screen md:min-h-screen"
                  src={image.srcJpg}
                  alt={image.name}
                />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Info Overlay */}
        <div
          className="pointer-events-none absolute bottom-0 z-10 flex w-full flex-col bg-linear-to-t from-black/70 to-transparent px-4 py-8 md:px-16 md:py-10"
          id="carousel-info"
        >
          <AnimatePresence mode="wait">
            <motion.h3
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-1 line-clamp-2 font-serif text-base font-semibold text-white sm:text-xl md:mb-4 md:text-2xl lg:text-3xl"
            >
              {images[activeIndex]?.name}
            </motion.h3>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:justify-between"
            >
              <p className="mb-2 font-serif text-xl font-bold text-white md:mb-0 md:text-2xl">
                Rs. {images[activeIndex]?.price.toLocaleString()}
              </p>
              <button
                type="button"
                onClick={() => navigate(`/items/${images[activeIndex]?.id}`)}
                className="group pointer-events-auto inline-flex w-fit cursor-pointer items-center justify-end font-normal text-nowrap text-white duration-300 hover:text-gray-300 hover:underline active:text-gray-300 active:underline md:text-xl"
              >
                View Product
                <CaretRightIcon
                  className="transition-transform group-hover:translate-x-1 group-active:translate-x-1"
                  weight="bold"
                />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CarousalSection;
