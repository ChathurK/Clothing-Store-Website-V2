import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, EffectCreative, Navigation, Pagination } from "swiper/modules";
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
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handleThumbnailClick = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <section id="carousel">
      <div id="carousal-new" className="relative flex flex-col bg-black">
        {/* Carousal Area */}
        <div className="relative flex h-[50vh] overflow-hidden md:h-[75vh] lg:h-screen">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={activeIndex}
              className="absolute inset-0 right-0 h-full w-full overflow-hidden"
              initial={{ width: 0, zIndex: 20, right: 0, left: "auto" }}
              animate={{ width: "100%", zIndex: 20, right: 0, left: "auto" }}
              exit={{
                zIndex: 10,
                opacity: 100,
                transition: { duration: 1.2, delay: 0.2 },
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              <div className="absolute top-0 left-0 h-full w-screen">
                <picture>
                  <source
                    srcSet={images[activeIndex].srcAvif}
                    type="image/avif"
                  />
                  <source
                    srcSet={images[activeIndex].srcWebp}
                    type="image/webp"
                  />
                  <img
                    src={images[activeIndex].srcJpg}
                    alt={images[activeIndex].name}
                    className="h-full w-full object-cover brightness-[0.85]"
                  />
                </picture>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Text Content Overlay */}
          <div className="absolute inset-0 z-30 flex items-end bg-linear-to-t from-black/80 via-transparent to-transparent px-4 pb-4 lg:px-6 lg:pb-6">
            <div className="max-w-3xl overflow-hidden">
              <motion.div
                key={`text-${activeIndex}`}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { delayChildren: 0.5 },
                  },
                }}
              >
                <motion.h3
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.8, ease: "easeOut" },
                    },
                  }}
                  className="mb-2 line-clamp-2 text-2xl font-bold text-white md:text-3xl lg:text-4xl lg:leading-tight"
                >
                  {images[activeIndex].name}
                </motion.h3>
                <motion.p
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.8, ease: "easeOut" },
                    },
                  }}
                  className="mb-6 text-xl font-medium text-gray-200 lg:text-2xl"
                >
                  Rs. {images[activeIndex].price.toLocaleString()}
                </motion.p>
                <motion.button
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, ease: "easeOut" },
                    },
                  }}
                  onClick={() =>
                    (window.location.href = images[activeIndex].link)
                  }
                  className="group transition-color flex items-center gap-2 pb-1 text-lg font-semibold text-white duration-300 hover:text-gray-300 active:text-gray-300"
                >
                  View Product{" "}
                  <CaretRightIcon
                    weight="bold"
                    className="transition-transform group-hover:translate-x-1 active:translate-x-1"
                  />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
        {/* Thumbnail Navigation */}
        <div className="scrollbar-hidden relative z-40 flex h-20 w-full shrink-0 gap-1 overflow-x-auto bg-black p-1 md:h-24">
          {images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => handleThumbnailClick(index)}
              className={`relative h-full min-w-[100px] flex-1 cursor-pointer overflow-hidden ${activeIndex === index ? "z-10 opacity-100 ring ring-white" : "opacity-40 grayscale transition-opacity hover:opacity-75"}`}
            >
              <picture>
                <source srcSet={img.srcAvif} type="image/avif" />
                <source srcSet={img.srcWebp} type="image/webp" />
                <img
                  src={img.srcJpg}
                  alt={img.name}
                  className="h-full w-full object-cover"
                />
              </picture>
              {/* Progress bar for active item */}
              {activeIndex === index && (
                <motion.div
                  layoutId="active-bar"
                  className="absolute bottom-0 left-0 h-1 bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Swiper Carousal */}
      <div id="carousel-swiper" className="relative">
        <Swiper
          spaceBetween={5}
          slidesPerView={1}
          grabCursor={false}
          navigation={true}
          speed={1000}
          loop={true}
          onActiveIndexChange={(e) => setActiveIndex(e.realIndex)}
          // effect={"creative"}
          // creativeEffect={{
          //   prev: {
          //     shadow: true,
          //     translate: [0, 0, 0],
          //   },
          //   next: {
          //     translate: ["100%", 0, 0],
          //   },
          // }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            // pauseOnMouseEnter: true,
          }}
          // pagination={{
          //   clickable: true,
          //   dynamicBullets: true,
          // }}
          modules={[Autoplay, Navigation, Pagination, EffectCreative]}
          className="continuous-swiper h-[50vh] w-full md:h-[75vh] xl:h-screen dark:bg-black"
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
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
        {/* Text Content Overlay */}
        <div className="pointer-events-none absolute bottom-0 z-10 grid h-1/3 w-full grid-cols-2 items-center bg-linear-to-t from-black/80 to-transparent px-14 pb-2 max-sm:px-12">
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                window.location.href = images[activeIndex]?.link;
              }}
              className="group pointer-events-auto inline-flex w-fit cursor-pointer items-center justify-end text-xl font-semibold text-nowrap text-white duration-300 hover:text-gray-300 active:text-gray-300 md:text-2xl"
            >
              View Product
              <CaretRightIcon
                className="transition-transform group-hover:translate-x-1 active:translate-x-1"
                weight="bold"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarousalSection;
