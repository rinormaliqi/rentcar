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
    <main className="bg-white text-[#0B1D51]">
      <Hero />

      <section className="bg-white py-16 px-6 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <CarSliderS />
        </div>
      </section>

      <section className="bg-white py-16 px-6 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Bej nje Rezervim
        </h2>
        <CarRentalForm />
      </section>
      <section className="bg-white py-16 px-6 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Bej nje Rezervim
        </h2>
        <StepsSection />
      </section>
      <section className="bg-white py-16 px-6 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Bej nje Rezervim
        </h2>
        <ContactSection />
      </section>
    </main>
  );
}
