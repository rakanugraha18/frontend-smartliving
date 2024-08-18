import React from "react";
import InputForm from "../../atoms/Input";
import Button from "../../atoms/Button";
import InputText from "../../atoms/Input/InputText";

function Subscription() {
  return (
    <div className="flex justify-center flex-col bg-[#F1F4F9] min-h-[200px]">
      <div className="flex w-full max-w-screen-xl flex-wrap justify-between p-3 items-center mx-auto">
        <div>
          <h2 className="text-[16px] font-medium">Join Our Newsletter</h2>
          <p className="text-[12px]">Find design inspiration for your home</p>
        </div>
        <div className="relative flex items-center text-sm">
          <input
            placeholder="Input your email"
            className="bg-[#CBD4E1] p-2 rounded-full pl-4 pr-36 w-[500px]" // Lebar input 500px dan padding kanan yang cukup untuk tombol
          />
          <button
            type="submit"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full w-[145px] p-2 bg-[#16697A] text-white"
          >
            <p className="text-center">Subscribe</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
