import { useState } from "react";
import {
  YoutubeLogoIcon,
  InstagramLogoIcon,
  FacebookLogoIcon,
  TiktokLogoIcon,
  PaperPlaneRightIcon,
} from "@phosphor-icons/react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe email:", email);
    setEmail("");
  };

  const socialLinks = [
    { icon: YoutubeLogoIcon, url: "https://youtube.com", label: "YouTube" },
    {
      icon: InstagramLogoIcon,
      url: "https://instagram.com",
      label: "Instagram",
    },
    { icon: FacebookLogoIcon, url: "https://facebook.com", label: "Facebook" },
    { icon: TiktokLogoIcon, url: "https://tiktok.com", label: "TikTok" },
  ];

  return (
    <footer className="bg-black-50 dark:bg-black">
      {/* Newsletter Section */}
      <div className="border-black-200 dark:border-black-800 border-t py-10 md:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-special mb-3 text-[28px] font-bold text-black sm:text-3xl md:text-4xl dark:text-white">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-black-600 dark:text-black-400 mb-8 max-w-2xl font-serif text-base md:text-lg">
              Stay updated with our latest collections, exclusive offers, and
              fashion insights delivered straight to your inbox.
            </p>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="border-black-300 placeholder-black-500 dark:border-black-700 dark:placeholder-black-500 flex-1 border bg-transparent px-4 py-3 font-serif text-black transition-colors outline-none focus:border-black dark:text-white dark:focus:border-white"
              >
                
              </input>
              <button
                type="submit"
                className="group relative flex items-center justify-center gap-2 overflow-hidden bg-black px-6 py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-[0px_6px_0px_-2px_rgba(0,0,0,0.2)] active:-translate-y-1 active:shadow-[0px_6px_0px_-2px_rgba(0,0,0,0.2)] dark:bg-white dark:text-black dark:hover:shadow-[0px_6px_0px_-2px_rgba(255,255,255,0.3)] dark:active:shadow-[0px_6px_0px_-2px_rgba(255,255,255,0.3)]"
              >
                Subscribe Now
                <PaperPlaneRightIcon size={20} weight="bold" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section - Links and Copyright */}
      <div className="border-black-200 dark:border-black-800 border-t py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <nav className="flex items-center justify-center gap-4 md:justify-start md:gap-6">
              <a
                href="/contact-us"
                className="text-black-600 dark:text-black-400 text-center font-serif text-sm transition-colors hover:text-black active:text-black dark:hover:text-white dark:active:text-white"
              >
                Contact Us
              </a>
              <span className="text-black-400 dark:text-black-600">|</span>
              <a
                href="/privacy-policy"
                className="text-black-600 dark:text-black-400 text-center font-serif text-sm transition-colors hover:text-black active:text-black dark:hover:text-white dark:active:text-white"
              >
                Privacy & Purchase Policy
              </a>
              <span className="text-black-400 dark:text-black-600">|</span>
              <a
                href="/terms-of-use"
                className="text-black-600 dark:text-black-400 text-center font-serif text-sm transition-colors hover:text-black active:text-black dark:hover:text-white dark:active:text-white"
              >
                Terms of Use
              </a>
            </nav>

            <p className="text-black-500 dark:text-black-500 text-center font-serif text-sm md:text-right">
              © 2025 Integral Clothing. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
