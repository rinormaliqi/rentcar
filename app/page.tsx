import React from "react";
// import { Button } from "@/components/ui/button";
import { CarSlider } from "../components/CarSlider";
import CarRentalForm from "../components/ReservationForm";
import Hero from "../components/Hero";
import CarSliderS from "../components/CarTypeSelector";
import StepsSection from "../components/StepsSection";
import ContactSection from "../components/ContactSection";

export default function HomePage() {
  return (
    <main id="home" className="bg-white text-[#0B1D51]">
      <Hero />

      <section id="makinat"  className="bg-white py-16 px-6 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <CarSliderS />
        </div>
      </section>

      <section id="rezervo" className="bg-white py-16 px-6 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Bej nje Rezervim
        </h2>
        <CarRentalForm />
      </section>
      <section  id="hapat" className="bg-white py-16 px-6 md:px-8 lg:px-16">
        <StepsSection />
      </section>
      <section id="kontakt" className="bg-white py-16 px-6 md:px-8 lg:px-16">
        <ContactSection />
      </section>
    </main>
  );
}
