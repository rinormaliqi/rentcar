"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import WhatsAppButton from "../components/WhatsAppButton";

// Animation Variants (unchanged)
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Hero = () => {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-[#f9f9f9] relative py-20 md:py-32 lg:py-44 px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between overflow-hidden"
    >
      {/* Background image - visible only on larger screens */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 z-0 hidden md:block rounded-l-[50%] bg-cover bg-center"
        style={{ backgroundImage: "url('/bg4.jpg')" }}
      ></div>

      {/* Left content */}
      <motion.div 
        animate={fadeUp} 
        className="max-w-xl z-10 md:mr-8 lg:mr-12 mb-12 md:mb-0"
      >
        <p className="text-base md:text-md text-gray-500 mb-2 md:mb-3 font-medium">
          Udhëto me Zento Rent
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
          Nga <span className="text-[#4682B4]">Aeroporti</span> i Prishtinës
        </h1>
        <p className="text-gray-500 text-base mb-6 md:mb-8">
          Nis udhëtimin direkt nga Aeroporti i Prishtinës, gjithmonë në kohë!
        </p>

        <motion.div 
          animate={fadeUp} 
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <Link
            href="#rezervo"
            className="bg-[#4682B4] hover:bg-[#005A9C] text-white px-5 py-3 md:px-6 md:py-3 rounded-lg shadow-lg font-semibold transition text-center text-sm md:text-base"
          >
            Rezervo Makinën 📅
          </Link>
          <WhatsAppButton />
        </motion.div>
      </motion.div>

      {/* Right car image */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md lg:max-w-3xl z-10"
      >
        <Image
          src="/audibg.png"
          alt="Audi Car"
          width={1000}
          height={750}
          className="w-full h-auto"
          priority
        />
      </motion.div>
    </motion.section>
  );
};

export default Hero;