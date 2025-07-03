"use client";
import { useState, useEffect } from "react";
import {
  FaCar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEuroSign,
} from "react-icons/fa";
import ConfirmationModal from "./Modal";
import cars from "../public/cars.json";

// Define the shape of form errors
interface FormErrors {
  car_type?: string;
  pickup_date?: string;
  dropoff_date?: string;
  [key: string]: string | undefined; // Index signature for dynamic properties
}

export default function CarRentalForm() {
  const [showModal, setShowModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    car_type: "",
    pickup_location: "Aeroportin e Prishtinës",
    dropoff_location: "Aeroportin e Prishtinës",
    pickup_date: "",
    pickup_time: "",
    dropoff_date: "",
    dropoff_time: "",
  });

  // Calculate min dates for date inputs
  const today = new Date().toISOString().split("T")[0];
  const minDropoffDate = formData.pickup_date || today;

  // Calculate price when car or dates change
  useEffect(() => {
    if (formData.car_type && formData.pickup_date && formData.dropoff_date) {
      const selectedCar = cars.find((car) => car.name === formData.car_type);

      if (selectedCar) {
        // Calculate number of days
        const start = new Date(formData.pickup_date);
        const end = new Date(formData.dropoff_date);
        const timeDiff = end.getTime() - start.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) || 1;

        setTotalPrice(selectedCar.price * days);
      }
    } else {
      setTotalPrice(0);
    }
  }, [formData.car_type, formData.pickup_date, formData.dropoff_date]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const errors: FormErrors = {};
    const now = new Date();
    const pickupDate = new Date(formData.pickup_date);

    // Check for past dates
    if (formData.pickup_date && pickupDate < now) {
      errors.pickup_date = "Nuk mund të zgjidhni një datë të kaluar";
    }

    // Check if dropoff is before pickup
    if (formData.pickup_date && formData.dropoff_date) {
      const dropoffDate = new Date(formData.dropoff_date);

      if (dropoffDate < pickupDate) {
        errors.dropoff_date =
          "Data e kthimit duhet të jetë pas datës së marrjes";
      }
    }

    // Check required fields
    if (!formData.car_type) errors.car_type = "Ju lutemi zgjidhni një makinë";
    if (!formData.pickup_date)
      errors.pickup_date = "Ju lutemi zgjidhni një datë marrjeje";
    if (!formData.dropoff_date)
      errors.dropoff_date = "Ju lutemi zgjidhni një datë kthimi";

    // Set errors or show modal
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      setShowModal(true);
    }
  };

  return (
    <section className="bg-white py-10 px-4 md:px-12 lg:px-20">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Car Type */}
          <div className="col-span-1">
            <label className="font-semibold mb-1 flex items-center gap-2">
              <FaCar className="text-[#005A9C]" /> Zgjidh makinën
            </label>
            <select
              name="car_type"
              value={formData.car_type}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 text-gray-700 ${formErrors.car_type ? "border-red-500" : ""}`}
              required
            >
              <option value="">Zgjidhni makinën</option>
              {cars.map((car) => (
                <option key={car.id} value={car.name}>
                  {car.name} - {car.price}€/ditë
                </option>
              ))}
            </select>
            {formErrors.car_type && (
              <p className="text-red-500 text-sm mt-1">{formErrors.car_type}</p>
            )}
          </div>

          {/* Pickup Location */}
          <div className="col-span-1">
            <label className="font-semibold mb-1 flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#005A9C]" /> Vendmarrja
            </label>
            <select
              name="pickup_location"
              value={formData.pickup_location}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 text-gray-700"
              required
            >
              <option>Aeroportin e Prishtinës</option>
              <option>Qendra e qytetit</option>
              <option>Stacioni i autobusëve</option>
            </select>
          </div>

          {/* Dropoff Location */}
          <div className="col-span-1">
            <label className="font-semibold mb-1 flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#005A9C]" /> Vendkthimi
            </label>
            <select
              name="dropoff_location"
              value={formData.dropoff_location}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 text-gray-700"
              required
            >
              <option>Aeroportin e Prishtinës</option>
              <option>Qendra e qytetit</option>
              <option>Stacioni i autobusëve</option>
            </select>
          </div>

          {/* Pickup Date */}
          <div>
            <label className="font-semibold mb-1 flex items-center gap-2">
              <FaCalendarAlt className="text-[#005A9C]" /> Data e marrjes
            </label>
            <input
              type="date"
              name="pickup_date"
              value={formData.pickup_date}
              onChange={handleChange}
              min={today}
              className={`w-full border rounded-lg px-4 py-2 text-gray-700 ${formErrors.pickup_date ? "border-red-500" : ""}`}
              required
            />
            {formErrors.pickup_date && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.pickup_date}
              </p>
            )}
          </div>

          {/* Pickup Time */}
          <div>
            <label className="font-semibold mb-1 flex items-center gap-2">
              <span className="invisible">.</span> Ora e marrjes
            </label>
            <input
              type="time"
              name="pickup_time"
              value={formData.pickup_time}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 text-gray-700"
              required
            />
          </div>

          {/* Dropoff Date */}
          <div>
            <label className="font-semibold mb-1 flex items-center gap-2">
              <FaCalendarAlt className="text-[#005A9C]" /> Data e kthimit
            </label>
            <input
              type="date"
              name="dropoff_date"
              value={formData.dropoff_date}
              onChange={handleChange}
              min={minDropoffDate}
              className={`w-full border rounded-lg px-4 py-2 text-gray-700 ${formErrors.dropoff_date ? "border-red-500" : ""}`}
              required
            />
            {formErrors.dropoff_date && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.dropoff_date}
              </p>
            )}
          </div>

          {/* Dropoff Time */}
          <div>
            <label className="font-semibold mb-1 flex items-center gap-2">
              <span className="invisible">.</span> Ora e kthimit
            </label>
            <input
              type="time"
              name="dropoff_time"
              value={formData.dropoff_time}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 text-gray-700"
              required
            />
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-3 bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaEuroSign className="text-green-600" />
                <span className="font-semibold">Çmimi i llogaritur:</span>
              </div>
              <div className="text-xl font-bold text-green-700">
                {totalPrice > 0
                  ? `${totalPrice} €`
                  : "Zgjidhni makinën dhe datat"}
              </div>
            </div>
            {totalPrice > 0 && (
              <div className="text-sm text-gray-600 mt-2">
                Ky çmim përfshin taksat dhe përdorimin e plotë të makinës për
                periudhën e zgjedhur.
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-3 flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#005A9C] to-blue-500 hover:from-[#005A9C] hover:to-blue-900 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              Rezervo
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <ConfirmationModal
          data={formData}
          totalPrice={totalPrice}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}
