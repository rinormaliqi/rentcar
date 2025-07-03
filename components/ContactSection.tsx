"use client";
import { useState } from "react";
import { MapPinIcon, MailIcon, PhoneIcon, ClockIcon } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ success: true, message: result.message });
        setFormData({ name: "", email: "", message: "", phone: "" }); // Reset form
      } else {
        setSubmitStatus({ success: false, message: result.message });
      }
    } catch (error: any) {
      setSubmitStatus({
        success: false,
        message: error.message || "Ndodhi një gabim gjatë dërgimit të mesazhit",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 py-12 max-w-6xl mx-auto">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Keni nevojë për më shumë informacion?
        </h2>
        <p className="text-gray-600 text-lg">
          Na kontaktoni dhe do t'ju ndihmojmë me kënaqësi!
        </p>

        <ul className="space-y-4 text-gray-700">
          <li className="flex items-start gap-3">
            <PhoneIcon className="w-5 h-5 mt-0.5 text-[#4682B4]" />
            <div>
              <h3 className="font-medium">Telefoni</h3>
              <p>+383 (44) 00 00 00</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <MailIcon className="w-5 h-5 mt-0.5 text-[#4682B4]" />
            <div>
              <h3 className="font-medium">Email</h3>
              <p>info@rent.net</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <MapPinIcon className="w-5 h-5 mt-0.5 text-[#4682B4]" />
            <div>
              <h3 className="font-medium">Adresa</h3>
              <p>Rruga e Aeroportit, Sllatinë e Madhe, 14060, Kosovë</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <ClockIcon className="w-5 h-5 mt-0.5 text-[#4682B4]" />
            <div>
              <h3 className="font-medium">Orari</h3>
              <p>24/7 (24 orë në ditë, 7 ditë në javë)</p>
            </div>
          </li>
        </ul>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 space-y-5"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Dërgo mesazh</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Emri*</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Emri juaj i plotë"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email*</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@shembull.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telefoni</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+383 44 123 456"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mesazhi*</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Shkruani mesazhin tuaj këtu..."
              required
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-[#4682B4] hover:bg-blue-950 text-white font-medium rounded-md transition-colors duration-300 disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Duke dërguar...
            </span>
          ) : (
            "Dërgo mesazhin"
          )}
        </button>

        {submitStatus && (
          <div
            className={`p-3 rounded-md text-center ${
              submitStatus.success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {submitStatus.message}
          </div>
        )}
      </form>
    </section>
  );
}
