"use client";

import { useState, useMemo } from "react";
import { CITIES_TAJIKISTAN } from "@/data/cities";

interface CitySelectProps {
  value: string | undefined;
  onChange: (city: string | undefined) => void;
  label: string;
  selectCityPlaceholder: string;
  searchPlaceholder: string;
}

export function CitySelect({
  value,
  onChange,
  label,
  selectCityPlaceholder,
  searchPlaceholder,
}: CitySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCities = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return CITIES_TAJIKISTAN;
    return CITIES_TAJIKISTAN.filter((c) => c.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-left text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent flex items-center justify-between"
        >
          <span className={value ? "" : "text-slate-500"}>
            {value || selectCityPlaceholder}
          </span>
          <svg
            className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute z-20 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg max-h-64 overflow-hidden">
              <div className="p-2 border-b border-slate-200">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  autoFocus
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => {
                    onChange(undefined);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 ${
                    !value ? "bg-orange-50 text-orange-700" : "text-slate-700"
                  }`}
                >
                  — {selectCityPlaceholder}
                </button>
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      onChange(city);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 ${
                      value === city ? "bg-orange-50 text-orange-700" : "text-slate-700"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
