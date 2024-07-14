import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/store/hooks";

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cartNumber = useAppSelector((state) => state.cart.items.length);

  useEffect(() => {
    const handleSwipe = (event: TouchEvent) => {
      const startX = event.changedTouches[0].clientX;
      const endX = event.changedTouches[1].clientX;
      if (startX > endX) {
        // Swiped left
        setIsDrawerOpen(false);
      } else {
        // Swiped right
        setIsDrawerOpen(true);
      }
    };

    document.addEventListener("touchend", handleSwipe);

    return () => {
      document.removeEventListener("touchend", handleSwipe);
    };
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <header className="bg-red-200 px-6 py-3 md:px-10 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center relative z-10">
        <div className="logo text-xl font-semibold">
          <Link to="/" onClick={closeDrawer}>
            Campers Shop
          </Link>
        </div>
        <nav className="hidden md:flex flex-grow justify-center items-center">
          <ul className="flex gap-6">
            <li>
              <Link
                to="/products"
                className="text-gray-800 hover:text-gray-600"
                onClick={closeDrawer}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-800 hover:text-gray-600"
                onClick={closeDrawer}
              >
                About Us
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/cart"
                className="text-gray-800 hover:text-gray-600 relative"
                onClick={closeDrawer}
              >
                Cart
                <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 right-0">
                  {cartNumber ? cartNumber : 0}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className="md:hidden"
          onClick={toggleDrawer}
          aria-label={isDrawerOpen ? "Close" : "Open"}
        >
          {/* Mobile menu icon (e.g., Hamburger icon) */}
          <svg
            className="w-6 h-6 text-gray-800 hover:text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isDrawerOpen ? (
              <path d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            )}
          </svg>
        </button>
      </div>
      {/* Drawer Menu */}
      <div
        className={`md:hidden bg-white  h-screen absolute top-14 right-0  z-40 shadow-lg transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className=" mx-auto h-full  flex flex-col justify-center items-end py-4">
          <Link
            to="/products"
            className="text-gray-800 hover:text-gray-600 py-2 px-6"
            onClick={closeDrawer}
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-gray-800 hover:text-gray-600 py-2 px-6"
            onClick={closeDrawer}
          >
            About Us
          </Link>
          <Link
            to="/cart"
            className="text-gray-800 hover:text-gray-600 py-2 px-6 relative"
            onClick={closeDrawer}
          >
            Cart
            {cartNumber > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 right-0">
                {cartNumber}
              </span>
            )}
          </Link>
        </div>
      </div>
      {/* Overlay to close drawer when clicking outside */}
      {isDrawerOpen && (
        <div
          className="md:hidden fixed top-14 inset-0 bg-black opacity-25 z-30"
          onClick={toggleDrawer}
        />
      )}
    </header>
  );
};

export default Header;
