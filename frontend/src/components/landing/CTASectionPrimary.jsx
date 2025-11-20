const CTASectionPrimary = () => {
  return (
    <section
      id="cta-primary"
      className="flex h-[calc(50vh-32px)] items-center bg-white py-16 md:h-auto md:py-20 lg:py-16 dark:bg-black"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 text-center">
        {/* Quote */}
        <h2 className="text-black-700 dark:text-black-300 mb-8 text-3xl font-normal md:text-4xl lg:text-5xl">
          Don't wear to{" "}
          <span className="font-bold text-black dark:text-white">impress</span>.{" "}
          <br />
          Wear to{" "}
          <span className="font-bold text-black dark:text-white">express</span>.
        </h2>

        {/* Shop Now Button */}
        <div className="group relative w-fit hover:-translate-y-1 active:-translate-y-1">
          <button
            type="button"
            onClick={() => (window.location.href = "/products")}
            className="relative z-10 inline-block cursor-pointer px-8 py-3 text-base font-semibold text-white hover:shadow-[0px_6px_0px_-2px_rgba(0,0,0,0.2)] active:shadow-[0px_6px_0px_-2px_rgba(0,0,0,0.2)] md:px-10 md:py-4 md:text-lg dark:text-black dark:hover:shadow-[0px_6px_0px_-2px_rgba(255,255,255,0.3)] dark:active:shadow-[0px_6px_0px_-2px_rgba(255,255,255,0.3)]"
          >
            Shop Now
          </button>
          <div className="absolute top-0 left-0 z-0 h-full w-0 bg-red-500 transition-all duration-300 group-hover:w-full group-active:w-full" />
          <div className="absolute top-0 right-0 z-0 h-full w-full bg-black transition-all duration-300 group-hover:w-0 group-active:w-0 dark:bg-white" />
        </div>
      </div>
    </section>
  );
};

export default CTASectionPrimary;
