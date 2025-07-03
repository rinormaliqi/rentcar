"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Car = {
  name: string;
  price: string;
  image: string;
};

export const CarSlider = ({ cars }: { cars: Car[] }) => {
  const [current, setCurrent] = useState(0);

  const nextCar = () => {
    setCurrent((prev) => (prev + 1) % cars.length);
  };

  const prevCar = () => {
    setCurrent((prev) => (prev - 1 + cars.length) % cars.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={cars[current].name}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-10 items-center bg-white rounded-3xl shadow-xl p-8"
        >
          <img
            src={cars[current].image}
            alt={cars[current].name}
            className="w-full h-[280px] object-contain bg-gray-100 rounded-2xl"
          />

          <div className="text-left">
            <h3 className="text-3xl font-bold mb-2 text-gray-800">
              {cars[current].name}
            </h3>
            <p className="text-xl text-[#4682B4] font-medium mb-6">
              {cars[current].price}
            </p>
            <button className="px-6 py-3 bg-[#4682B4] hover:bg-[#005a9c] text-white rounded-lg font-semibold transition">
              Rezervo Tani
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevCar}
        className="absolute top-1/2 left-0 -translate-y-1/2 bg-white border shadow rounded-full p-3 hover:bg-gray-100 transition"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextCar}
        className="absolute top-1/2 right-0 -translate-y-1/2 bg-white border shadow rounded-full p-3 hover:bg-gray-100 transition"
      >
        <ChevronRight />
      </button>
    </div>
  );
};
