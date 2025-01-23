import { useEffect, useState } from "react";
import Card from "../../molecules/Cards";
import SkeletonCard from "../../molecules/SkeletonLoader";

import Article1 from "../../../assets/images/articles/article1.png";
import Article2 from "../../../assets/images/articles/article2.png";
import Article3 from "../../../assets/images/articles/article3.png";
import Article4 from "../../../assets/images/articles/article4.png";

const colorImages = [
  {
    id: 1,
    description:
      "Mengenal Art Deco, Desain Arsitektur dan Interior yang Anggun dan Ekspresif",
    date: "25 Juli 2024",
    image: Article1,
  },
  {
    id: 2,
    description: "5 Pilihan Denah Dapur Terbaik untuk Rumah Anda",
    date: "20 Juli 2024",

    image: Article2,
  },
  {
    id: 3,
    description:
      "Referensi 10 Cafe di Jakarta Timur yang Asyik untuk WFC dan Hangout",
    date: "15 Juli 2024",
    image: Article3,
  },
  {
    id: 4,
    description: "Jenis-jenis Karpet yang Cocok untuk Ruang Tamu Anda",
    date: "10 Juli 2024",
    image: Article4,
  },
];

const Articles = () => {
  const [visibleArticles, setVisibleArticles] = useState([]);
  const [skeletonCount, setSkeletonCount] = useState(5); // Default number of skeleton loaders
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisibleArticles(colorImages);
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
          <h2 className="text-[15px] md:text-2xl font-medium">ARTICLES</h2>
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
              : visibleArticles.map((article, i) => (
                  <div key={i} className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/5 p-2">
                    <Card
                      redirect="#"
                      id={article.id}
                      description={article.description}
                      date={article.date}
                      img={article.image}
                      borderRadius="8px" // Adjust border radius as needed
                      classname="max-h-[405px] max-w[256px]"
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
