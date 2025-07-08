// components/Services.jsx
import React from "react";

const services = [
  { title: "Fleet Management", desc: "Track, manage, and deploy vehicles efficiently." },
  { title: "Contract Logistics", desc: "Reliable transport solutions for B2B supply chains." },
  { title: "Warehousing", desc: "Short-term and long-term storage facilities." },
];

export default function Services() {
  return (
    <section id="services" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-blue-700 mb-10">Our Services</h3>
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((s, idx) => (
            <div key={idx} className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold text-blue-600">{s.title}</h4>
              <p className="mt-3 text-gray-700">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
