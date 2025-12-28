import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

const HeroSection = () => {
  const [showLogo, setShowLogo] = useState(true);

  // Video url
  // const videoUrl = `${import.meta.env.BASE_URL}/videos/Alaska.mp4`;

  const handleLogoToggle = () => {
    setShowLogo(!showLogo);
  };

  return (
    <section
      id="hero"
      className="relative h-[calc(50vh-32px)] w-full overflow-hidden bg-black sm:h-[calc(75vh-48px)] xl:h-[calc(100vh-48px)]"
    >
      {/* <video className="size-full" muted autoPlay loop preload="auto">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support this video format.
      </video> */}
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/CHSnz0bCaUk?si=umyR-0NFtTexnxSZ&amp;controls=0&amp;autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=CHSnz0bCaUk"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      {/* Logo Overlay */}
      {showLogo && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/25 dark:bg-black/25">
          <picture>
            <source
              srcSet={`${import.meta.env.BASE_URL}/logo_black.avif`}
              type="image/avif"
            />
            <source
              srcSet={`${import.meta.env.BASE_URL}/logo_black.webp`}
              type="image/webp"
            />
            <img
              src={`${import.meta.env.BASE_URL}/logo_black.png`}
              alt="Brand Logo"
              className="h-auto w-full"
            />
          </picture>
        </div>
      )}

      {/* Top Right: Show/Hide Logo Button */}
      <button
        onClick={handleLogoToggle}
        className="dark:hover:bg-black-800 text-black-700 dark:text-black-300 dark:active:bg-black-800 absolute top-1/6 right-4 z-20 cursor-pointer bg-white/50 p-3.5 opacity-30 transition-all duration-300 hover:bg-white/70 hover:opacity-70 active:bg-white/70 active:opacity-70 dark:bg-black/50"
        aria-label={showLogo ? "Hide Logo" : "Show Logo"}
        title={showLogo ? "Hide Logo" : "Show Logo"}
      >
        {showLogo ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
      </button>
    </section>
  );
};

export default HeroSection;
