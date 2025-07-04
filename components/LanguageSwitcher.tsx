"use client";

import { useLanguage } from "../context/language";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setLanguage("en")}
        disabled={language === "en"}
        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
          language === "en"
            ? "bg-blue-600 text-white cursor-default opacity-70"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        English
      </button>

      <button
        onClick={() => setLanguage("sq")}
        disabled={language === "sq"}
        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
          language === "sq"
            ? "bg-blue-600 text-white cursor-default opacity-70"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        Shqip
      </button>
    </div>
  );
}
