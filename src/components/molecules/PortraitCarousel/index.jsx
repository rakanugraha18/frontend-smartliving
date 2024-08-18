import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function PortraitCarousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="overflow-hidden relative mx-auto w-full max-w-[512px]">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: "512px", height: "983px" }}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="absolute hidden inset-0 items-center justify-between p-4">
        <button
          onClick={prev}
          className="rounded-full p-1 shadow-md text-black"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="rounded-full p-1 shadow-md text-black"
        >
          <ChevronRight size={40} />
        </button>
      </div>

      <div className="absolute bottom-20 right-0 left-0">
        <div className="flex items-center justify-center gap-6">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-6 h-6 bg-white rounded-full ${
                curr === i ? "bg-opacity-100" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
