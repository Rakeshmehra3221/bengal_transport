import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Truck, MapPin, Clock, Shield, ArrowRight, Phone } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const featuresRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 50
      });
      
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 1.1,
        x: 100
      });

      gsap.set(featuresRef.current.children, {
        opacity: 0,
        y: 30
      });

      gsap.set(overlayRef.current, {
        opacity: 0.8
      });

      // Main timeline
      const tl = gsap.timeline({
        delay: 0.2
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6")
      .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1.5,
        ease: "power3.out"
      }, "-=0.8")
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .to(featuresRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.3");

      // Parallax effect for the image
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(imageRef.current, {
            y: progress * 100,
            duration: 0.3,
            ease: "none"
          });
        }
      });

      // Floating animation for features
      gsap.to(featuresRef.current.children, {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.2,
        repeat: -1,
        yoyo: true
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Truck, text: "500+ Trucks", color: "text-blue-400" },
    { icon: MapPin, text: "Pan India", color: "text-green-400" },
    { icon: Clock, text: "24/7 Service", color: "text-yellow-400" },
    { icon: Shield, text: "Insured", color: "text-purple-400" }
  ];

  // SVG pattern for grid overlay
  const gridPattern = `data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("${gridPattern}")`
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 
                ref={titleRef}
                className="text-5xl md:text-7xl font-black text-white leading-tight"
              >
                <span className="block">BENGAL</span>
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  TRANSPORT
                </span>
              </h1>
              
              <p 
                ref={subtitleRef}
                className="text-xl md:text-2xl text-gray-300 font-light max-w-lg leading-relaxed"
              >
                Fleet Owners & Transport Contractors delivering excellence across India with reliability you can trust.
              </p>
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105">
                <span className="flex items-center justify-center gap-2">
                  Get Quote Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button className="group border-2 border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40 backdrop-blur-sm">
                <span className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Now
                </span>
              </button>
            </div>

            {/* Feature Icons */}
            <div ref={featuresRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                    <feature.icon className={`w-8 h-8 ${feature.color} mx-auto mb-2`} />
                    <p className="text-white text-sm font-medium">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Truck Image */}
          <div className="relative">
            <div 
              ref={imageRef}
              className="relative z-10"
            >
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <img 
                  src="https://auto.mahindra.com/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwa29dfc3c/images/PUP/large/PUP.png?sw=360&sh=202"
                  alt="Bengal Transport Pickup Truck"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-xl opacity-40 animate-pulse delay-700"></div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-sm">Scroll</span>
        </div>
      </div>
    </section>
  );
}