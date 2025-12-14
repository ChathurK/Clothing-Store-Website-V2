import { PaperPlaneRightIcon } from "@phosphor-icons/react";
import { useState } from "react";

const Footer_Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe email:", email);
    setEmail("");
  };

  return (
    <div className="border-black-200 dark:border-black-800 border-t py-10 md:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-special mb-3 text-[28px] font-bold text-black sm:text-3xl md:text-4xl dark:text-white">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-black-600 dark:text-black-400 mb-8 max-w-2xl font-serif text-base text-balance md:text-lg">
            Stay updated with our latest collections, exclusive offers, and
            fashion insights delivered straight to your inbox.
          </p>

          {/* Newsletter Form */}
          <form
            onSubmit={handleSubscribe}
            className="relative flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
              className="border-black-300 placeholder-black-500 dark:border-black-700 dark:bg-black-300/20 w-full border py-3 pr-36 pl-4 font-serif text-black transition-colors outline-none focus:border-black sm:h-12 sm:placeholder:text-sm dark:text-white dark:focus:border-white"
            />
            <button
              type="submit"
              className="dark:border-black-700 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden border bg-black px-4 py-3 font-serif font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black active:bg-transparent active:text-black sm:absolute sm:top-1/2 sm:right-2 sm:w-fit sm:-translate-y-1/2 sm:px-3 sm:py-2 sm:text-xs sm:hover:bg-transparent dark:text-white dark:hover:border-white dark:hover:text-white dark:active:border-white dark:active:text-white sm:dark:hover:bg-black"
            >
              Subscribe Now
              <PaperPlaneRightIcon weight="bold" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer_Newsletter;
