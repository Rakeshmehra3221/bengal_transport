// components/About.jsx
import React from "react";

export default function About() {
  return (
    <section id="about" className="bg-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-blue-700 mb-6">About Us</h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          Bengal Transport is a premier fleet and logistics service provider operating across India.
          With decades of experience, we specialize in contract-based goods movement, warehouse logistics,
          and real-time fleet tracking for major corporations and businesses.
        </p>
      </div>
    </section>
  );
}
