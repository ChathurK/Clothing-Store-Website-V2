import { useNavigate } from "react-router-dom";

const CTASectionPrimary = () => {
  const navigate = useNavigate();
  
  return (
    <section
      id="cta-primary"
      className="flex h-[calc(50vh-32px)] items-center bg-white py-16 sm:h-[25vh] md:py-20 lg:h-auto xl:h-[268px] lg:py-16 dark:bg-black"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 md:text-center">
        {/* Quote */}
        <h2 className="text-black-700 dark:text-black-300 mb-8 text-3xl font-normal text-balance md:text-4xl lg:text-5xl">
          Don't wear to{" "}
          <span className="font-bold text-black dark:text-white">impress</span>.{" "}
          Wear to{" "}
          <span className="font-bold text-black dark:text-white">express</span>.
        </h2>

        {/* Shop Now Button */}
        <div className="group relative w-fit">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="relative z-10 inline-block cursor-pointer px-8 py-3 text-base font-semibold text-white inset-ring inset-ring-black hover:text-black active:text-black md:px-10 md:py-4 md:text-lg dark:text-black dark:inset-ring-white dark:hover:text-white dark:active:text-white"
          >
            Shop Now
          </button>
          <div className="absolute top-0 left-0 z-0 h-full w-0 bg-white transition-all duration-300 group-hover:w-full group-active:w-full dark:bg-black" />
          <div className="absolute top-0 right-0 z-0 h-full w-full bg-black transition-all duration-300 group-hover:w-0 group-active:w-0 dark:bg-white" />
        </div>
      </div>
    </section>
  );
};

export default CTASectionPrimary;
