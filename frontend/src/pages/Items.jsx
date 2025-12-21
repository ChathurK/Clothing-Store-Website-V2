import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CaretDownIcon, MagnifyingGlassPlusIcon } from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import ProductsHeader from "../components/products/ProductsHeader";
import SizeGuide from "../components/products/SizeGuide";

// Sample item images for the product
const itemImages = [
  {
    id: 1,
    path: `${import.meta.env.BASE_URL}/products/wearables/shoe_inner.png`,
    title: "Shoe Inner View",
  },
  {
    id: 2,
    path: `${import.meta.env.BASE_URL}/products/wearables/shoe_outer.png`,
    title: "Shoe Outer View",
  },
  {
    id: 3,
    path: `${import.meta.env.BASE_URL}/products/wearables/shoe_under.png`,
    title: "Shoe Under View",
  },
];

const itemImages2 = [
  {
    id: 1,
    path: `${import.meta.env.BASE_URL}/products/men/men_product_1_img_1.webp`,
    title: "Men Product Image 1",
  },
  {
    id: 2,
    path: `${import.meta.env.BASE_URL}/products/men/men_product_1_img_2.webp`,
    title: "Men Product Image 2",
  },
  {
    id: 3,
    path: `${import.meta.env.BASE_URL}/products/men/men_product_1_img_3.webp`,
    title: "Men Product Image 3",
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

  const handleSizeGuidePopup = () => {
    setSizeGuideVisible(true);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();

    // Get current favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    let updatedFavorites;
    if (favorites.includes(product.id)) {
      // Remove from favorites
      updatedFavorites = favorites.filter((id) => id !== product.id);
      // setIsFavorite(false);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, product.id];
      // setIsFavorite(true);
    }

    // Save back to localStorage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // TODO: Add to favorites logic

    // Debug logs
    // console.log(favorites, typeof favorites)
    // const localstorageFavorites = localStorage.getItem("favorites");
    // console.log(localstorageFavorites, typeof localstorageFavorites)
  };

  const handleAddToCartClick = () => {
    return;
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
    <div id="pg-items" className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <ProductsHeader />
      <div className="h-16 sm:h-12"></div>

      {/* Product Details */}
      <div className="grid gap-4 p-4 md:grid-cols-2 md:gap-8 lg:p-8">
        {/* Image Section - Desktop */}
        <div className="700 hidden h-fit bg-white md:block dark:bg-zinc-900">
          {itemImages.map((img) => (
            <img
              key={img.id}
              src={img.path}
              alt={img.title}
              // src={product.image}
              // alt={product.title}
              className="mx-auto size-full max-h-[400px] border border-gray-300 object-contain dark:border-zinc-700"
            />
          ))}
        </div>

        {/* Image Section - Mobile with Swiper */}
        <div className="block overflow-hidden md:hidden">
          <Swiper
            id="items-swiper"
            pagination={{ clickable: true }}
            spaceBetween={0}
            slidesPerView={1}
            modules={[Pagination]}
            className="border border-gray-300 bg-white dark:border-zinc-700 dark:bg-zinc-900"
          >
            {itemImages2.map((img) => (
              <SwiperSlide key={img.id}>
                <img
                  src={img.path}
                  alt={img.title}
                  // src={product.image}
                  // alt={product.title}
                  className="mx-auto size-full max-h-[400px] object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="lg:mx-12 xl:mx-16">
          {/* Info */}
          <div className="flex flex-col space-y-3">
            <h1 className="font-serif text-2xl font-bold text-black dark:text-white">
              {product.title.toUpperCase()}
            </h1>
            <p className="font-serif text-sm text-gray-600 dark:text-zinc-400">
              {product.category}
            </p>
            <p className="font-serif text-2xl font-semibold text-black dark:text-white">
              LKR {Math.ceil(product.price).toLocaleString()}
            </p>
          </div>

          <div className="my-4 border-t border-gray-300"></div>

          {/* Size Selector */}
          <div className="flex flex-col space-y-3">
            <label
              htmlFor="size-select"
              className="text-base font-semibold text-gray-700 dark:text-zinc-400"
            >
              Size
            </label>

            <div className="relative w-full">
              <select
                id="size-select"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="peer w-full cursor-pointer appearance-none border border-gray-300 bg-white px-4 py-3 pr-10 font-normal text-gray-700 transition-colors open:border-black hover:border-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:open:border-white dark:hover:border-white"
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
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-900 transition-transform duration-300 peer-open:rotate-180 dark:text-white"
              />
            </div>
          </div>

          <div className="my-4 border-t border-gray-300"></div>

          {/* Add to Cart & Wishlist Buttons */}
          <div className="flex flex-col justify-between gap-2 md:flex-row">
            <div className="group relative w-full">
              <button
                onClick={handleAddToCartClick}
                className="relative z-10 w-full cursor-pointer px-4 py-3 font-medium text-white inset-ring inset-ring-black transition-colors duration-300 group-hover:text-black group-active:text-black dark:text-black dark:inset-ring-white dark:group-hover:text-white dark:group-active:text-white"
              >
                Add to Cart
              </button>
              <div className="absolute top-0 left-0 z-0 h-full w-0 bg-white transition-all duration-300 group-hover:w-full group-active:w-full dark:bg-black" />
              <div className="absolute top-0 right-0 z-0 h-full w-full bg-black transition-all duration-300 group-hover:w-0 group-active:w-0 dark:bg-white" />
            </div>
            <button
              onClick={handleFavoriteClick}
              className="w-full cursor-pointer border border-black bg-zinc-400 py-3 font-medium text-black transition-colors duration-300 hover:bg-zinc-300 active:bg-zinc-300 dark:border-zinc-400 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-600 dark:active:bg-zinc-600"
            >
              Add to Wishlist
            </button>
          </div>

          <div className="my-4 border-t border-gray-300"></div>

          <>
            {/* Product Details */}
            <details
              name="product-details"
              className="group border-gray-300 dark:border-zinc-700"
            >
              <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-gray-700 dark:text-zinc-400 [&::-webkit-details-marker]:hidden">
                Product Details
                <CaretDownIcon
                  size={20}
                  className="transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 cursor-default text-sm text-balance text-gray-600 dark:text-zinc-400">
                {product.description}
              </p>
            </details>

            <div className="my-4 border-t border-gray-300"></div>

            {/* Size Guide */}
            <details
              name="product-details"
              className="group border-gray-300 dark:border-zinc-700"
            >
              <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-gray-700 dark:text-zinc-400 [&::-webkit-details-marker]:hidden">
                Size Guide
                <CaretDownIcon
                  size={20}
                  className="transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <div className="relative mt-3 h-auto w-full">
                <picture>
                  <source
                    srcSet={`${import.meta.env.BASE_URL}/products/size_chart/Size_Chart_480x480.avif`}
                    type="image/avif"
                  />
                  <img
                    alt="Size Chart"
                    src={`${import.meta.env.BASE_URL}/products/size_chart/Size_Chart_480x480.webp`}
                    className="w-full cursor-default"
                  />
                </picture>
                <button
                  type="button"
                  onClick={handleSizeGuidePopup}
                  className="absolute top-2 right-2 z-10 cursor-pointer p-2 transition-colors duration-300 hover:bg-black hover:text-white active:bg-black active:text-white"
                >
                  <MagnifyingGlassPlusIcon size={20} />
                </button>
              </div>
            </details>

            <div className="my-4 border-t border-gray-300"></div>

            {/* Product Care Instructions */}
            <details
              name="product-details"
              className="group border-t-0 border-gray-300 dark:border-zinc-700"
            >
              <summary className="text-text-base flex cursor-pointer items-center justify-between font-semibold text-gray-700 dark:text-zinc-400 [&::-webkit-details-marker]:hidden">
                Product Care Instructions
                <CaretDownIcon
                  size={20}
                  className="transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <ul className="mt-3 cursor-default space-y-2 text-sm text-gray-600 dark:text-zinc-400">
                {productCareInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </details>
          </>
        </div>
      </div>

      {/* Related Items */}
      <div className="flex flex-col overflow-hidden border-t border-gray-300 text-center">
        <h2 className="my-4 font-serif text-2xl font-semibold text-black dark:text-white">
          Related Items
        </h2>
        <div className="px-4 pb-4 lg:px-8">
          <Swiper
            freeMode={true}
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            modules={[FreeMode]}
          >
            {relatedItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  onClick={() => navigate(`/items/${item.id}`)}
                  className="group cursor-pointer"
                >
                  <img
                    src={item.path}
                    // src={product.image}
                    alt={item.title}
                    className="max-h-[200px] border border-gray-300 object-contain transition-transform duration-300 group-hover:scale-[98%] group-active:scale-[98%] max-sm:aspect-square sm:w-full dark:border-zinc-700"
                  />
                  <div className="mt-2 text-center">
                    <p className="font-serif text-sm font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                    {/* <p className="font-serif text-sm text-gray-600 dark:text-zinc-400">
                    LKR {item.price.toLocaleString()}
                    </p> */}
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
