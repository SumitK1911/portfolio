import  { useEffect, useRef } from 'react';
import { FaCode, FaBrain, FaMobile, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

      // Cards animation
      gsap.fromTo(cardsRef.current?.children || [],
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding bg-white">
      <div className="container-max">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Computer Science Student with expertise in AI/ML and full-stack development
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg text-slate-700 leading-relaxed">
                Completed <span className="font-semibold text-indigo-600">BSc.CSIT at Kathmandu College of Technology</span>, 
                I have hands-on experience as a Full Stack Developer intern at IT Hive Solution. I specialize in building scalable 
                applications with modern technologies including Next.js, FastAPI, React Native, and AI/ML integration.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                My expertise spans from developing AI-powered applications with LLMs and vector databases 
                to creating comprehensive full-stack solutions. I'm passionate about leveraging artificial 
                intelligence to solve real-world problems and building user-focused, innovative applications.
              </p>
            </div>

            {/* Education & Experience Timeline */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FaGraduationCap className="text-indigo-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">BSc.CSIT Student</h3>
                  <p className="text-slate-600">Kathmandu College of Technology</p>
                  <p className="text-sm text-slate-500">Sep 2020 – Jun 2025</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <FaBriefcase className="text-emerald-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Full Stack Developer Intern</h3>
                  <p className="text-slate-600">IT Hive Solution PVT LTD</p>
                  <p className="text-sm text-slate-500">Dec 2024 – Jun 2025</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {['Next.js', 'FastAPI', 'React Native', 'AI/ML', 'MongoDB', 'Vector DB', 'Python', 'Docker'].map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div ref={cardsRef} className="grid gap-6">
            <div className="card-hover bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border border-blue-200/50">
              <FaCode className="text-indigo-600 mb-4" size={40} />
              <h3 className="text-xl font-bold text-slate-800 mb-3">Full-Stack Development</h3>
              <p className="text-slate-600 leading-relaxed">
                Developing scalable applications with Next.js, FastAPI, React Native, and modern deployment practices.
              </p>
            </div>

            <div className="card-hover bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl border border-purple-200/50">
              <FaBrain className="text-purple-600 mb-4" size={40} />
              <h3 className="text-xl font-bold text-slate-800 mb-3">AI/ML Integration</h3>
              <p className="text-slate-600 leading-relaxed">
                Implementing LLMs, vector databases, and machine learning models for intelligent applications.
              </p>
            </div>

            <div className="card-hover bg-gradient-to-br from-emerald-50 to-teal-100 p-8 rounded-2xl border border-emerald-200/50">
              <FaMobile className="text-emerald-600 mb-4" size={40} />
              <h3 className="text-xl font-bold text-slate-800 mb-3">Cross-Platform Solutions</h3>
              <p className="text-slate-600 leading-relaxed">
                Creating web and mobile applications with React Native and responsive design principles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;