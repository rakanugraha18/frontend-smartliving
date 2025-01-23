import React, { useEffect } from "react";
import Recomendation from "../components/organism/Recomendation";
import Slider from "../components/organism/Slider";
import CollectionColor from "../components/organism/CollectionColor";
import Articles from "../components/organism/Articles";
import Category from "../components/organism/Category";
import { useCart } from "../context/cartContext";

function HomePage() {
  const { fetchCartItems, error } = useCart();

  useEffect(() => {
    fetchCartItems(); // Memastikan data cart selalu di-fetch saat komponen dimount
  }, []);

  return (
    <div>
      <div className="flex justify-center pb-[14px]">
        <Slider />
      </div>
      <Category />
      <Recomendation />
      <CollectionColor />
      <Articles />
    </div>
  );
}

export default HomePage;
