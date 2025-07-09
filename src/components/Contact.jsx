import React, { useRef, useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Youtube, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });
  
  const [errors, setErrors] = useState({});
  
  // Animation setup
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = [titleRef, contactInfoRef, formRef, mapRef];
    animatedElements.forEach(ref => {
      if (ref.current) {
        ref.current.style.opacity = '0';
        ref.current.style.transform = 'translateY(40px)';
        ref.current.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(ref.current);
      }
    });

    // Floating animation
    const floatingElements = document.querySelectorAll('.float-element');
    floatingElements.forEach((element, index) => {
      const animation = element.animate([
        { transform: 'translateY(0px)' },
        { transform: 'translateY(-15px)' },
        { transform: 'translateY(0px)' }
      ], {
        duration: 3000 + (index * 500),
        iterations: Infinity,
        easing: 'ease-in-out'
      });
      
      element.style.animation = animation;
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Handle form submission with Formspree
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted!', formData); // Debug log
    
    if (!validateForm()) {
      console.log('Validation failed', errors); // Debug log
      return;
    }
    
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      error: null
    });
    
    try {
      // Prepare form data for Formspree
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('service', formData.service);
      formDataToSend.append('message', formData.message);
      
      console.log('Sending to Formspree...'); // Debug log
      
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xqabvjpr', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      console.log('Response status:', response.status); // Debug log
      
      if (response.ok) {
        console.log('Form submitted successfully!'); // Debug log
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
        
        setFormStatus({
          isSubmitting: false,
          isSubmitted: true,
          error: null
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus(prev => ({
            ...prev,
            isSubmitted: false
          }));
        }, 5000);
        
      } else {
        const data = await response.json();
        console.error('Form submission failed:', data); // Debug log
        throw new Error(data.error || 'Form submission failed');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Failed to send message. Please try again or contact us directly.'
      });
    }
  };
  
  const services = [
    { value: 'fleet', label: 'Fleet Management' },
    { value: 'contract', label: 'Contract Logistics' },
    { value: 'warehousing', label: 'Warehousing Solutions' },
    { value: 'cold', label: 'Cold Chain Logistics' },
    { value: 'cross', label: 'Cross-State Shipping' },
    { value: 'last', label: 'Last Mile Delivery' }
  ];
  
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Address',
      content: 'transportbengal1@gmail.com',
      link: 'mailto:transportbengal1@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone Number',
      content: '+91 92393 80072',
      link: 'tel:+919239380072'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      content: 'Asansol, West Bengal, India',
      link: null
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Monday - Saturday: 8:00 AM - 8:00 PM\nSunday: 10:00 AM - 4:00 PM',
      link: null
    }
  ];
  
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];
  
  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-blue-50 to-gray-50"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="float-element absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-blue-200 blur-3xl opacity-20"></div>
        <div className="float-element absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-blue-300 blur-3xl opacity-20"></div>
        <div className="float-element absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-blue-200 blur-3xl opacity-20"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
            Get In Touch
          </span>
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Let's <span className="text-blue-600">Work Together</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Need logistics support or have transport requirements? Reach out today for personalized solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div 
            ref={contactInfoRef}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                    {item.link ? (
                      <a 
                        href={item.link} 
                        className="mt-1 text-blue-600 hover:text-blue-800 transition-colors break-all"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="mt-1 text-gray-600 whitespace-pre-line">
                        {item.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-600 transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-blue-600 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div 
            ref={formRef}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h3>
            
            {/* Success Message */}
            {formStatus.isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <p className="text-green-800">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}
            
            {/* Error Message */}
            {formStatus.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                <p className="text-red-800">{formStatus.error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your name"
                  disabled={formStatus.isSubmitting}
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                  disabled={formStatus.isSubmitting}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                  disabled={formStatus.isSubmitting}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Interested In
                </label>
                <select 
                  id="service" 
                  name="service" 
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  disabled={formStatus.isSubmitting}
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message *
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us about your transport needs"
                  disabled={formStatus.isSubmitting}
                  required
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>
              
              <div>
                <button 
                  type="submit" 
                  disabled={formStatus.isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {formStatus.isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div 
          className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
        <div className="h-96 w-full relative">
          <iframe
            title="Bengal Transport Location"
            src="https://www.google.com/maps?q=23.681230888904494,86.98885975192134&z=15&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      </div>
    </section>
  );
}