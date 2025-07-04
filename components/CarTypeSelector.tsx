"use client";

import { useState } from "react";
import { FaCheckCircle, FaPhoneAlt } from "react-icons/fa";
import cars from "../public/cars.json";
export default function CarSliderS() {
  const [selected, setSelected] = useState(cars[0]);

  return (
    <div className="px-4 py-16 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-3 text-gray-800">Makinat Tona</h2>
        <p className="text-gray-600 mb-10">
          Zgjidh makinën që i përshtatet nevojave të tua me{" "}
          <span className="font-semibold text-[#005a9c]">Zento</span>.
        </p>

        {/* Slider */}
        <div className="flex flex-wrap justify-center gap-4 overflow-x-auto pb-6">
          {cars.map((car) => (
            <button
              key={car.id}
              onClick={() => setSelected(car)}
              className={`whitespace-nowrap px-6 py-2 rounded-full border text-sm font-medium shadow-sm transition-all
                ${
                  selected.id === car.id
                    ? "bg-[#005a9c] text-white border-[#005a9c]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {car.name} – {car.fuel}
            </button>
          ))}
        </div>

        {/* Car Detail Card */}
        <div className="grid md:grid-cols-2 gap-12 mt-12 items-center">
          <img
            src={selected.image}
            alt={selected.name}
            className="w-full max-h-80 object-contain rounded-xl shadow-md"
          />

          <div className="text-left">
            <p className="text-4xl font-bold text-[#005a9c]">
              € {selected.price}.00
            </p>
            <p className="text-gray-500 mb-4 text-sm">
              Çmimi i qirasë për ditë
            </p>

            <hr className="border-blue-500 mb-5 w-20" />

            <div className="flex items-center gap-2 text-green-600 font-medium mb-3">
              <FaCheckCircle className="text-xl" />
              <span>Statusi: {selected.status}</span>
            </div>

            <ul className="space-y-1 text-gray-800 text-sm">
              <li>
                <strong>Modeli:</strong> {selected.name}
              </li>
              <li>
                <strong>Viti:</strong> {selected.year}
              </li>
              <li>
                <strong>Dyer:</strong> {selected.doors}
              </li>
              <li>
                <strong>Ulesë:</strong> {selected.seats}
              </li>
              <li>
                <strong>Transmisioni:</strong> {selected.transmission}
              </li>
              <li>
                <strong>Karburanti:</strong> {selected.fuel}
              </li>
              <li>
                <strong>Sigurimi:</strong> {selected.insurance}
              </li>
            </ul>
<a href="#rezervo">
            <button className="mt-6 w-full bg-[#87CEFA] hover:bg-[#005a9c] text-white font-semibold py-3 rounded-lg shadow transition">
              REZERVO
            </button>
            </a>
            <div className="mt-5 text-[#4682B4] font-bold flex items-center gap-2 text-sm">
              <FaPhoneAlt /> +383 (44) 00 00 00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
