import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20"></div>
      </div>

      <div className="relative z-10 container-max section-padding">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold text-gradient mb-4">Sumit Kharbuja</h3>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
              Computer Science Student & Full Stack Developer specializing in AI/ML solutions 
              and modern web technologies. Passionate about creating innovative digital experiences.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaGithub, href: "https://github.com/sumitkharbuja", color: "hover:text-gray-300" },
                { icon: FaLinkedin, href: "https://linkedin.com/in/sumitkharbuja", color: "hover:text-blue-400" },
                { icon: FaEnvelope, href: "mailto:sumit.kharbuja@gmail.com", color: "hover:text-red-400" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`p-3 bg-white/10 backdrop-blur-sm rounded-xl ${social.color} transition-all duration-300 transform hover:scale-110 hover:bg-white/20`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-2 transform inline-block"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Services</h4>
            <ul className="space-y-3 text-slate-300">
              <li>Full-Stack Development</li>
              <li>AI/ML Integration</li>
              <li>Mobile App Development</li>
              <li>Web Application</li>
              <li>API Development</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 mb-4 md:mb-0">
              <p className="flex items-center space-x-2">
                <span>Made with</span>
                <FaHeart className="text-red-500 animate-pulse" size={16} />
                <span>by Sumit Kharbuja</span>
              </p>
              <p className="mt-2 text-sm">© 2025 Sumit Kharbuja. All rights reserved.</p>
            </div>
            
            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
            >
              <FaArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;