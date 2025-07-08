// components/Contact.jsx
import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="py-16 px-6 bg-blue-50">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-blue-700 mb-6">Let's Work Together</h3>
        <p className="text-gray-700 mb-6">Need logistics support or have transport needs? Reach out today.</p>
        <a href="mailto:contact@bengaltransport.in" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
          Email Us
        </a>
      </div>
    </section>
  );
}
