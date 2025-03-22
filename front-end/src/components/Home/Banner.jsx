import { useState, useEffect, useCallback } from "react";
import image01 from "../../assets/banner/bn1.webp";
import image02 from "../../assets/banner/bn2.webp";
import image03 from "../../assets/banner/bn3.jpg";
import image04 from "../../assets/banner/bn4.webp";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsDot } from "react-icons/bs";

export default function Banner() {
  const images = [image01, image02, image03, image04];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [images.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [images.length, isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  const goToSlide = (index) => {
    if (isTransitioning || index === activeIndex) return;

    setIsTransitioning(true);
    setActiveIndex(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden  shadow-lg">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
              index === activeIndex
                ? "opacity-100 translate-x-0"
                : index < activeIndex
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            <img
              src={image}
              alt={`banner-${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/50 backdrop-blur-sm text-white rounded-full p-3 transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-lg" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/50 backdrop-blur-sm text-white rounded-full p-3 transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-lg" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === activeIndex
                ? "text-white scale-150"
                : "text-white/60 hover:text-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <BsDot className="text-2xl" />
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </div>
  );
}
