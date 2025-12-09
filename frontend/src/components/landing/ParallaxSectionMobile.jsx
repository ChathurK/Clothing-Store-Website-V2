import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const ParallaxSectionMobile = () => {
  return (
    <div className="relative flex h-fit w-full flex-col gap-y-2">
      {[...Array(20)].map((_, index) => (
        <ParallaxImage
          key={index}
          src={`https://picsum.photos/640/360?random=${index}`}
          leftOrigin={true}
        />
      ))}
    </div>
  );
};

export default ParallaxSectionMobile;

const ParallaxImage = ({ src, leftOrigin }) => {
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["60%", "100%", "60%"],
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 0.8, 1, 1, 0.8, 0],
  );

  // const rotateRight = useTransform(
  //   scrollYProgress,
  //   [0, 0.5, 1],
  //   ["-10deg", "0deg", "10deg"],
  // );

  // const rotateLeft = useTransform(
  //   scrollYProgress,
  //   [0, 0.5, 1],
  //   ["10deg", "0deg", "-10deg"],
  // );

  // const rotate = leftOrigin ? rotateLeft : rotateRight;

  // const x = useTransform(
  //   scrollYProgress,
  //   [0, 0.5, 1],
  //   leftOrigin ? ["-10%", "0%", "-10%"] : ["10%", "0%", "10%"],
  // );

  return (
    <motion.img
      ref={imageRef}
      style={{
        // x: x,
        scale: scaleX,
        opacity: opacity,
        // originX: 0,
        // rotate: rotate,
      }}
      src={src}
      className="aspect-video h-fit w-full"
    />
  );
};
