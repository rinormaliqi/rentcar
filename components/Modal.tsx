"use client";
import { useState } from "react";

export default function ConfirmationModal({
  data,
  totalPrice,
  onClose,
}: {
  data: any;
  totalPrice: number;
  onClose: () => void;
}) {
  const [personal, setPersonal] = useState({
    name: "",
    surname: "",
    personal_id: "",
    phone_number: "",
    price: totalPrice,
    has_license: false,
    accepts_responsibility: false,
    read_terms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [reservationId, setReservationId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPersonal({
      ...personal,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    // Validate all fields
    if (
      !personal.name ||
      !personal.surname ||
      !personal.personal_id ||
      !personal.phone_number ||
      !personal.has_license ||
      !personal.accepts_responsibility ||
      !personal.read_terms
    ) {
      setError(
        "Ju lutemi plotësoni të gjitha fushat dhe pranoni të gjitha kushtet",
      );
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Prepare data with correct field names
      const formData = {
        ...data,
        ...personal,
        total_price: totalPrice,
        // Convert booleans to uppercase strings for SheetDB
        has_license: personal.has_license ? "TRUE" : "FALSE",
        accepts_responsibility: personal.accepts_responsibility
          ? "TRUE"
          : "FALSE",
        read_terms: personal.read_terms ? "TRUE" : "FALSE",
      };

      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed");
      }

      // Show reservation ID to user
      setReservationId(result.reservation_id);
    } catch (err: any) {
      setError(
        err.message ||
          "Gabim në dërgimin e të dhënave. Ju lutemi provoni përsëri.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {reservationId ? (
            <div className="text-center">
              <div className="text-green-500 text-5xl mb-6">✓</div>
              <h2 className="text-2xl font-bold mb-3 text-[#005A9C]">
                Rezervimi u krye me sukses!
              </h2>
              <p className="mb-4 text-lg">Numri i rezervimit tuaj:</p>
              <div className="text-2xl font-mono font-bold bg-gray-100 p-3 rounded-lg mb-6 inline-block">
                {reservationId}
              </div>
              <div className="bg-blue-50 p-5 rounded-lg mb-6 text-left">
                <h3 className="font-bold text-lg mb-3 text-center">
                  Detajet e rezervimit:
                </h3>
                <div className="space-y-2">
                  <p className="flex">
                    <span className="font-medium min-w-[120px]">Makina:</span>
                    <span>{data.car_type}</span>
                  </p>
                  <p className="flex">
                    <span className="font-medium min-w-[120px]">Vendmarrja:</span>
                    <span>{data.pickup_location}</span>
                  </p>
                  <p className="flex">
                    <span className="font-medium min-w-[120px]">Vendkthimi:</span>
                    <span>{data.dropoff_location}</span>
                  </p>
                  <p className="flex">
                    <span className="font-medium min-w-[120px]">Marrja:</span>
                    <span>{data.pickup_date} në {data.pickup_time}</span>
                  </p>
                  <p className="flex">
                    <span className="font-medium min-w-[120px]">Kthimi:</span>
                    <span>{data.dropoff_date} në {data.dropoff_time}</span>
                  </p>
                  <p className="mt-3 font-bold text-lg">
                    Totali: {totalPrice} €
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Do të kontaktoheni nga ekipi ynë për konfirmimin e rezervimit.
              </p>
              <button
                onClick={onClose}
                className="bg-[#005A9C] text-white px-8 py-3 rounded-lg hover:bg-[#004a80] transition-colors text-lg"
              >
                Mbylle
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-5 text-[#005A9C] text-center">
                Plotësoni të dhënat personale
              </h2>

              <div className="bg-gray-50 p-5 rounded-lg mb-6">
                <h3 className="font-bold text-lg mb-3 text-center">
                  Detajet e rezervimit:
                </h3>
                <div className="space-y-2">
                  <p className="flex">
                    <span className="font-medium min-w-[120px]">Makina:</span>
                    <span>{data.car_type}</span>
                  </p>
                  <p className="flex">
                    <span className="font-medium min-w-[120px]">Vendmarrja:</span>
                    <span>{data.pickup_location}</span>
                  </p>
                  <p className="flex">
                    <span className="font-medium min-w-[120px]">Vendkthimi:</span>
                    <span>{data.dropoff_location}</span>
                  </p>
                  <p className="flex">
                    <span className="font-medium min-w-[120px]">Marrja:</span>
                    <span>{data.pickup_date} në {data.pickup_time}</span>
                  </p>
                  <p className="flex">
                    <span className="font-medium min-w-[120px]">Kthimi:</span>
                    <span>{data.dropoff_date} në {data.dropoff_time}</span>
                  </p>
                  <p className="font-bold text-lg mt-3">Totali: {totalPrice} €</p>
                </div>
              </div>

              {error && (
                <div className="text-red-500 mb-6 p-3 bg-red-50 rounded-lg text-center">
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Emri*
                    </label>
                    <input
                      name="name"
                      value={personal.name}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#005A9C]"
                      placeholder="Shkruani emrin"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Mbiemri*
                    </label>
                    <input
                      name="surname"
                      value={personal.surname}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#005A9C]"
                      placeholder="Shkruani mbiemrin"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Numri Personal*
                    </label>
                    <input
                      name="personal_id"
                      value={personal.personal_id}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#005A9C]"
                      placeholder="Numri i identifikimit"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Numri Kontaktues*
                    </label>
                    <input
                      name="phone_number"
                      value={personal.phone_number}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#005A9C]"
                      placeholder="Numri Kontaktues"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="has_license"
                        checked={personal.has_license}
                        onChange={handleChange}
                        className="mt-1 w-5 h-5"
                      />
                      <label className="ml-2">
                        Unë kam patentë shoferi të vlefshme*
                      </label>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="accepts_responsibility"
                        checked={personal.accepts_responsibility}
                        onChange={handleChange}
                        className="mt-1 w-5 h-5"
                      />
                      <label className="ml-2">
                        Pranoje përgjegjësinë e plotë për marrjen e makinës*
                      </label>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="read_terms"
                        checked={personal.read_terms}
                        onChange={handleChange}
                        className="mt-1 w-5 h-5"
                      />
                      <label className="ml-2">
                        Kam lexuar dhe pranoj kushtet e marrjes së makinës me
                        qira*
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  disabled={isSubmitting}
                >
                  Anulo
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-[#005A9C] to-blue-500 text-white px-8 py-3 rounded-lg disabled:opacity-70 hover:from-[#004a80] hover:to-blue-700 transition-colors font-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Duke dërguar..." : "Konfirmo Rezervimin"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
