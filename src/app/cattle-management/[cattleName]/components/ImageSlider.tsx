"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
};

const ImageSlider = ({ images }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-3xl">
      {/* Carousel Wrapper */}
      <div className="relative w-full h-64 sm:h-56 md:h-56 overflow-hidden rounded-xl">
        {images.length>0 && images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 60vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-[#3B3B3B73] hover:bg-white/70 rounded-md p-2"
      >
        <svg className="w-5 h-4 text-white hover:text-black" viewBox="0 0 6 10" fill="none">
          <path
            d="M5 1L1 5l4 4"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-[#3B3B3B73] hover:bg-white/70 rounded-md p-2"
      >
        <svg className="w-5 h-4 text-white hover:text-black" viewBox="0 0 6 10" fill="none">
          <path
            d="M1 9l4-4-4-4"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default ImageSlider;
