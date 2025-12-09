import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";

const ParallaxSection = () => {
  return (
    <section
      id="parallax"
      className="flex flex-col gap-y-16 py-16 sm:gap-y-20 md:py-20"
    >
      {[...Array(7)].map((_, index) => (
        <ParallaxComponent
          image1Src={`https://picsum.photos/1920/1080?random=${index}`}
          image2Src={`https://picsum.photos/1920/1080?random=${index}.1`}
          leftLarge={index % 2 === 0}
        />
      ))}
    </section>
  );
};

export default ParallaxSection;

const ParallaxComponent = ({
  image1Src,
  image1Alt,
  image2Src,
  image2Alt,
  leftLarge,
}) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yPosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 0.8, 1, 1, 0.8, 0],
  );

  return (
    <motion.div ref={containerRef} className="relative flex h-fit w-full gap-2">
      {leftLarge ? (
        <>
          <div className="flex-2">
            <ParallaxImage
              src={image1Src}
              alt={image1Alt}
              className="aspect-video w-full object-cover"
              opacity={opacity}
            />
          </div>
          <div className="flex aspect-video h-fit flex-1">
            <ParallaxImage
              src={image2Src}
              alt={image2Alt}
              className="w-full object-cover"
              yPosition={yPosition}
              opacity={opacity}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex aspect-video h-fit flex-1">
            <ParallaxImage
              src={image2Src}
              alt={image2Alt}
              className="w-full object-cover"
              yPosition={yPosition}
              opacity={opacity}
            />
          </div>
          <div className="flex-2">
            <ParallaxImage
              src={image1Src}
              alt={image1Alt}
              className="aspect-video w-full object-cover"
              opacity={opacity}
            />
          </div>
        </>
      )}
    </motion.div>
  );
};

const ParallaxImage = ({ src, alt, className, yPosition, opacity }) => {
  return (
    <motion.img
      style={{ y: yPosition, opacity: opacity }}
      src={src}
      alt={alt}
      className={className}
    />
  );
};
