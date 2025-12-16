/* eslint-disable no-unreachable */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  ShareFatIcon,
  CaretDownIcon,
} from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import ProductsHeader from "../components/products/ProductsHeader";
import SizeGuide from "../components/products/SizeGuide";

const itemImages = [
  {
    id: 1,
    path: `${import.meta.env.BASE_URL}/products/wearables/shoe_inner.png`,
  },
  {
    id: 2,
    path: `${import.meta.env.BASE_URL}/products/wearables/shoe_outer.png`,
  },
  {
    id: 3,
    path: `${import.meta.env.BASE_URL}/products/wearables/shoe_under.png`,
  },
];

const relatedItems = [
  {
    id: 1,
    path: `${import.meta.env.BASE_URL}/products/related/image_1.png`,
    title: "Classic Leather Jacket",
    price: 12500,
  },
  {
    id: 2,
    path: `${import.meta.env.BASE_URL}/products/related/image_2.png`,
    title: "Denim Jeans",
    price: 8500,
  },
  {
    id: 3,
    path: `${import.meta.env.BASE_URL}/products/related/image_3.png`,
    title: "Cotton T-Shirt",
    price: 3500,
  },
  {
    id: 4,
    path: `${import.meta.env.BASE_URL}/products/related/image_4.png`,
    title: "Running Shoes",
    price: 11000,
  },
  {
    id: 5,
    path: `${import.meta.env.BASE_URL}/products/related/image_5.png`,
    title: "Sports Cap",
    price: 2500,
  },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const productCareInstructions = [
  "Machine wash cold with like colors",
  "Do not bleach",
  "Tumble dry low",
  "Iron on low heat if needed",
  "Do not dry clean",
];

const Items = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sizeGuideVisible, setSizeGuideVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        document.title = `${data.title} - Integral`;
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleShare = () => {
    const shareData = {
      title: product.title,
      text: product.description,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Product shared successfully"))
        .catch((error) => console.error("Error sharing product:", error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      navigator.clipboard.writeText(shareData.url).then(
        () => {
          alert("Product URL copied to clipboard");
        },
        (err) => {
          console.error("Could not copy text: ", err);
        },
      );
    }
  };

  const handleSizeGuideClick = () => {
    setSizeGuideVisible(true);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-950">
        <div className="text-center">
          <div className="mb-4 inline-block size-12 animate-spin rounded-full border-4 border-gray-300 border-t-black dark:border-zinc-700 dark:border-t-white"></div>
          <p className="text-gray-600 dark:text-zinc-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-950">
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold text-black dark:text-white">
            Product not found
          </p>
          <button
            onClick={() => navigate("/products")}
            className="a cursor-pointer bg-black px-6 py-2 font-medium text-white transition-colors active:ring-1 active:ring-black dark:bg-white dark:text-black dark:active:ring-white"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <ProductsHeader />
      <div className="h-16 sm:h-12"></div>

      {/* Back Button & Share Button */}
      <div className="flex justify-between px-4 pt-4 lg:p-8">
        <button
          onClick={() => navigate("/products")}
          className="flex items-center border border-gray-300 p-2 font-medium text-gray-600 transition-colors hover:bg-black hover:text-white active:border-black dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-white dark:hover:text-black dark:active:border-white"
        >
          <ArrowLeftIcon size={20} />
        </button>

        <button
          onClick={handleShare}
          className="flex items-center border border-gray-300 p-2 font-medium text-gray-600 transition-colors hover:bg-black hover:text-white active:border-black dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-white dark:hover:text-black dark:active:border-white"
        >
          <ShareFatIcon size={20} />
        </button>
      </div>

      {/* Product Details */}
      <div className="mx-auto max-w-6xl p-4 lg:p-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Image Section - Desktop */}
          <div className="hidden h-fit border-gray-300 bg-white md:block dark:border-zinc-700 dark:bg-zinc-900">
            {itemImages.map((img) => (
              <img
                key={img.id}
                src={img.path}
                alt={product.title}
                className="mx-auto size-full max-h-[400px] border border-gray-300 object-contain dark:border-zinc-700"
              />
            ))}
          </div>

          {/* Image Section - Mobile with Swiper */}
          <div className="block md:hidden">
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={0}
              slidesPerView={1}
              className="border border-gray-300 bg-white dark:border-zinc-700 dark:bg-zinc-900"
            >
              {itemImages.map((img) => (
                <SwiperSlide key={img.id}>
                  <img
                    src={img.path}
                    alt={product.title}
                    className="h-[400px] w-full border-0 object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="">
            {/* Info */}
            <div>
              <h1 className="mb-4 font-serif text-2xl font-bold text-black dark:text-white">
                {product.title.toUpperCase()}
              </h1>
              <p className="mb-2 font-serif text-sm text-gray-600 dark:text-zinc-400">
                {product.category}
              </p>
              <p className="font-serif text-xl font-semibold text-black dark:text-white">
                LKR {Math.ceil(product.price).toLocaleString()}
              </p>
            </div>

            <div className="my-4 border-t border-gray-300"></div>

            {/* Size Selector with Size Guide */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-gray-700 dark:text-zinc-400">
                <label htmlFor="size-select" className="text-sm">
                  Size
                </label>
                <span
                  onClick={handleSizeGuideClick}
                  className="cursor-pointer px-2 py-1 text-sm underline"
                >
                  Size Guide
                </span>
              </div>

              <div className="group relative w-full md:w-auto">
                <select
                  id="size-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full cursor-pointer appearance-none border border-gray-300 bg-white px-4 py-3 pr-10 font-medium text-gray-900 transition-colors hover:border-black focus:border-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-white dark:focus:border-white"
                >
                  <option value="">Select size</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <CaretDownIcon
                  size={20}
                  className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-900 transition-transform duration-300 dark:text-white"
                />
              </div>
            </div>

            <div className="my-4 border-t border-gray-300"></div>

            {/* Add to Cart & Wishlist Buttons */}
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              <div className="group relative w-full">
                <button className="relative z-10 w-full cursor-pointer px-4 py-3 font-medium text-white inset-ring inset-ring-black transition-colors duration-300 group-hover:text-black group-active:text-black focus:outline-none dark:text-black dark:inset-ring-white dark:group-hover:text-white dark:group-active:text-white">
                  Add to Cart
                </button>
                <div className="absolute top-0 left-0 z-0 h-full w-0 bg-white transition-all duration-300 group-hover:w-full group-active:w-full dark:bg-black" />
                <div className="absolute top-0 right-0 z-0 h-full w-full bg-black transition-all duration-300 group-hover:w-0 group-active:w-0 dark:bg-white" />
              </div>
              <button className="w-full cursor-pointer border border-black bg-zinc-400 py-3 font-medium text-black transition-colors duration-300 hover:bg-zinc-300 active:bg-zinc-300 dark:border-zinc-400 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-600 dark:active:bg-zinc-600">
                Add to Wishlist
              </button>
            </div>

            <div className="my-4 border-t border-gray-300"></div>

            <div>
              {/* Product Details */}
              <details className="group cursor-pointer border-gray-300 dark:border-zinc-700">
                <summary className="flex items-center justify-between text-base font-semibold text-gray-700 dark:text-zinc-400 [&::-webkit-details-marker]:hidden">
                  Product Details
                  <CaretDownIcon
                    size={20}
                    className="transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-sm text-gray-600 dark:text-zinc-400">
                  {product.description}
                </p>
              </details>

              <div className="my-4 border-t border-gray-300"></div>

              {/* Product Care Instructions */}
              <details className="group cursor-pointer border-t-0 border-gray-300 dark:border-zinc-700">
                <summary className="text-text-base flex items-center justify-between font-semibold text-gray-700 dark:text-zinc-400 [&::-webkit-details-marker]:hidden">
                  Product Care Instructions
                  <CaretDownIcon
                    size={20}
                    className="transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-zinc-400">
                  {productCareInstructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        </div>

        {/* Related Items */}
        <div className="text-center">
          <h2 className="my-6 font-serif text-2xl font-semibold text-black dark:text-white">
            Related Items
          </h2>
          <Swiper
            modules={[FreeMode]}
            freeMode={true}
            spaceBetween={16}
            slidesPerView="auto"
            className="pb-4"
          >
            {relatedItems.map((item) => (
              <SwiperSlide key={item.id} className="w-auto!">
                <div
                  onClick={() => navigate(`/items/${item.id}`)}
                  className="group cursor-pointer"
                >
                  <img
                    src={item.path}
                    alt={item.title}
                    className="h-[250px] w-auto border border-gray-300 object-contain transition-transform duration-300 group-hover:scale-[98%] dark:border-zinc-700"
                  />
                  <div className="mt-2 text-left">
                    <p className="font-serif text-sm font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="font-serif text-sm text-gray-600 dark:text-zinc-400">
                      LKR {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-t-gray-300 py-6 dark:border-t-zinc-700">
        <p className="text-center text-xs text-gray-500 dark:text-zinc-500">
          © 2025 Integral Clothing. All rights reserved.
        </p>
      </footer>

      {/* Size Guide Modal */}
      {sizeGuideVisible && (
        <SizeGuide
          isOpen={sizeGuideVisible}
          onClose={() => setSizeGuideVisible(false)}
        />
      )}
    </div>
  );
};

export default Items;
