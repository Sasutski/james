"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import BlockGeneratorWrapper from '@/components/BlockGeneratorWrapper';

export default function Home() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Sample projects data with categories
  const projects = [
    {
      id: 1,
      title: "Project 1",
      description: "A responsive e-commerce website built with React and Next.js, featuring a headless CMS integration.",
      link: "/project-1",
      categories: ['frontend', 'fullstack']
    },
    {
      id: 2,
      title: "Project 2",
      description: "A RESTful API service built with Node.js and Express, featuring authentication and database integration.",
      link: "/project-2",
      categories: ['backend']
    },
    {
      id: 3,
      title: "UI Component Library",
      description: "A collection of reusable React components with Storybook documentation and comprehensive testing.",
      link: "/project-3",
      categories: ['frontend', 'components']
    },
    {
      id: 4,
      title: "Task Management App",
      description: "Full-stack application with React frontend and Node.js backend, implementing real-time updates with Socket.io.",
      link: "/project-4",
      categories: ['fullstack', 'software']
    }
  ];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.categories.includes(activeFilter));

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section - Full Screen Width starting from the top */}
      <section className="w-full min-h-screen flex flex-col justify-center relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16 sm:pb-20 flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
          <div className="flex-1 lg:flex-none lg:w-2/5">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
              Hi, I'm James.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
                Developer
              </span>
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mb-6 sm:mb-8 text-gray-700 dark:text-gray-300">
              I build exceptional digital experiences with modern web technologies.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a 
                href="#projects" 
                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center text-sm sm:text-base"
              >
                View Projects
                <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="#contact" 
                className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors text-sm sm:text-base"
              >
                Contact Me
              </a>
            </div>
          </div>
          {/* P5.js Block Generator - Fixed for tablet screens */}
          <div className="flex-1 lg:flex-none lg:w-3/5 min-h-[300px] w-full max-w-full overflow-hidden">
            <div className="w-full h-full relative">
              <BlockGeneratorWrapper />
            </div>
            <div className="mt-0 text-sm text-gray-600 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
              <p className="font-medium text-gray-700 dark:text-gray-300">Interactive 3D Visualization</p>
              <p>
                This dynamic block pattern is rendered with P5.js and demonstrates my expertise in creative coding and interactive web animations. 
                <span className="italic"> Click anywhere on the visual to see it respond!</span>
              </p>
            </div>
          </div>
        </div>
      
        {/* Scroll down indicator - visual cue only, no automatic scrolling */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 animate-pulse">
          <p className="mb-2">Scroll down</p>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 5v14"></path>
            <path d="M19 12l-7 7-7-7"></path>
          </svg>
        </div>
      </section>
      
      {/* Fixed header that overlays the hero section */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex justify-between items-center">
            <div className="font-bold text-xl">James</div>
            <div className="flex gap-4 sm:gap-6 text-sm sm:text-base">
              <Link href="#about" className="hover:underline">About</Link>
              <Link href="#projects" className="hover:underline">Projects</Link>
              <Link href="#contact" className="hover:underline">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* About Me Section */}
        <section id="about" className="py-12 sm:py-16 md:py-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 relative">
            About Me
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-blue-500"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                I'm James, a passionate full-stack developer with over 5 years of experience building exceptional digital experiences. 
                With a strong background in both frontend and backend development, I specialize in creating performant, accessible, 
                and visually appealing applications that solve real-world problems.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                My approach combines technical expertise with a deep understanding of user needs, resulting in applications 
                that are not only technically sound but also intuitive and enjoyable to use. When I'm not coding, I enjoy 
                exploring new technologies, contributing to open-source projects, and mentoring junior developers.
              </p>
            </div>
            
            <div className="md:col-span-1">
              <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Express', 'MongoDB', 'SQL', 'GraphQL'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">DevOps</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Docker', 'CI/CD', 'AWS', 'Git', 'Testing'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsSectionRef} className="py-12 sm:py-16 md:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 relative">
            Projects
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-blue-500"></span>
          </h2>
          
          {/* Project Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            <button 
              onClick={() => setActiveFilter('all')} 
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                activeFilter === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              All Projects
            </button>
            <button 
              onClick={() => setActiveFilter('software')} 
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                activeFilter === 'software' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Software
            </button>
            <button 
              onClick={() => setActiveFilter('components')} 
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                activeFilter === 'components' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Frontend Components
            </button>
            <button 
              onClick={() => setActiveFilter('frontend')} 
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                activeFilter === 'frontend' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Frontend
            </button>
            <button 
              onClick={() => setActiveFilter('backend')} 
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                activeFilter === 'backend' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Backend
            </button>
            <button 
              onClick={() => setActiveFilter('fullstack')} 
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                activeFilter === 'fullstack' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Fullstack
            </button>
          </div>
          
          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
                <div 
                  key={project.id} 
                  className="p-4 sm:p-6 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white dark:bg-gray-900 flex flex-col"
                >
                  {/* Decorative color bar at top of card based on category */}
                  <div className={`h-1 w-full rounded-t-lg mb-3 sm:mb-4 ${
                    project.categories.includes('frontend') 
                      ? 'bg-blue-500' 
                      : project.categories.includes('backend')
                        ? 'bg-green-500'
                        : project.categories.includes('fullstack')
                          ? 'bg-red-500'
                          : 'bg-blue-500'
                  }`}></div>
                  
                  <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.categories.map(category => (
                      <span 
                        key={category} 
                        className={`px-2 py-1 text-xs rounded-full 
                          ${category === 'frontend' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500' :
                           category === 'backend' ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-500' :
                           category === 'fullstack' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500' :
                           'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={project.link} 
                    className="inline-flex items-center text-blue-500 hover:underline group transition-all"
                  >
                    Learn more
                    <svg 
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-10 text-gray-500">
                No projects found matching the selected filter.
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 sm:py-16 md:py-20 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 relative">
            Get In Touch
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-blue-500"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6">
                I'm currently open to new opportunities and collaborations. If you have a project in mind or just want to say hello, feel free to reach out!
              </p>
              
              <div className="space-y-3 sm:space-y-5">
                <div className="flex items-center p-3 sm:p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mr-4 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Primary Email</p>
                    <a href="mailto:sasutskitan@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">sasutskitan@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-center p-3 sm:p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mr-4 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">School Email</p>
                    <a href="mailto:tan_yu_kai_james@s2022.ssts.edu.sg" className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm">tan_yu_kai_james@s2022.ssts.edu.sg</a>
                  </div>
                </div>
                
                <div className="flex items-center p-3 sm:p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mr-4 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">LinkedIn</p>
                    <a href="https://linkedin.com/in/tanyukaijames" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">linkedin.com/in/tanyukaijames</a>
                  </div>
                </div>
                
                <div className="flex items-center p-3 sm:p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mr-4 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">GitHub</p>
                    <a href="https://github.com/sasutski" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">github.com/sasutski</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 shadow-md border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Send a Message</h3>
              <form className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-sm sm:text-base"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors text-sm sm:text-base"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

