import { useEffect, useRef } from 'react';
import { 
  FaPython, FaReact, FaJs, FaDocker, FaDatabase,
   FaBrain,  FaServer, FaCloud
} from 'react-icons/fa';
import { 
  SiNextdotjs, SiTailwindcss, SiFastapi, SiMongodb, 
   SiTensorflow
} from 'react-icons/si';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: FaReact,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'Next.js', level: 90, icon: SiNextdotjs },
        { name: 'React', level: 88, icon: FaReact },
        { name: 'Tailwind CSS', level: 88, icon: SiTailwindcss },
        { name: 'JavaScript', level: 85, icon: FaJs },
      ]
    },
    {
      title: 'Backend Development',
      icon: FaServer,
      color: 'from-emerald-500 to-teal-500',
      skills: [
        { name: 'FastAPI', level: 88, icon: SiFastapi },
        { name: 'Python', level: 90, icon: FaPython },
        { name: 'MongoDB', level: 78, icon: SiMongodb },
        { name: 'SQL/NoSQL', level: 75, icon: FaDatabase },
      ]
    },
    {
      title: 'AI/ML & DevOps',
      icon: FaBrain,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'AI/ML', level: 85, icon: SiTensorflow },
        { name: 'Vector DB', level: 80, icon: FaDatabase },
        { name: 'Docker', level: 70, icon: FaDocker },
        { name: 'Azure', level: 65, icon: FaCloud },
      ]
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

      // Skills cards animation
      gsap.fromTo(skillsRef.current?.children || [],
        { opacity: 0, y: 80, rotationY: 45 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Skill bars animation
      skillCategories.forEach((category, categoryIndex) => {
        category.skills.forEach((skill, skillIndex) => {
          gsap.fromTo(`.skill-bar-${categoryIndex}-${skillIndex}`,
            { width: "0%" },
            {
              width: `${skill.level}%`,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: `.skill-card-${categoryIndex}`,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container-max">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div ref={skillsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`skill-card-${categoryIndex} card-hover bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20`}
            >
              <div className="text-center mb-8">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} mb-4`}>
                  <category.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <skill.icon className="text-slate-600 group-hover:text-indigo-600 transition-colors" size={20} />
                        <span className="text-slate-700 font-medium">{skill.name}</span>
                      </div>
                      <span className="text-slate-500 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`skill-bar-${categoryIndex}-${skillIndex} bg-gradient-to-r ${category.color} h-3 rounded-full transition-all duration-300 relative overflow-hidden`}
                        style={{ width: "0%" }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">Additional Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'React Native', 'WebSocket', 'REST APIs', 'GraphQL', 'Redis', 'PostgreSQL',
              'Kubernetes', 'CI/CD', 'Agile', 'Waterfall', 'Git', 'Linux'
            ].map((tech, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-white/80 backdrop-blur-sm text-slate-700 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;