import { useEffect, useState } from "react";
import Card from "../../molecules/Cards";
import getApiProduct from "../../api/product";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "../../molecules/SkeletonLoader";

const Recomendation = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [skeletonCount, setSkeletonCount] = useState(5); // Default number of skeleton loaders
  const imgUrl = import.meta.env.VITE_APP_IMGURL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await getApiProduct();
        setDataProduct(data);
        adjustVisibleProducts(data); // Set visible products based on the fetched data
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      adjustVisibleProducts(dataProduct); // Adjust visible products based on screen size
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dataProduct]); // Only re-run if `dataProduct` changes

  useEffect(() => {
    const updateSkeletonCount = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setSkeletonCount(2);
      } else if (screenWidth <= 1024) {
        setSkeletonCount(3);
      } else if (screenWidth <= 1280) {
        setSkeletonCount(4);
      } else {
        setSkeletonCount(5);
      }
    };

    updateSkeletonCount();
    window.addEventListener("resize", updateSkeletonCount);
    return () => {
      window.removeEventListener("resize", updateSkeletonCount);
    };
  }, []);

  const adjustVisibleProducts = (products) => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setVisibleProducts(products.slice(0, 2)); // Show only 2 products on small screens
    } else if (screenWidth <= 1024) {
      setVisibleProducts(products.slice(0, 3)); // Show only 3 products on medium screens
    } else if (screenWidth <= 1280) {
      setVisibleProducts(products.slice(0, 4)); // Show only 4 products on large screens
    } else {
      setVisibleProducts(products.slice(0, 5)); // Show max 5 products on extra-large screens
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between pt-9 font-poppins px-6 w-full max-w-screen-xl">
        <h2 className="text-[15px] md:text-2xl font-medium">
          RECOMMENDATION PRODUCT
        </h2>
        <p className="md:text-xs text-[10px] cursor-pointer">
          LIHAT LAINNYA {">"}
        </p>
      </div>
      <div className="w-full max-w-screen-xl flex justify-center p-4">
        <div className="flex flex-wrap w-full max-w-screen-xl justify-between">
          {loading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : visibleProducts.length > 0
            ? visibleProducts.map((product, i) => (
                <div
                  key={i}
                  className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-2 flex justify-center"
                >
                  <Card
                    redirect="/productDetail"
                    id={product.id}
                    title={product.name}
                    beforeDiscount={product.price}
                    img={product.image}
                    priceAfterDiscount={product.price}
                    freeDelivery="FREE DELIVERY SERVICES"
                    classname="max-w-[176px]"
                    discount={product.discount}
                  />
                </div>
              ))
            : Array.from({ length: skeletonCount }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Recomendation;
