"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerHeight = window.innerHeight * 0.01;
      setScrolled(scrollPosition > triggerHeight);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center space-x-2"
        >
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold text-black">ZENTO</span>
            <span className="text-[12px] tracking-widest text-gray-700">
              RENT A CAR
            </span>
          </Link>
        </motion.div>

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:flex gap-8 font-semibold text-black"
        >
          <Link href="#home" className="text-[#87CEFA]">
            Home
          </Link>
          <Link href="#makinat" className="hover:text-[#87CEFA]">
            Makinat
          </Link>
          <Link href="#kontakt" className="hover:text-[#87CEFA]">
            Kontakti
          </Link>
        </motion.nav>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Link
            href="#rezervo"
            className="ml-4 bg-[#87CEFA] text-white px-5 py-2 rounded-lg shadow-lg font-medium hover:bg-[#005a9c] transition"
          >
            Rezervo
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
