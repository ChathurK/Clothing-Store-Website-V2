const Footer_Bottom = () => {
  return (
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
  );
};

export default Footer_Bottom;
