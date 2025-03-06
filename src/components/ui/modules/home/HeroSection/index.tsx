"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { assets } from "../../../../../../assets/assets";

const HeroSection = () => {
  const images = [assets.banner1, assets.banner2, assets.banner3];
  const [currentImage, setCurrentImage] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  // Change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false); // Start fade out
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setFadeIn(true); // Fade in new image
      }, 500); // Delay to match fade out duration
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[65vh] md:h-[80vh] flex items-center justify-center text-center bg-cover bg-center font-primaryFront">
      {/* Background Image */}
      <Image
        src={images[currentImage]}
        alt="Banner Background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 text-white">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-primaryFront">
          Buy & Sell Quality Second-Hand Goods
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-xl text-gray-300">
          {`Discover great deals on used items—whether you're looking to sell
          something you no longer need, or find your next bargain. Our platform
          offers a trusted and easy way to buy and sell second-hand goods.`}
        </p>
        <Button className="px-4 py-6 bg-teal-600 hover:bg-teal-700 text-white text-xl mt-6">
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
