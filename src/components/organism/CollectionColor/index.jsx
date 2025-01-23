import { useEffect, useState } from "react";
import Card from "../../molecules/Cards";
import SkeletonCard from "../../molecules/SkeletonLoader";

import Green from "../../../assets/images/color/green.png";
import Orange from "../../../assets/images/color/orange.png";
import Blue from "../../../assets/images/color/blue.png";
import Pink from "../../../assets/images/color/pink.png";

const colorImages = [
  { id: 1, name: "GREEN", image: Green },
  { id: 2, name: "ORANGE", image: Orange },
  { id: 3, name: "BLUE", image: Blue },
  { id: 4, name: "PINK", image: Pink },
];

const CollectionColor = () => {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [skeletonCount, setSkeletonCount] = useState(5); // Default number of skeleton loaders
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisibleProducts(colorImages);
      setLoading(false);
    }, 1000); // Simulate loading delay
  }, []);

  useEffect(() => {
    const updateSkeletonCount = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setSkeletonCount(2);
      } else if (screenWidth < 1026) {
        setSkeletonCount(3);
      } else if (screenWidth < 1150) {
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

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex justify-between pt-9 font-poppins px-6 w-full max-w-screen-xl">
          <h2 className="text-[15px] md:text-2xl font-medium">
            COLLECTION BY COLOR
          </h2>
          <p className="md:text-xs text-[10px]">LIHAT LAINNYA {">"}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-screen-xl">
          <div className="flex justify-between flex-wrap p-4">
            {loading
              ? Array.from({ length: skeletonCount }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : visibleProducts.map((product, i) => (
                  <div key={i} className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/5 p-2">
                    <Card
                      redirect="#"
                      id={product.id}
                      title={product.name}
                      img={product.image}
                      borderRadius="8px" // Adjust border radius as needed
                      classname="h-[240px] md:h-[343px]"
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionColor;
