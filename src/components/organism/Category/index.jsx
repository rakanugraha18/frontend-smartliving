import React from "react";
import Chair from "../../../assets/images/logo-category/chair.svg";
import Table from "../../../assets/images/logo-category/table.svg";
import Sofa from "../../../assets/images/logo-category/sofa.svg";
import Shelve from "../../../assets/images/logo-category/shelve.svg";
import Lamp from "../../../assets/images/logo-category/lamp.svg";
import Bed from "../../../assets/images/logo-category/bed.svg";
import Cabinet from "../../../assets/images/logo-category/cabinet.svg";
import Wardrobe from "../../../assets/images/logo-category/wardrobe.svg";
import IconButton from "../../atoms/ButtonCategory";

function Category() {
  return (
    <div className="hidden md:flex justify-center pt-9 pb-[14px]">
      <div className="flex justify-between w-full max-w-screen-xl">
        <IconButton
          icon={Chair}
          altText="Chair"
          label="Chair"
          link={"/category/chair"}
        />
        <IconButton icon={Table} altText="Table" label="Table" />
        <IconButton icon={Sofa} altText="Sofa" label="Sofa" />
        <IconButton icon={Shelve} altText="Shelve" label="Shelve" />
        <IconButton icon={Lamp} altText="Lamp" label="Lamp" />
        <IconButton icon={Bed} altText="Bed" label="Bed" />
        <IconButton icon={Cabinet} altText="Cabinet" label="Cabinet" />
        <IconButton icon={Wardrobe} altText="Wardrobe" label="Wardrobe" />
      </div>
    </div>
  );
}

export default Category;
