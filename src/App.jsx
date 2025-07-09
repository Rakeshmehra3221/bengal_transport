import React from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Hero />
      <Services />
      <About />
      <Contact />
      <Analytics />
    </div>
  );
}