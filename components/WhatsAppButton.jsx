'use client';

export default function WhatsAppButton() {
  const phoneNumber = '38345321992'; // <-- without '+' or leading zeros
  const message = 'Hello, I am interested in your services!';
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
      target="_blank"
      rel="noopener noreferrer">
            Kontakto Ne WhatsApp 💬
            </button>
  );
}
