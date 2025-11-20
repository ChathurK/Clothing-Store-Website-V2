const CTASectionSecondary = () => {
  return (
    <section
      id="cta-secondary"
      className="relative flex min-h-[60vh] items-center overflow-hidden bg-white py-16 md:min-h-[70vh] md:py-20 lg:py-24 dark:bg-black"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet={`${import.meta.env.BASE_URL}modern_clothing_store.avif`} type="image/avif" />
          <source srcSet={`${import.meta.env.BASE_URL}modern_clothing_store.webp`} type="image/webp" />
          <img
            src={`${import.meta.env.BASE_URL}modern_clothing_store.jpg`}
            alt="Modern Clothing Store"
            className="h-full w-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center">
        {/* Quote */}
        <h2 className="mb-8 text-2xl text-white md:text-3xl lg:text-4xl">
          <span className="font-semibold">
            With each stitch we weave unseen stories of the society into
            clothes.
          </span>{" "}
          <span className="text-black-200 dark:text-black-300 font-normal">
            We are the{" "}
            <span className="font-extralight italic">voice of the society</span>{" "}
            that speaks about the hidden struggles and challenges
          </span>
        </h2>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          {/* Shop Now Button */}
          <div className="group relative w-fit hover:-translate-y-1 active:-translate-y-1">
            <button
              type="button"
              onClick={() => {
                window.location.href = "/products";
              }}
              className="relative z-10 inline-block cursor-pointer px-8 py-3 text-base font-semibold text-white hover:shadow-[0px_6px_0px_-2px_rgba(0,0,0,0.2)] active:shadow-[0px_6px_0px_-2px_rgba(0,0,0,0.2)] md:px-10 md:py-4 md:text-lg dark:text-black dark:hover:shadow-[0px_6px_0px_-2px_rgba(255,255,255,0.3)] dark:active:shadow-[0px_6px_0px_-2px_rgba(255,255,255,0.3)]"
            >
              Shop Now
            </button>
            <div className="absolute top-0 left-0 z-0 h-full w-0 bg-red-500 transition-all duration-300 group-hover:w-full group-active:w-full" />
            <div className="absolute top-0 right-0 z-0 h-full w-full bg-black transition-all duration-300 group-hover:w-0 group-active:w-0 dark:bg-white" />
          </div>

          {/* Create an Account Button */}
          <div className="group relative w-fit hover:-translate-y-1 active:-translate-y-1">
            <button
              type="button"
              onClick={() => {
                window.location.href = "/signup";
              }}
              className="relative z-10 inline-block cursor-pointer px-8 py-3 text-base font-semibold text-white hover:text-black hover:shadow-[0px_6px_0px_-2px_rgba(0,0,0,0.2)] active:text-black active:shadow-[0px_6px_0px_-2px_rgba(0,0,0,0.2)] md:px-10 md:py-4 md:text-lg dark:text-black dark:hover:text-white dark:hover:shadow-[0px_6px_0px_-2px_rgba(255,255,255,0.3)] dark:active:text-white dark:active:shadow-[0px_6px_0px_-2px_rgba(255,255,255,0.3)]"
            >
              Create an Account
            </button>
            <div className="absolute top-0 left-0 z-0 h-full w-0 bg-white transition-all duration-300 group-hover:w-full group-active:w-full dark:bg-black" />
            <div className="absolute top-0 right-0 z-0 h-full w-full bg-black transition-all duration-300 group-hover:w-0 group-active:w-0 dark:bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASectionSecondary;
