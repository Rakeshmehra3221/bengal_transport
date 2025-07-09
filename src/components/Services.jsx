// components/Services.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);
  const backgroundRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Cleanup function to prevent memory leaks
  const cleanup = useRef(null);
  
  // Enhanced animation setup with better performance
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 40 });
      gsap.set(cardsRef.current, { opacity: 0, y: 60 });
      gsap.set(statsRef.current, { opacity: 0, scale: 0.8 });
      
      // Create timeline for coordinated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          onEnter: () => setIsVisible(true),
          onLeave: () => setIsVisible(false),
          onEnterBack: () => setIsVisible(true),
          onLeaveBack: () => setIsVisible(false)
        }
      });
      
      // Enhanced title animation
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.4');
      
      // Enhanced card animations with improved stagger
      cardsRef.current.forEach((card, i) => {
        if (card) {
          tl.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          }, `-=${0.4 - i * 0.1}`);
        }
      });
      
      // Stats animation
      tl.to(statsRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }, '-=0.3');
      
      // Background animations with better performance
      const bgAnimation = gsap.to('.pattern-bg', {
        x: 30,
        y: -20,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      // Floating elements with more natural movement
      gsap.to('.float-element', {
        y: 15,
        x: 10,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.5
      });
      
      // Cleanup function
      cleanup.current = () => {
        tl.kill();
        bgAnimation.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
      
    }, sectionRef);
    
    return () => {
      ctx.revert();
      if (cleanup.current) cleanup.current();
    };
  }, []);
  
  // Enhanced hover handlers with performance optimization
  const handleCardHover = useCallback((index) => {
    setHoveredCard(index);
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, []);
  
  const handleCardLeave = useCallback((index) => {
    setHoveredCard(null);
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, []);
  
  // Enhanced services data with better icons
  const services = [
    { 
      title: "Fleet Management", 
      desc: "Advanced tracking, management, and deployment solutions for your entire vehicle fleet with real-time monitoring and analytics.", 
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
        </svg>
      ),
      color: "from-blue-500 to-blue-700"
    },
    { 
      title: "Contract Logistics", 
      desc: "Comprehensive B2B supply chain solutions with guaranteed reliability, efficiency, and end-to-end visibility.", 
      icon: (
        <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      color: "from-emerald-500 to-emerald-700"
    },
    { 
      title: "Warehousing Solutions", 
      desc: "Flexible short-term and long-term storage facilities with modern inventory management systems and security.", 
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      ),
      color: "from-purple-500 to-purple-700"
    },
    { 
      title: "Cold Chain Logistics", 
      desc: "Temperature-controlled transport for perishable goods with real-time monitoring and compliance tracking.", 
      icon: (
        <svg className="w-12 h-12 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"></path>
        </svg>
      ),
      color: "from-cyan-500 to-cyan-700"
    },
    { 
      title: "Cross-State Shipping", 
      desc: "Seamless inter state transport with compliance services, and documentation support.", 
      icon: (
        <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      color: "from-orange-500 to-orange-700"
    },
    { 
      title: "Last Mile Delivery", 
      desc: "Efficient urban distribution with route optimization, real-time tracking, and flexible delivery options.", 
      icon: (
        <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
      color: "from-red-500 to-red-700"
    }
  ];

  // Enhanced stats with animations
  const stats = [
    { value: "10+", label: "Vehicles", icon: "🚛" },
    { value: "24/7", label: "Support", icon: "🕒" },
    { value: "98%", label: "On-time Delivery", icon: "📦" },
    { value: "20+", label: "Team Members", icon: "👥" }
  ];

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="relative py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50"
    >
      {/* Enhanced background pattern */}
      <div ref={backgroundRef} className="absolute inset-0 pattern-bg">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="float-element absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-blue-400 blur-3xl"></div>
          <div className="float-element absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-emerald-300 blur-3xl"></div>
          <div className="float-element absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-purple-200 blur-3xl"></div>
          <div className="float-element absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-cyan-300 blur-3xl"></div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced header section */}
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 mb-6 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full border border-blue-200">
            Our Solutions
          </span>
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Transport <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Services</span> Excellence
          </h2>
          <p 
            ref={subtitleRef}
            className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed"
          >
            Bengal Transport provides comprehensive logistics solutions tailored to your business needs, 
            ensuring efficiency and reliability across the supply chain with cutting-edge technology.
          </p>
        </div>

        {/* Enhanced services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, idx) => (
            <div 
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:border-blue-200 transition-all duration-500 cursor-pointer"
              onMouseEnter={() => handleCardHover(idx)}
              onMouseLeave={() => handleCardLeave(idx)}
            >
              {/* Animated gradient border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                <div className="absolute inset-[1px] bg-white rounded-2xl"></div>
              </div>
              
              <div className="relative p-8 h-full">
                <div className="mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enhanced stats section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl shadow-2xl p-8 md:p-12 text-white relative overflow-hidden">
          {/* Background pattern for stats */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-24 translate-y-24"></div>
          </div>
          
          <div className="relative">
            <h3 className="text-3xl font-bold text-center mb-12 text-white">
              Trusted by Businesses Across India
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div 
                  key={idx}
                  ref={el => statsRef.current[idx] = el}
                  className="text-center group cursor-pointer"
                >
                  <div className="text-5xl md:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-blue-100 text-sm md:text-base font-medium">
                    {stat.label}
                  </div>
                  <div className="text-2xl mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;