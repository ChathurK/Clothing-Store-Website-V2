import { useNavigate } from "react-router-dom";

const CTASectionSecondary = () => {
  const navigate = useNavigate();

  return (
    <section
      id="cta-secondary"
      className="flex h-[50vh] min-h-[50vh] items-center bg-black py-16 sm:h-auto md:py-20 lg:py-16 dark:bg-[#0d0d0d]"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 md:items-center">
        {/* Quote */}
        <h2 className="mb-8 text-2xl text-balance text-white md:text-center md:text-3xl lg:text-4xl">
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

        {/* Shop Now Button */}
        <div className="group relative w-fit">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="relative z-10 cursor-pointer px-8 py-3 text-base font-semibold text-black inset-ring inset-ring-white transition-colors duration-300 hover:text-white active:text-white md:px-10 md:py-4 md:text-lg dark:inset-ring-white"
          >
            Shop Now
          </button>
          <div className="absolute top-0 left-0 z-0 h-full w-0 bg-black transition-all duration-300 group-hover:w-full group-active:w-full" />
          <div className="absolute top-0 right-0 z-0 h-full w-full bg-white transition-all duration-300 group-hover:w-0 group-active:w-0" />
        </div>
      </div>
    </section>
  );
};

export default CTASectionSecondary;
