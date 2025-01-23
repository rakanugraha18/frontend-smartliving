import React from "react";
import smartliving from "../../../assets/LogoSmartLiving.svg";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";
import Subscription from "../Subscription";

function Index() {
  return (
    <div>
      <Subscription />
      <div className="flex justify-center my-5">
        <div className="flex justify-between w-full max-w-screen-xl p-3">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">FAQ</h2>
            <div className="text-xs space-y-2">
              <p>{">"} Terms & Conditions</p>
              <p>{">"} Privacy Notice</p>
              <p>{">"} Returns & Refunds</p>
              <p>{">"} Care & Maintenance</p>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Join Us</h2>
            <div className="text-xs space-y-2">
              <p>{">"} Be our brand partner</p>
              <p>{">"} Be our delivery partner</p>
              <p>{">"} Career</p>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Contact Us</h2>
            <div className="text-xs space-y-2">
              <p>{">"} Perkantoran Taman Kebon Jeruk </p>
              <p className="pl-2">Meruya Selatan Kembangan</p>
              <p className="pl-2">Jakarta Barat DKI Jakarta 11650</p>
              <p>{">"} hello@smartliving.co.id</p>
              <p>{">"} (021) 4444555</p>
              <p>{">"} +6281233334444 </p>
            </div>
          </div>
          <div className="space-y-4">
            <img
              src={smartliving}
              alt="Smartliving logo"
              className="w-[277px] h-auto"
            />
            <div className="flex justify-between px-5">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  className="text-gray-600 hover:text-gray-800"
                  size={24}
                />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF
                  className="text-gray-600 hover:text-gray-800"
                  size={24}
                />
              </a>
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterestP
                  className="text-gray-600 hover:text-gray-800"
                  size={24}
                />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn
                  className="text-gray-600 hover:text-gray-800"
                  size={24}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
