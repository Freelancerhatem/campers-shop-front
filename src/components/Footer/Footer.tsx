import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">About Campershop</h2>
            <p className="text-sm">
              Campershop is your go-to destination for all camping gear and
              accessories. We provide high-quality products and excellent
              customer service to enhance your outdoor experience.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm">Email: info@campershop.com</p>
            <p className="text-sm">Phone: +1 234 567 890</p>
            <p className="text-sm">Address: 1234 Campers Way, City, Country</p>
          </div>
        </div>
        <hr className="border-gray-700 my-8" />
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Campershop. All rights reserved.
          </p>
          <div className="flex mt-4 md:mt-0 justify-center md:justify-end space-x-4">
            <a href="#" className="text-gray-300 hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-gray-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
