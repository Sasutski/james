"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BlockGeneratorWrapper from '@/components/BlockGeneratorWrapper';
import { Github, Linkedin, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useInView } from "framer-motion";

export default function Home() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  // Add state for project preview
  const [previewProject, setPreviewProject] = useState<number | null>(null);
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.6
      }
    }
  };
  
  // Custom hook for section animations
  function useScrollAnimation(threshold = 0.1) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: threshold });
    
    return [ref, isInView];
  }
  
  // Sample projects data with categories
  const projects = [
    {
      id: 1,
      title: "NOX-OS",
      description: "A lightweight console operating system built with Assembly and C, designed to showcase low-level programming skills.",
      link: null,
      githubUrl: "https://github.com/sasutski/nox-os", // Add GitHub URL if available
      demoUrl: null, // Set to null if not available
      categories: ['software'],
      fullDescription: "NOX-OS is a custom-built lightweight operating system that demonstrates core OS concepts and low-level programming techniques. Built from the ground up using Assembly and C, this project showcases my ability to work with hardware interfaces, memory management, and system architecture. The OS features a minimal shell, custom bootloader, and basic device drivers - all designed to provide a foundational understanding of how modern operating systems function.",
      image: "/nox-os-preview.jpg", // You'll need to add this image or remove if not available
      technologies: ["Assembly", "C", "x86 Architecture", "BIOS Interface", "OS Development"],
      status: "development" // Add status: "live", "development", "discontinued", or "not-started"
    },
    {
      id: 2,
      title: "Jobhive",
      description: "A AI-Powered job application and posting platform using solely python to showcase my backend skills.",
      githubUrl: "https://github.com/sasutski/jobhive", // Add GitHub URL if available
      demoUrl: null, // Set to null if not available
      link: null,
      fullDescription: "Jobhive is a job application and posting platform that leverages AI to enhance the job search experience. Built entirely in Python, this project showcases my backend development skills, including database management, API design, and server-side logic. The platform allows users to create job postings, apply for jobs, and receive AI-generated recommendations based on their profiles and preferences. With a focus on performance and scalability, Jobhive is designed to handle a large number of users and job listings efficiently.",
      technologies: ["Python", "Gemini API", "Firebase", "rich module"],
      categories: ['backend'],
      status: "discontinued"
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
          <motion.div 
            className="flex-1 lg:flex-none lg:w-2/5"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hi, I'm James.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
                A Developer
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl max-w-2xl mb-6 sm:mb-8 text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              I build exceptional digital experiences with modern web technologies.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
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
            </motion.div>
          </motion.div>
          
          {/* P5.js Block Generator - Fixed for tablet screens */}
          <motion.div 
            className="flex-1 lg:flex-none lg:w-3/5 min-h-[300px] w-full max-w-full overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="w-full h-full relative">
              <BlockGeneratorWrapper />
            </div>
            <motion.div 
              className="mt-0 text-sm text-gray-600 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <p className="font-medium text-gray-700 dark:text-gray-300">Interactive 3D Visualization</p>
              <p>
                This dynamic block pattern is rendered with P5.js and demonstrates my expertise in creative coding and interactive web animations. 
                <span className="italic"> Click anywhere on the visual to see it respond!</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      
        {/* Animate scroll down indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="mb-2">Scroll down</p>
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path d="M12 5v14"></path>
            <path d="M19 12l-7 7-7-7"></path>
          </motion.svg>
        </motion.div>
      </section>
      
      {/* Fixed header that overlays the hero section */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex justify-between items-center">
            <motion.div 
              className="font-bold text-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              James
            </motion.div>
            <div className="flex gap-4 sm:gap-6 text-sm sm:text-base">
              <motion.div whileHover={{ y: -2 }}>
                <Link href="#about" className="hover:underline">About</Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <Link href="#projects" className="hover:underline">Projects</Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <Link href="#contact" className="hover:underline">Contact</Link>
              </motion.div>
            </div>
          </nav>
        </div>
      </motion.header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* About Me Section */}
        <section id="about" className="py-12 sm:py-16 md:py-20">
          {(() => {
            const [aboutRef, aboutInView] = useScrollAnimation();
            return (
              <motion.div
                ref={aboutRef}
                initial="hidden"
                animate={aboutInView ? "visible" : "hidden"}
                variants={fadeInUp}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 relative">
                  About Me
                  <motion.span 
                    className="absolute bottom-0 left-0 w-16 h-1 bg-blue-500"
                    initial={{ width: 0 }}
                    animate={aboutInView ? { width: 64 } : { width: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  ></motion.span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <motion.div 
                    className="md:col-span-2"
                    variants={fadeInUp}
                  >
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
                  </motion.div>
                  
                  <motion.div 
                    className="md:col-span-1"
                    variants={staggerContainer}
                  >
                    <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
                    <div className="space-y-4">
                      <motion.div variants={staggerItem}>
                        <h4 className="font-medium mb-2">Frontend</h4>
                        <div className="flex flex-wrap gap-2">
                          {['React', 'TypeScript', 'Next.js', 'Tailwind CSS','p5.js'].map((skill, i) => (
                            <motion.span 
                              key={skill} 
                              variants={staggerItem}
                              className="px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-sm rounded-full"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                      <motion.div variants={staggerItem}>
                        <h4 className="font-medium mb-2">Backend</h4>
                        <div className="flex flex-wrap gap-2">
                          {['SQL','python','javascript'].map((skill, i) => (
                            <motion.span 
                              key={skill} 
                              variants={staggerItem}
                              className="px-3 py-1 bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-sm rounded-full"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                      <motion.div variants={staggerItem}>
                        <h4 className="font-medium mb-2">DevOps</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Docker','Git'].map((skill, i) => (
                            <motion.span 
                              key={skill} 
                              variants={staggerItem}
                              className="px-3 py-1 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-sm rounded-full"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })()}
        </section>

        <section id="projects" ref={projectsSectionRef} className="py-12 sm:py-16 md:py-20">
          {(() => {
            const [projectsRef, projectsInView] = useScrollAnimation();
            return (
              <motion.div
                ref={projectsRef}
                initial="hidden"
                animate={projectsInView ? "visible" : "hidden"}
                variants={fadeInUp}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 relative">
                  Projects
                  <motion.span 
                    className="absolute bottom-0 left-0 w-16 h-1 bg-blue-500"
                    initial={{ width: 0 }}
                    animate={projectsInView ? { width: 64 } : { width: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  ></motion.span>
                </h2>
                
                {/* Project Filters */}
                <motion.div 
                  className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8"
                  variants={staggerContainer}
                >
                  {["all", "software", "frontend", "backend", "fullstack"].map((filter) => (
                    <motion.button 
                      key={filter}
                      onClick={() => setActiveFilter(filter)} 
                      className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                        activeFilter === filter 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                      }`}
                      variants={staggerItem}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)} Projects
                    </motion.button>
                  ))}
                </motion.div>
                
                {/* Project Grid */}
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
                  variants={staggerContainer}
                >
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map(project => (
                      <motion.div 
                        key={project.id} 
                        className="p-4 sm:p-6 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white dark:bg-gray-900 flex flex-col"
                        variants={staggerItem}
                        whileHover={{ y: -5 }}
                      >
                        {/* Decorative color bar at top of card based on category */}
                        <div className={`h-1 w-full rounded-t-lg mb-3 sm:mb-4 ${
                          project.categories.includes('software') 
                            ? 'bg-red-500' 
                            : project.categories.includes('frontend') 
                              ? 'bg-blue-500' 
                              : project.categories.includes('backend')
                                ? 'bg-green-500'
                                : project.categories.includes('fullstack')
                                  ? 'bg-purple-500'
                                  : 'bg-blue-500'
                        }`}></div>
                        
                        <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1">
                          {project.description}
                        </p>
                        
                        <motion.div 
                          className="flex flex-wrap gap-2 mb-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {project.categories.map(category => (
                            <span 
                              key={category} 
                              className={`px-2 py-1 text-xs rounded-full 
                                ${category === 'frontend' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500' :
                                 category === 'backend' ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-500' :
                                 category === 'fullstack' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-500' :
                                 category === 'software' ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-500' :
                                 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                            >
                              {category}
                            </span>
                          ))}
                        </motion.div>
                        
                        <motion.button 
                          onClick={() => setPreviewProject(project.id)}
                          className="inline-flex items-center text-blue-500 hover:underline group transition-all cursor-pointer"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Preview project
                          <motion.svg 
                            className="w-4 h-4 ml-1" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <path 
                              fillRule="evenodd" 
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                              clipRule="evenodd" 
                            />
                          </motion.svg>
                        </motion.button>
                        
                        {/* Add status indicator */}
                        <div className="flex justify-end mt-3">
                          <div className="flex items-center rounded-full px-3 py-1 text-xs font-medium" 
                            style={{ 
                              backgroundColor: project.status === 'live' ? 'rgba(16, 185, 129, 0.1)' : 
                                           project.status === 'development' ? 'rgba(245, 158, 11, 0.1)' :
                                           project.status === 'discontinued' ? 'rgba(239, 68, 68, 0.1)' : 
                                           'rgba(107, 114, 128, 0.1)',
                              color: project.status === 'live' ? 'rgb(16, 185, 129)' : 
                                     project.status === 'development' ? 'rgb(245, 158, 11)' :
                                     project.status === 'discontinued' ? 'rgb(239, 68, 68)' : 
                                     'rgb(107, 114, 128)'
                            }}
                          >
                            <motion.span 
                              className="relative flex h-2 w-2 mr-2"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                project.status === 'live' ? 'bg-green-500' : 
                                project.status === 'development' ? 'bg-yellow-500' :
                                project.status === 'discontinued' ? 'bg-red-500' : 
                                'bg-gray-500'
                              }`}></span>
                              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                                project.status === 'live' ? 'bg-green-500' : 
                                project.status === 'development' ? 'bg-yellow-500' :
                                project.status === 'discontinued' ? 'bg-red-500' : 
                                'bg-gray-500'
                              }`}></span>
                            </motion.span>
                            {project.status === 'live' ? 'Live' : 
                             project.status === 'development' ? 'In Development' :
                             project.status === 'discontinued' ? 'Discontinued' : 
                             'Not Started'}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-10 text-gray-500">
                      No projects found matching the selected filter.
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })()}
        </section>

        {/* Project Preview Modal */}
        {previewProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div 
              className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl mx-auto overflow-hidden animate-slideIn"
              style={{
                animation: 'slideInFromBottom 0.3s ease-out forwards',
              }}
            >
              {projects.filter(p => p.id === previewProject).map(project => (
                <div key={project.id} className="relative">
                  {/* Close button */}
                  <button 
                    onClick={() => setPreviewProject(null)}
                    className="absolute top-4 right-4 p-1 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 z-10"
                    aria-label="Close preview"
                  >
                    <X size={20} />
                  </button>
                  
                  {/* Preview content */}
                  <div className="h-48 bg-gray-200 dark:bg-gray-800 relative">
                    {project.image ? (
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <span>No preview image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.categories.map(category => (
                        <span 
                          key={category} 
                          className={`px-2 py-1 text-xs rounded-full 
                            ${category === 'frontend' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500' :
                             category === 'backend' ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-500' :
                             category === 'fullstack' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-500' :
                             category === 'software' ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-500' :
                             'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {project.fullDescription || project.description}
                    </p>
                    
                    {project.technologies && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map(tech => (
                            <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end mt-4 gap-3">
                      <Link 
                        href={project.link || "#"}
                        className={`px-4 py-2 rounded-md transition-colors flex items-center gap-1 text-sm font-medium ${
                          project.link 
                            ? "bg-blue-600 hover:bg-blue-700 text-white" 
                            : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        }`}
                        onClick={e => !project.link && e.preventDefault()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        View Project
                      </Link>
                      
                      <Link 
                        href={project.githubUrl || "#"}
                        className={`px-4 py-2 rounded-md transition-colors flex items-center gap-1 text-sm font-medium ${
                          project.githubUrl 
                            ? "bg-gray-800 hover:bg-gray-900 text-white dark:bg-gray-700 dark:hover:bg-gray-600" 
                            : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => !project.githubUrl && e.preventDefault()}
                      >
                        <Github size={16} />
                        GitHub
                      </Link>
                      
                      <Link 
                        href={project.demoUrl || "#"}
                        className={`px-4 py-2 rounded-md transition-colors flex items-center gap-1 text-sm font-medium ${
                          project.demoUrl 
                            ? "bg-green-600 hover:bg-green-700 text-white" 
                            : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => !project.demoUrl && e.preventDefault()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                        Live Demo
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <section id="contact" className="py-12 sm:py-16 md:py-20 border-t border-gray-200 dark:border-gray-800">
          {(() => {
            const [contactRef, contactInView] = useScrollAnimation();
            return (
              <motion.div
                ref={contactRef}
                initial="hidden"
                animate={contactInView ? "visible" : "hidden"}
                variants={fadeInUp}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 relative">
                  Get In Touch
                  <motion.span 
                    className="absolute bottom-0 left-0 w-16 h-1 bg-blue-500"
                    initial={{ width: 0 }}
                    animate={contactInView ? { width: 64 } : { width: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  ></motion.span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <motion.div
                    variants={fadeInUp}
                  >
                    <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6">
                      I'm currently open to new opportunities and collaborations. If you have a project in mind or just want to say hello, feel free to reach out!
                    </p>
                    
                    <motion.div 
                      className="space-y-3 sm:space-y-5"
                      variants={staggerContainer}
                    >
                      {[
                        {
                          icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>,
                          title: "Primary Email",
                          link: "mailto:sasutskitan@gmail.com",
                          value: "sasutskitan@gmail.com"
                        },
                        {
                          icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>,
                          title: "School Email",
                          link: "mailto:tan_yu_kai_james@s2022.ssts.edu.sg",
                          value: "tan_yu_kai_james@s2022.ssts.edu.sg"
                        },
                        {
                          icon: <Linkedin size={20} />,
                          title: "LinkedIn",
                          link: "https://linkedin.com/in/tanyukaijames",
                          value: "linkedin.com/in/tanyukaijames"
                        },
                        {
                          icon: <Github size={20} />,
                          title: "GitHub",
                          link: "https://github.com/sasutski",
                          value: "github.com/sasutski"
                        }
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-center p-3 sm:p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                          variants={staggerItem}
                          whileHover={{ x: 5 }}
                        >
                          <motion.div 
                            className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mr-4 group-hover:scale-110 transition-transform"
                            whileHover={{ rotate: 10 }}
                          >
                            {item.icon}
                          </motion.div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{item.title}</p>
                            <a href={item.link} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">{item.value}</a>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 shadow-md border border-gray-200 dark:border-gray-800"
                    variants={fadeInUp}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-lg sm:text-xl font-semibold mb-4">Send a Message</h3>
                    <motion.form 
                      className="space-y-3 sm:space-y-4"
                      variants={staggerContainer}
                    >
                      <motion.div variants={staggerItem}>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-sm sm:text-base"
                          placeholder="Your name"
                        />
                      </motion.div>
                      <motion.div variants={staggerItem}>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
                          placeholder="your.email@example.com"
                        />
                      </motion.div>
                      <motion.div variants={staggerItem}>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                        <textarea 
                          id="message" 
                          rows={4} 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
                          placeholder="Your message..."
                        ></textarea>
                      </motion.div>
                      <motion.button 
                        type="submit" 
                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors text-sm sm:text-base"
                        variants={staggerItem}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Send Message
                      </motion.button>
                    </motion.form>
                  </motion.div>
                </div>
              </motion.div>
            );
          })()}
        </section>
      </main>
    </div>
  );
}

