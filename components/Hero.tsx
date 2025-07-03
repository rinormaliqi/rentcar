"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import WhatsAppButton from "../components/WhatsAppButton";
// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], // Equivalent to "easeOut"
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
      className="bg-[#f9f9f9] relative py-44 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between overflow-hidden"
    >
      {/* Left content */}
      <motion.div animate={fadeUp} className="max-w-xl z-10">
        <p className="text-md text-gray-500 mb-2 font-medium">
          Udhëto me Zento Rent
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Nga <span className="text-[#4682B4]">Aeroporti</span> i Prishtinës
        </h1>
        <p className="text-gray-500 text-base mb-8">
          Nis udhëtimin direkt nga Aeroporti i Prishtinës, me MooV, gjithmonë në
          kohë!
        </p>

        <motion.div animate={fadeUp} className="flex gap-4">
          <Link
            href="/rezervo"
            className="bg-[#4682B4] hover:bg-[#005A9C] text-white px-6 py-3 rounded-lg shadow-lg font-semibold transition"
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
        className="mt-10 md:mt-0 relative w-full max-w-3xl z-10"
      >
        <Image
          src="/hero2.png"
          alt="Audi Car"
          width={1000}
          height={750}
          className="w-full h-auto"
          priority
        />
      </motion.div>

      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 z-0 hidden md:block rounded-l-[50%] bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      ></div>
    </motion.section>
  );
};

export default Hero;
