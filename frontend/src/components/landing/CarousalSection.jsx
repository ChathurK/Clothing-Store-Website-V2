import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { FreeMode, Autoplay } from "swiper/modules";

const cloth1 = `${import.meta.env.BASE_URL}clothing/black_themed_clothing_1.png`;
const cloth2 = `${import.meta.env.BASE_URL}clothing/black_themed_clothing_2.png`;
const cloth3 = `${import.meta.env.BASE_URL}clothing/black_themed_clothing_3.png`;
const cloth5 = `${import.meta.env.BASE_URL}clothing/black_themed_clothing_5.png`;
const cloth6 = `${import.meta.env.BASE_URL}clothing/black_themed_clothing_6.png`;
const cloth7 = `${import.meta.env.BASE_URL}clothing/black_themed_clothing_7.png`;
const cloth8 = `${import.meta.env.BASE_URL}clothing/black_themed_clothing_8.png`;
const cloth9 = `${import.meta.env.BASE_URL}clothing/black_themed_clothing_9.png`;
const cloth10 = `${import.meta.env.BASE_URL}clothing/black_themed_clothing_10.png`;
const cloth11 = `${import.meta.env.BASE_URL}clothing/black_themed_clothing_11.png`;
const cloth12 = `${import.meta.env.BASE_URL}clothing/black_themed_clothing_12.png`;
const cloth13 = `${import.meta.env.BASE_URL}clothing/black_themed_clothing_13.png`;

const images = [
  cloth1,
  cloth11,
  cloth2,
  cloth10,
  cloth3,
  cloth5,
  cloth6,
  cloth8,
  cloth7,
  cloth9,
  cloth12,
  cloth13,
  cloth1,
  cloth11,
  cloth2,
  cloth10,
  cloth3,
  cloth5,
  cloth6,
  cloth8,
  cloth7,
  cloth9,
  cloth12,
  cloth13,
];

const CarousalSection = () => {
  return (
    <section id="carousal">
      {/* <div className="group scrollbar-hidden flex h-[40vh] w-full overflow-x-hidden sm:h-[50vh] lg:h-[60vh]">
        <div className="animate-carousal flex h-full shrink-0 grow-0 gap-0.5 pr-0.5">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={"Clothing" + (index + 1)}
              className="h-full w-auto object-cover"
            />
          ))}
        </div>
        <div className="aria-hidden animate-carousal flex h-full shrink-0 grow-0 gap-0.5 pr-0.5">
          {images.map((src, index) => (
            <img
              key={"duplicate" + index}
              src={src}
              alt={"Clothing" + (index + 1)}
              className="h-full w-auto object-cover"
            />
          ))}
        </div>
      </div> */}

      <Swiper
        slidesPerView={"auto"}
        // slidesPerGroup={2}
        spaceBetween={2}
        speed={3000}
        loop={true}
        loopedSlides={images.length}
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        allowTouchMove={true}
        modules={[Autoplay, FreeMode]}
        className="continuous-swiper h-[40vh] w-full sm:h-[50vh] lg:h-[60vh]"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} style={{ width: "auto" }}>
            <img
              className="h-full w-auto object-cover"
              src={src}
              alt={`Clothing ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CarousalSection;
