import React, { useState, useEffect } from 'react';

// Icons from lucide-react (or similar modern library)
const Icon = ({ name, className = "" }) => {
  const icons = {
    // General Icons
    Code: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
    Users: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    Briefcase: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
    Github: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.75 3.75 0 0 0-.64-2.18c4.27-.47 8.75-2.14 8.75-9.54 0-2.11-.75-3.9-2.02-5.27.2-.5.87-2.5-2.13-2.5-1 0-2 .5-2.5 1.25A9.7 9.7 0 0 0 12 5c-.5 0-1.5.25-2.5 1.25-.5-.75-1.5-1.25-2.5-1.25-3 0-2.33 2-2.13 2.5C4.75 7.1 4 8.89 4 11s4.48 7.37 8.75 9.54A3.75 3.75 0 0 0 18 19v3"></path></svg>,
    Linkedin: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
    Mail: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
    Moon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>,
    Sun: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>,

    // Tech Icons
    CheckCircle: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.83-8.82"></path><path d="M22 4L12 14.01l-3-3"></path></svg>,
    GitBranch: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>,
    HardHat: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5.5 3c-1.4 0-1.5-1.1-.9-2.3L6.5 13"></path><line x1="15" y1="20" x2="15" y2="15"></line><line x1="15" y1="12" x2="15" y2="9"></line><path d="M7 16V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12"></path></svg>,
    Database: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>,
    Zap: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
    Scale: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16.5c-.75-.66-1-1.44-1-2.5 0-1.1.25-1.9.99-2.5"></path><path d="M22 6c0 1.5-.5 3.3-2 5-1.5 1.7-5 2.5-6 2.5v7l-2-2-2 2v-7c-1 0-4.5-.8-6-2.5-1.5-1.7-2-3.5-2-5 0-2.8 2-5 6-5s6 2.2 6 5c0 1.1-.25 1.9-.99 2.5"></path></svg>,
  };
  const SelectedIcon = icons[name] || icons.Code;
  return <SelectedIcon className={className} />;
};

// --- DATA DEFINITION ---
const PROFILE_DATA = {
  name: "Abhinesh Kumar Pandey",
  title: "Frontend Developer | Performance Optimization & System Design",
  summary: "Frontend Developer skilled in JavaScript, React, and Java, with a robust foundation in Data Structures, Algorithms, and OOP. I'm passionate about architecting scalable, customer-centric solutions that significantly improve both performance and user experience in fast-paced, agile environments.",
  contact: {
    email: "abhineshpandey11@gmail.com",
    linkedin: "https://linkedin.com/in/abhinesh0011/",
    github: "https://github.com/abhinesh0011",
    phone: "+91-8085125045",
  },
  education: {
    degree: "B.Tech in Computer Science",
    institution: "Jiwaji University",
    gpa: "7.10/10.00",
    coursework: ["Data Structures", "Algorithms", "OOP", "DBMS", "Computational Theory"]
  }
};

const SKILLS_DATA = [
  { category: "Frontend Core", icon: "Code", skills: ["React.js", "JavaScript (ES6+)", "HTML", "Tailwind CSS (Implied)"] },
  { category: "Core CS & Systems", icon: "Database", skills: ["Data Structures & Algorithms", "OOP", "Complexity Analysis", "Distributed Systems", "Relational Databases", "Optimization"] },
  { category: "Languages & Tools", icon: "GitBranch", skills: ["Java", "Python", "C++", "AWS", "Git", "SQL", "Agile"] },
  { category: "Methodologies", icon: "Scale", skills: ["Scalability", "Fault Tolerance", "Low Latency", "Client-side Prediction"] },
];

const EXPERIENCE_DATA = [
  {
    title: "Frontend Developer Intern",
    company: "Mentoraide (Remote)",
    period: "Jan 2024 – Aug 2024",
    highlights: [
      {
        text: "Spearheaded a **75% reduction in user list rendering time** by implementing a **client-side prediction algorithm**, drastically enhancing application scalability and perceived user experience.",
        icon: "Zap",
        metric: "75% Performance Gain"
      },
      {
        text: "Designed and deployed a complex **metadata extraction system** integrating iChat with Spotlight Search, resulting in a **60% improvement in cross-platform discoverability**.",
        icon: "Briefcase",
        metric: "60% Discoverability Increase"
      },
      {
        text: "Re-architected legacy chat file structures to ensure **backward compatibility** and **efficient query indexing**, crucial for seamless migration and reliability.",
        icon: "HardHat",
        metric: "System Reliability"
      },
      {
        text: "Collaborated in an agile, cross-functional team to design, test, and deploy high-impact features within tight sprint cycles.",
        icon: "Users",
        metric: "Agile Collaboration"
      },
    ],
  }
];

const PROJECTS_DATA = [
  {
    title: "E-commerce Product Page",
    description: "Developed a fully responsive product page with dynamic content, a functional image gallery, and interactive 'add to cart' logic. Showcases fundamental Frontend skills and component structure.",
    tech: ["HTML", "CSS", "JavaScript"],
    demoLink: "#",
    codeLink: "https://github.com/abhinesh0011/ecommerce-product-page-mock",
    image: "https://placehold.co/400x250/0f172a/ffffff?text=E-commerce",
  },
  {
    title: "Interactive To-Do List",
    description: "A dynamic to-do application allowing users to create, mark, delete, and filter tasks. Implements browser **Local Storage** for data persistence across sessions.",
    tech: ["JavaScript", "HTML", "Local Storage"],
    demoLink: "#",
    codeLink: "https://github.com/abhinesh0011/interactive-todo-list-js",
    image: "https://placehold.co/400x250/0f172a/ffffff?text=To-Do+App",
  },
  {
    title: "Real-time Weather Application",
    description: "Created a real-time application that fetches and displays current weather conditions for user-specified locations, demonstrating proficiency in **Public API integration** and asynchronous data handling.",
    tech: ["React", "API Integration", "JavaScript"],
    demoLink: "#",
    codeLink: "https://github.com/abhinesh0011/react-weather-app-api",
    image: "https://placehold.co/400x250/0f172a/ffffff?text=Weather+App",
  },
];

// --- COMPONENTS ---

// Dark Mode Provider and Hook
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true; // Default to dark server-side or if no storage
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return [isDark, setIsDark];
};

// Scroll Handler
const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

// Reusable Button
const PrimaryButton = ({ onClick, children, href, target = "_self", className = "" }) => {
  const baseClasses = "px-6 py-3 font-semibold rounded-full transition-all duration-300 transform active:scale-95 shadow-lg ";
  // Updated to use emerald colors for a high-performance look
  const styleClasses = "bg-emerald-500 text-slate-950 hover:bg-emerald-400 dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300";

  const content = (
    <span className="flex items-center justify-center space-x-2">
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel="noopener noreferrer"
        className={`${baseClasses} ${styleClasses} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${styleClasses} ${className}`}
    >
      {content}
    </button>
  );
};

// --- Navbar Component ---
const Navbar = ({ isDark, toggleDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const NavLink = ({ id, children }) => (
    <button
      onClick={() => {
        scrollToSection(id);
        setIsOpen(false);
      }}
      // Updated hover colors to match emerald palette
      className="p-2 text-lg font-medium transition duration-200 hover:text-emerald-400 dark:hover:text-emerald-300"
    >
      {children}
    </button>
  );

  return (
    // Updated dark mode background to slate-950
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm shadow-xl rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center p-4 max-w-7xl">
        {/* Updated logo color to emerald-400 */}
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          <span className="text-emerald-400">&lt;</span>
          Abhinesh
          <span className="text-emerald-400">&gt;</span>
        </h1>
        <nav className="hidden md:flex space-x-6">
          {navItems.map(item => <NavLink key={item.id} id={item.id}>{item.name}</NavLink>)}
          <button
            onClick={toggleDark}
            className="p-2 ml-4 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Icon name="Sun" className="w-6 h-6" /> : <Icon name="Moon" className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleDark}
            className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Icon name="Sun" className="w-6 h-6" /> : <Icon name="Moon" className="w-6 h-6" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-800 dark:text-white rounded-md focus:outline-none">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      <nav className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-4 space-y-2">
          {navItems.map(item => <NavLink key={item.id} id={item.id}>{item.name}</NavLink>)}
        </div>
      </nav>
    </header>
  );
};

// --- Hero Section Component ---
const Hero = () => (
  // Updated dark mode background to slate-950
  <section id="hero" className="min-h-[85vh] flex items-center justify-center text-center py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
    <div className="container mx-auto px-6 max-w-4xl">
      {/* Updated color to emerald-400 */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-emerald-400">
        Abhinesh Kumar Pandey
      </h2>
      <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 text-slate-900 dark:text-white leading-tight">
        Frontend Developer
      </h1>
      <p className="text-xl sm:text-2xl mb-10 text-slate-600 dark:text-slate-300">
        Specializing in **React & Core CS** to build <strong className="text-emerald-400">high-performance, scalable</strong> user experiences.
      </p>

      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <PrimaryButton onClick={() => scrollToSection('projects')}>
          View My Projects
        </PrimaryButton>
        <PrimaryButton href="#" target="_blank" className="bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600">
          Download Resume (PDF)
        </PrimaryButton>
      </div>
      <div className="mt-12 flex justify-center space-x-6">
        {/* Updated hover colors to emerald-400 */}
        <a href={PROFILE_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-600 dark:text-slate-400 hover:text-emerald-400 transition-colors">
          <Icon name="Linkedin" className="w-8 h-8" />
        </a>
        <a href={PROFILE_DATA.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-600 dark:text-slate-400 hover:text-emerald-400 transition-colors">
          <Icon name="Github" className="w-8 h-8" />
        </a>
        <a href={`mailto:${PROFILE_DATA.contact.email}`} aria-label="Email" className="text-slate-600 dark:text-slate-400 hover:text-emerald-400 transition-colors">
          <Icon name="Mail" className="w-8 h-8" />
        </a>
      </div>
    </div>
  </section>
);

// --- Section Header Utility ---
const SectionHeader = ({ id, title, subtitle }) => (
  <div className="text-center mb-12">
    {/* Updated subtitle color to emerald-400 */}
    <h3 className="text-lg font-semibold text-emerald-400 uppercase">{subtitle}</h3>
    <h2 id={id} className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2 scroll-mt-20">
      {title}
    </h2>
  </div>
);

// --- About Section Component ---
const About = () => (
  // Updated dark mode background to slate-800 for contrast with slate-950
  <section id="about" className="py-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
    <div className="container mx-auto px-6 max-w-7xl">
      <SectionHeader id="about" title="Meet Abhinesh" subtitle="A Performance-Driven Engineer" />

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          {/* Updated border color to emerald-400 */}
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed border-l-4 border-emerald-400 pl-4 bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
            {PROFILE_DATA.summary}
          </p>
          <div className="space-y-4 pt-4">
            {/* Updated icon color to emerald-400 */}
            <p className="text-slate-900 dark:text-white font-bold text-lg flex items-center">
              <Icon name="CheckCircle" className="w-6 h-6 mr-3 text-emerald-400 flex-shrink-0" />
              Focus: Scalability, Low Latency, and User Experience (UX).
            </p>
            {/* Updated icon color to emerald-400 */}
            <p className="text-slate-900 dark:text-white font-bold text-lg flex items-center">
              <Icon name="CheckCircle" className="w-6 h-6 mr-3 text-emerald-400 flex-shrink-0" />
              Differentiator: Strong command over **Core CS fundamentals** (DSA, OOP, Optimization).
            </p>
          </div>
        </div>

        {/* Education Card */}
        <div className="bg-slate-100 dark:bg-slate-700 p-8 rounded-xl shadow-xl">
          {/* Updated icon color to emerald-400 */}
          <h4 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white flex items-center">
            <Icon name="Users" className="w-6 h-6 mr-3 text-emerald-400" />
            Education
          </h4>
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">{PROFILE_DATA.education.degree}</p>
          <p className="text-md text-slate-600 dark:text-slate-400">{PROFILE_DATA.education.institution}</p>
          {/* Updated GPA highlight color to emerald-400 */}
          <p className="mt-2 text-md text-slate-600 dark:text-slate-400">GPA: <span className="font-bold text-emerald-400">{PROFILE_DATA.education.gpa}</span></p>

          <h5 className="text-lg font-semibold mt-6 mb-2 text-slate-800 dark:text-white">Key Coursework:</h5>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 grid grid-cols-2 gap-x-4">
            {PROFILE_DATA.education.coursework.map((course, index) => (
              <li key={index} className="truncate">{course}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// --- Skills Section Component ---
const Skills = () => (
  // Updated dark mode background to slate-950
  <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
    <div className="container mx-auto px-6 max-w-7xl">
      <SectionHeader id="skills" title="Technical Arsenal" subtitle="Skills & Technologies" />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SKILLS_DATA.map((group, index) => (
          <div key={index} className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border-t-4 border-emerald-400 transition-transform duration-300 hover:scale-[1.02]">
            <h4 className="text-xl font-bold mb-4 text-slate-800 dark:text-white flex items-center">
              {/* Updated icon color to emerald-400 */}
              <Icon name={group.icon} className="w-6 h-6 mr-3 text-emerald-400" />
              {group.category}
            </h4>
            <ul className="space-y-2">
              {group.skills.map((skill, sIndex) => (
                <li key={sIndex} className="text-slate-700 dark:text-slate-300 text-base flex items-start">
                  {/* Updated bullet color to emerald-400 */}
                  <span className="text-emerald-400 mr-2">•</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Experience Section Component ---
const Experience = () => (
  // Updated dark mode background to slate-800
  <section id="experience" className="py-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
    <div className="container mx-auto px-6 max-w-5xl">
      <SectionHeader id="experience" title="Professional Journey" subtitle="Experience & Impact" />

      {EXPERIENCE_DATA.map((job, index) => (
        <div key={index} className="relative p-8 mb-12 bg-slate-50 dark:bg-slate-700 rounded-xl shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{job.title}</h4>
              {/* Updated company text color to emerald-400 */}
              <p className="text-lg text-emerald-400">{job.company}</p>
            </div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-300 bg-slate-200 dark:bg-slate-600 px-3 py-1 rounded-full">{job.period}</span>
          </div>

          <ul className="space-y-5 mt-6">
            {job.highlights.map((highlight, hIndex) => (
              <li key={hIndex} className="flex items-start text-slate-700 dark:text-slate-300">
                {/* Updated icon color to emerald-400 */}
                <Icon name={highlight.icon} className="w-5 h-5 mr-3 mt-1 text-emerald-400 flex-shrink-0" />
                <div>
                  {/* CRITICAL: Highlight metrics with amber-500 and drop shadow for maximum visibility */}
                  <p className="font-extrabold text-amber-500 drop-shadow-lg">{highlight.metric}:</p>
                  <p className="ml-1 text-base">{highlight.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

// --- Projects Section Component ---
const Projects = () => (
  // Updated dark mode background to slate-950
  <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
    <div className="container mx-auto px-6 max-w-7xl">
      <SectionHeader id="projects" title="Featured Work" subtitle="React & JavaScript Applications" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS_DATA.map((project, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden group transition-all duration-300 hover:shadow-emerald-500/50">
            {/* Image Placeholder */}
            <div className="h-48 overflow-hidden">
                <img src={project.image} alt={`${project.title} screenshot`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/0f172a/ffffff?text=Project+Placeholder"; }}/>
            </div>

            <div className="p-6">
              <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{project.title}</h4>
              <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, tIndex) => (
                  // Updated tag colors to emerald palette
                  <span key={tIndex} className="text-xs font-medium text-emerald-700 bg-emerald-100 dark:text-emerald-200 dark:bg-emerald-900/50 px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-3">
                {/* Updated demo link color to emerald-400 */}
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                  Live Demo (Mock) &rarr;
                </a>
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-400 transition-colors">
                  Code &rarr;
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Contact Section Component ---
const Contact = () => (
  // Updated dark mode background to slate-800
  <section id="contact" className="py-20 bg-white dark:bg-slate-800">
    <div className="container mx-auto px-6 max-w-4xl">
      <SectionHeader id="contact" title="Get In Touch" subtitle="Let's build scalable solutions together" />

      <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl shadow-2xl">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 text-center">
          I am currently open to new opportunities. Feel free to connect via LinkedIn or send an email directly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
          {/* Updated hover and icon colors to emerald-400 */}
          <a href={`mailto:${PROFILE_DATA.contact.email}`} className="flex items-center text-slate-800 dark:text-white hover:text-emerald-400 transition-colors">
            <Icon name="Mail" className="w-6 h-6 mr-3 text-emerald-400" />
            {PROFILE_DATA.contact.email}
          </a>
          {/* Updated hover and icon colors to emerald-400 */}
          <a href={PROFILE_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-800 dark:text-white hover:text-emerald-400 transition-colors">
            <Icon name="Linkedin" className="w-6 h-6 mr-3 text-emerald-400" />
            LinkedIn Profile
          </a>
        </div>

        {/* Mock Contact Form (can be connected to Formspree, etc., easily) */}
        <form className="mt-10 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            // Updated focus rings to emerald-400
            className="w-full p-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-emerald-400 focus:border-emerald-400 transition"
          />
          <input
            type="email"
            placeholder="Your Email"
            // Updated focus rings to emerald-400
            className="w-full p-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-emerald-400 focus:border-emerald-400 transition"
          />
          <textarea
            placeholder="Your Message (Optional)"
            rows="4"
            // Updated focus rings to emerald-400
            className="w-full p-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-emerald-400 focus:border-emerald-400 transition"
          ></textarea>
          <PrimaryButton type="submit" className="w-full">
            Send Message
          </PrimaryButton>
        </form>
      </div>
    </div>
  </section>
);

// --- Footer Component ---
const Footer = () => (
  // Updated dark mode background to slate-950
  <footer className="bg-slate-900 dark:bg-slate-950 text-white py-6 text-center">
    <p className="text-sm">
      &copy; {new Date().getFullYear()} Abhinesh Kumar Pandey. Built with React and Tailwind CSS.
    </p>
  </footer>
);

// --- Main App Component ---
export default function App() {
  const [isDark, toggleDark] = useDarkMode();

  return (
    // Updated dark mode background to slate-950
    <div className="min-h-screen font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-300">
      <Navbar isDark={isDark} toggleDark={() => toggleDark(!isDark)} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
