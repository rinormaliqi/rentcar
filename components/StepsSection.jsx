import { CalendarIcon, CarIcon } from 'lucide-react';

export default function StepsSection() {
  const steps = [
    {
      icon: <CarIcon className="w-10 h-10 text-[#4682B4]" />, 
      title: 'Zgjidhni Makinën Tuaj Të Preferuar', 
      text: 'Zgjidhni automjetin tuaj të preferuar nga flota jonë me një klikim.'
    },
    {
      icon: <CalendarIcon className="w-10 h-10 text-[#4682B4]" />, 
      title: 'Caktoni Datat Dhe Vendin', 
      text: 'Zgjidhni vendin dhe datat. Shtoni opsione si GPS apo karroca.'
    },
    {
      icon: <CarIcon className="w-10 h-10 text-[#4682B4]" />, 
      title: 'Plotësoni Të Dhënat Dhe Nisuni', 
      text: 'Plotësoni të dhënat personale dhe merrni konfirmimin.'
    },
  ];

  return (
    <section className="text-center space-y-8 px-4">
      <h2 className="text-3xl md:text-5xl font-bold">Në mënyrë të shpejtë dhe të thjeshtë</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map(({ icon, title, text }, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-md space-y-4">
            <div className="flex justify-center">{icon}</div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-gray-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}