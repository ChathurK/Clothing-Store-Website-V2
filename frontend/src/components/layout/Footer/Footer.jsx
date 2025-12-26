import Footer_Bottom from "./Footer_Bottom";
import Footer_Newsletter from "./Footer_Newsletter";

const Footer = () => {
  return (
    <footer className="bg-black-50 dark:bg-black min-h-[50vh]">
      <Footer_Newsletter />
      <Footer_Bottom />
    </footer>
  );
};

export default Footer;
