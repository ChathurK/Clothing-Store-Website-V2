const CTASectionSecondary = () => {
  return (
    <section
      id="cta-secondary"
      className="relative flex min-h-[60vh] items-center overflow-hidden bg-black py-16 md:min-h-[70vh] md:py-20 lg:py-24 dark:bg-[#0d0d0d]"
    >
      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 md:text-center">
        {/* Quote */}
        <h2 className="mb-8 text-2xl text-balance text-white md:text-3xl lg:text-4xl">
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
          <div className="group relative w-fit">
            <button
              type="button"
              onClick={() => {
                window.location.href = "/products";
              }}
              className="relative z-10 cursor-pointer px-8 py-3 text-base font-semibold text-black inset-ring inset-ring-white hover:text-white active:text-white md:px-10 md:py-4 md:text-lg dark:inset-ring-white"
            >
              Shop Now
            </button>
            <div className="absolute top-0 left-0 z-0 h-full w-0 bg-black transition-all duration-300 group-hover:w-full group-active:w-full" />
            <div className="absolute top-0 right-0 z-0 h-full w-full bg-white transition-all duration-300 group-hover:w-0 group-active:w-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASectionSecondary;
