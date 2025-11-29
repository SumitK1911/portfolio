import React, { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaGithub, FaLinkedin } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);

  // Rate limiting - max 3 submissions per 10 minutes
  const checkRateLimit = () => {
    const submissions = JSON.parse(localStorage.getItem('emailSubmissions') || '[]');
    const now = Date.now();
    const tenMinutesAgo = now - 10 * 60 * 1000;
    
    // Filter submissions from last 10 minutes
    const recentSubmissions = submissions.filter((time: number) => time > tenMinutesAgo);
    
    if (recentSubmissions.length >= 3) {
      setRateLimitExceeded(true);
      return false;
    }
    
    // Add current submission
    recentSubmissions.push(now);
    localStorage.setItem('emailSubmissions', JSON.stringify(recentSubmissions));
    return true;
  };

  // Input validation and sanitization
  const validateAndSanitizeInput = (data: typeof formData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name.trim() || data.name.length < 2 || data.name.length > 50) {
      throw new Error('Name must be between 2 and 50 characters');
    }
    
    if (!emailRegex.test(data.email) || data.email.length > 100) {
      throw new Error('Please enter a valid email address');
    }
    
    if (!data.message.trim() || data.message.length < 10 || data.message.length > 1000) {
      throw new Error('Message must be between 10 and 1000 characters');
    }
    
    // Sanitize inputs
    return {
      name: data.name.trim().replace(/[<>]/g, ''),
      email: data.email.trim().toLowerCase(),
      message: data.message.trim().replace(/[<>]/g, '')
    };
  };

  useEffect(() => {
    // GSAP Animations
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current?.children || [],
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Form animation
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limiting
    if (!checkRateLimit()) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setRateLimitExceeded(false);
    
    try {
      // 1. Validate inputs
      const sanitizedData = validateAndSanitizeInput(formData);
      
      // 2. Get Env Variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Debugging: Check console to see if keys are loading (Remove in production if desired)
      if (!serviceId || !templateId || !publicKey) {
        console.error("Configuration Error: Missing Environment Variables.");
        console.log({ serviceId, templateId, publicKey }); 
        throw new Error('Missing EmailJS configuration');
      }
      
      // 3. Prepare Template Params (Matching your screenshot)
      const templateParams = {
        from_name: sanitizedData.name,
        from_email: sanitizedData.email,
        message: sanitizedData.message,
        to_name: 'Sumit Kharbuja',
        reply_to: sanitizedData.email, 
      };

      // 4. Send Email (Pass publicKey directly as 4th argument)
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey 
      );
      
      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send email with status: ' + result.status);
      }

    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'sumit.kharbuja@gmail.com',
      href: 'mailto:sumit.kharbuja@gmail.com',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      value: '+977 9861814839',
      href: 'tel:+9779861814839',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: 'Kathmandu, Nepal',
      href: '#',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className="section-padding bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="container-max">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            I'm always open to discussing new opportunities and interesting projects
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20 group"
                >
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${info.color} group-hover:scale-110 transition-transform`}>
                    <info.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{info.title}</h3>
                    <p className="text-slate-600 group-hover:text-indigo-600 transition-colors">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Connect With Me</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/sumitkharbuja"
                  className="p-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/sumitkharbuja"
                  className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={50}
                  required
                  className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={100}
                  required
                  className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={1000}
                  required
                  rows={6}
                  className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none bg-white/50 backdrop-blur-sm"
                  placeholder="Tell me about your project or just say hello..."
                />
                <div className="text-right text-sm text-slate-400 mt-1">
                  {formData.message.length}/1000
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || rateLimitExceeded}
                className={`w-full px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                  submitStatus === 'success' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                    : submitStatus === 'error'
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                }`}
              >
                {rateLimitExceeded ? (
                  <>
                    <span>⏱️ Rate Limited</span>
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <span>✓ Message Sent!</span>
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <span>✗ Failed to Send</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <p className="text-green-600 text-center mt-4 font-medium">
                  Thank you! Your message has been sent successfully. I'll get back to you soon!
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 text-center mt-4 font-medium text-sm">
                  {rateLimitExceeded 
                    ? 'Too many submissions. Please wait 10 minutes before trying again.'
                    : 'Sorry, there was an error sending your message. Please try again or contact me directly at sumit.kharbuja@gmail.com'
                  }
                </p>
              )}
              
              {/* Security Notice */}
              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-500 text-center">
                  🔒 Your message is sent securely. We don't store your personal information.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;