import { useNavigate } from "react-router-dom";
import { HeartIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if product is already in favorites on mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(product.id));
  }, [product.id]);

  const handleCardClick = () => {
    navigate(`/items/${product.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();

    // Get current favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    let updatedFavorites;
    if (favorites.includes(product.id)) {
      // Remove from favorites
      updatedFavorites = favorites.filter((id) => id !== product.id);
      setIsFavorite(false);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, product.id];
      setIsFavorite(true);
    }

    // Save back to localStorage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // TODO: Add to favorites logic

    // Debug logs
    // console.log(favorites, typeof favorites)
    // const localstorageFavorites = localStorage.getItem("favorites");
    // console.log(localstorageFavorites, typeof localstorageFavorites)
  };

  const getStockBadge = () => {
    if (product.stock === 0) {
      return (
        <span className="absolute top-2 right-2 bg-red-600 px-2 py-1 text-xs font-medium text-white">
          Out of Stock
        </span>
      );
    }
    if (product.stock < 5) {
      return (
        <span className="absolute top-2 right-2 bg-orange-500 px-2 py-1 text-xs font-medium text-white">
          Low Stock
        </span>
      );
    }
    return null;
  };

  const formatPrice = (price) => {
    return Math.ceil(price).toLocaleString();
  };

  return (
    <div onClick={handleCardClick} className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-square overflow-visible">
        <img
          src={product.image}
          // src={`https://picsum.photos/1024/1024?${product.id}`}
          // src={`${import.meta.env.BASE_URL}/products/men/men_product_1_img_1.webp`}
          alt={product.title}
          className="size-full object-contain transition-transform duration-300 group-hover:scale-[103%] group-active:scale-[103%]"
          loading="lazy"
        />

        {/* Stock Badge */}
        {/* {getStockBadge()} */}

        {/* Favorite Button */}
        {/* <button
          onClick={handleFavoriteClick}
          className="absolute top-2 left-2 flex size-8 items-center justify-center border border-gray-300 bg-white/50 text-gray-600 backdrop-blur-xs transition-colors duration-300 hover:bg-black hover:text-white active:border-black dark:border-zinc-700 dark:bg-black/50 dark:text-zinc-400 dark:hover:bg-white dark:hover:text-black dark:active:border-white"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <HeartIcon
            size={18}
            weight={isFavorite ? "fill" : "regular"}
            className={isFavorite ? "text-red-500" : ""}
          />
        </button> */}
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="line-clamp-2 text-center font-serif text-sm font-medium text-gray-900 dark:text-white">
          {product.title}
        </h3>

        {/* {product.category && (
          <p className="mb-2 text-xs text-gray-500 dark:text-zinc-500">
            {product.category}
          </p>
        )} */}

        {/* <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            LKR {Math.ceil(product.price).toLocaleString()}
          </span>

          {product.rating && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-600 dark:text-zinc-400">
                ⭐ {product.rating?.rate?.toFixed(1)}
              </span>
              <span className="text-xs text-gray-500 dark:text-zinc-500">
                ({product.rating?.count})
              </span>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
