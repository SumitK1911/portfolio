import  { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { gsap } from 'gsap';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo('.header-logo', 
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 1, delay: 0.2 }
    );
    gsap.fromTo('.header-nav', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.4, stagger: 0.1 }
    );
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-xl border-b border-slate-200/50' 
        : 'bg-transparent'
    }`}>
      <nav className="container-max">
        <div className="flex justify-between items-center py-4">
          <div className="header-logo text-2xl font-bold text-gradient">
            Sumit Kharbuja
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`header-nav font-medium transition-all duration-300 hover:text-indigo-600 relative group ${
                  isScrolled ? 'text-slate-700' : 'text-slate-800'
                }`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl border-b border-slate-200">
            <div className="px-4 py-6 space-y-4">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-slate-700 hover:text-indigo-600 transition-colors duration-200 font-medium py-2"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;