import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: "John Doe",
  },
  {
    id: 2,
    quote:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    author: "Jane Smith",
  },
  {
    id: 3,
    quote:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
    author: "James Johnson",
  },
];

const TestimonialSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative min-h-screen   bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-center text-2xl">Testimonial</h2>
      </div>
      <div className="flex justify-center items-center w-[80%]">
        <div className=" ">
          <Transition
            show={true}
            enter="transform transition ease-in-out duration-500"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="absolute top-0 left-0 w-full h-full flex">
              <div className="w-full flex items-center justify-center">
                <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-lg text-gray-800 mb-4">
                    "{testimonials[currentSlide].quote}"
                  </p>
                  <p className="text-gray-600">
                    {testimonials[currentSlide].author}
                  </p>
                </div>
              </div>
            </div>
          </Transition>
          <button
            className="absolute top-1/2 transform -translate-y-1/2 left-0 rounded-full bg-gray-300 p-2 text-gray-700 hover:bg-gray-400 hover:text-gray-800 transition duration-300"
            onClick={prevSlide}
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full bg-gray-300 p-2 text-gray-700 hover:bg-gray-400 hover:text-gray-800 transition duration-300"
            onClick={nextSlide}
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
