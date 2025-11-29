import { useEffect, useRef } from 'react';
import { HiArrowDown } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  // This URL is correct and forces a download, provided sharing is public.
  const CV_DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1lUIETvOnxeeHfyVuB6gv5gcR1sWSn9Lz";

  const handleDownload = () => {
    // 🛑 SOLUTION: We use window.open to force a navigation event, bypassing the CORS/Fetch block.
    // This will open a new tab/window which immediately prompts the download.
    window.open(CV_DOWNLOAD_URL, '_blank');
  };

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(buttonsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(socialRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
      "-=0.4"
    );

    gsap.to(heroRef.current, {
      y: -10,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div ref={heroRef} className="relative z-10 container-max text-center">
        <div className="max-w-4xl mx-auto">
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
            Hello, I'm{' '}
            <span className="text-gradient block md:inline">
              Sumit Kharbuja
            </span>
          </h1>
          
          <p ref={subtitleRef} className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Computer Science Student & Full Stack Developer specializing in 
            <span className="text-gradient-blue font-semibold"> AI/ML</span>, creating innovative solutions with modern technologies
          </p>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-primary group"
            >
              <span className="flex items-center gap-2">
                View My Work
                <HiArrowDown className="group-hover:translate-y-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-secondary"
            >
              Get In Touch
            </button>
            
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <FaDownload />
              Download CV
            </button>
          </div>

          <div ref={socialRef} className="flex justify-center space-x-6">
            {[
              { icon: FaGithub, href: "https://github.com/sumitkharbuja", color: "hover:text-gray-800" },
              { icon: FaLinkedin, href: "https://linkedin.com/in/sumitkharbuja", color: "hover:text-blue-600" },
              { icon: FaEnvelope, href: "mailto:sumit.kharbuja@gmail.com", color: "hover:text-red-500" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${social.color} text-slate-600`}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <HiArrowDown size={32} className="text-slate-400 hover:text-indigo-600 transition-colors" />
        </button>
      </div>
    </section>
  );
};

export default Hero;