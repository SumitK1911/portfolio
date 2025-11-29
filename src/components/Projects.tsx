import  { useEffect, useRef } from 'react';
import { FaExternalLinkAlt, FaGithub, FaPlay } from 'react-icons/fa';
import { SiNextdotjs, SiFastapi, SiReact, SiMongodb, SiPython } from 'react-icons/si';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'Online Test & Learning Platform',
      description: 'A comprehensive assessment platform with Next.js web interface and React Native mobile app featuring AI-powered question generation, proctoring, and payment integration.',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: [
        { name: 'Next.js', icon: SiNextdotjs, color: 'text-black' },
        { name: 'FastAPI', icon: SiFastapi, color: 'text-green-600' },
        { name: 'React Native', icon: SiReact, color: 'text-blue-500' },
        { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
      ],
      liveUrl: 'https://mocktestprivatefrontend.onrender.com/',
      githubUrl: 'https://github.com/SumitK1911/mocktestfrontend',
      featured: true,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'AI-Voice Assistance Retail Shop',
      description: 'An innovative voice-controlled retail application using automatic speech recognition, vector similarity search, and fine-tuned CLIP model with WebSocket for real-time interactions.',
      image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: [
        { name: 'Next.js', icon: SiNextdotjs, color: 'text-black' },
        { name: 'FastAPI', icon: SiFastapi, color: 'text-green-600' },
        { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
        { name: 'AI/ML', icon: SiPython, color: 'text-yellow-500' },
      ],
      liveUrl: '#',
      githubUrl: 'https://github.com/SumitK1911/mocktestfrontend',
      featured: true,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Intelligent Chatbot System',
      description: 'A sophisticated NLP-powered chatbot using tokenization, stemming with NLTK, and intent classification through bag-of-words and one-hot encoding techniques.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: [
        { name: 'Python', icon: SiPython, color: 'text-blue-500' },
        { name: 'NLP', icon: SiPython, color: 'text-green-600' },
        { name: 'ML', icon: SiPython, color: 'text-red-500' },
      ],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'E-commerce Website',
      description: 'Developed highly interactive and responsive web applications using Next.js with Sanity.io backend, Redux for state management, and RESTful API integration.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: [
        { name: 'Next.js', icon: SiNextdotjs, color: 'text-black' },
        { name: 'React', icon: SiReact, color: 'text-blue-500' },
      ],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      gradient: 'from-orange-500 to-red-600'
    }
  ];

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

      // Projects animation
      gsap.fromTo(projectsRef.current?.children || [],
        { opacity: 0, y: 100, rotationX: 45 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: projectsRef.current,
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
    <section ref={sectionRef} id="projects" className="section-padding bg-white">
      <div className="container-max">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for development
          </p>
        </div>

        <div ref={projectsRef} className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative card-hover bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200/50 ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}></div>
                
                {/* Overlay Buttons */}
                <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.liveUrl}
                    className="flex items-center space-x-2 bg-white text-slate-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <FaPlay size={16} />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center space-x-2 bg-slate-800 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <FaGithub size={16} />
                    <span>Code</span>
                  </a>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              
              {/* Project Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="flex items-center space-x-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-200 hover:border-indigo-300 transition-colors"
                    >
                      <tech.icon className={tech.color} size={16} />
                      <span className="text-slate-700 text-sm font-medium">{tech.name}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <a
                    href={project.liveUrl}
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors group/link"
                  >
                    <FaExternalLinkAlt size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center space-x-2 text-slate-600 hover:text-slate-700 font-semibold transition-colors group/link"
                  >
                    <FaGithub size={16} className="group-hover/link:rotate-12 transition-transform" />
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;