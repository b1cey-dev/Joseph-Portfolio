import { motion } from 'framer-motion';
import Link from 'next/link';
import { CodeBracketIcon, CommandLineIcon, ServerIcon, UserGroupIcon, ClockIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const testimonials = [
  {
    text: "Joseph completed the commission as quick as requested producing a high quality product. Highly recommend.",
    author: "Jordan",
    role: "Client",
    stars: 5
  },
  {
    text: "Fast and competent developer",
    author: "Rainmaker",
    role: "Client",
    stars: 5
  },
  {
    text: "Website works amazingly, will finish it tonight with what my company needs",
    author: "CrownDEV",
    role: "Client",
    stars: 5
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-[#0c1220] text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-blue-500/10 p-2 rounded-xl group-hover:bg-blue-500/20 transition-all">
                <span className="text-blue-500 font-bold text-2xl">J</span>
              </div>
              <div>
                <span className="text-white text-xl font-bold">Joseph</span>
                <span className="text-blue-500 text-xl font-bold">Robinson</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-300 hover:text-blue-500 transition-colors font-medium">Home</Link>
              <Link href="/projects" className="text-slate-300 hover:text-blue-500 transition-colors font-medium">Projects</Link>
              <Link href="/services" className="text-slate-300 hover:text-blue-500 transition-colors font-medium">Services</Link>
              <Link href="/about" className="text-slate-300 hover:text-blue-500 transition-colors font-medium">About</Link>
              <Link href="/contact" className="text-slate-300 hover:text-blue-500 transition-colors font-medium">Contact</Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <Link 
                href="https://github.com/jsrobinson" 
                target="_blank"
                className="text-slate-400 hover:text-blue-500 transition-all p-2 rounded-lg hover:bg-blue-500/10"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </Link>
              <Link 
                href="https://linkedin.com/in/jsrobinson" 
                target="_blank"
                className="text-slate-400 hover:text-blue-500 transition-all p-2 rounded-lg hover:bg-blue-500/10"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              <Link 
                href="/contact"
                className="bg-blue-500/10 text-blue-500 px-6 py-2.5 rounded-xl hover:bg-blue-500 hover:text-white transition-all text-sm font-medium border border-blue-500/20 hover:border-blue-500"
              >
                Hire Me
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Add margin-top to account for fixed navbar */}
      <div className="pt-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <span className="bg-blue-500/10 text-blue-500 text-sm font-medium tracking-wider px-4 py-2 rounded-full">FULL STACK DEVELOPER</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Hi, I'm <span className="text-blue-500">Joseph Robinson</span>
            </h1>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              I craft robust and scalable web applications with modern technologies. 
              Specializing in full-stack development to bring your ideas to life with clean code and exceptional user experiences.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact" 
                className="bg-blue-500/10 text-blue-500 px-8 py-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all font-medium border border-blue-500/20 hover:border-blue-500 hover:scale-105">
                Let's Work Together
              </Link>
              <Link href="/projects" 
                className="bg-slate-800/50 text-white px-8 py-3 rounded-xl hover:bg-slate-700 transition-all font-medium border border-slate-700 hover:scale-105">
                View My Work
              </Link>
            </div>
            <div className="mt-12 flex justify-center gap-6">
              <Link href="https://github.com/jsrobinson" target="_blank" 
                className="text-slate-400 hover:text-blue-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </Link>
              <Link href="https://linkedin.com/in/jsrobinson" target="_blank" 
                className="text-slate-400 hover:text-blue-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <div className="bg-slate-800/30 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <UserGroupIcon className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-4xl font-bold text-blue-500">6+</h3>
            <p className="text-slate-400">Happy Clients</p>
          </div>
          <div className="bg-slate-800/30 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <SparklesIcon className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-4xl font-bold text-blue-500">6+</h3>
            <p className="text-slate-400">Projects Completed</p>
          </div>
          <div className="bg-slate-800/30 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <ClockIcon className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-4xl font-bold text-blue-500">100%</h3>
            <p className="text-slate-400">On-Time Delivery</p>
          </div>
        </section>

        {/* Services Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-blue-500 text-sm uppercase tracking-wider mb-2">EXPERTISE</h2>
            <h3 className="text-4xl font-bold mb-4">My Development Services</h3>
            <p className="text-slate-400">Specialized web development services to bring your digital ideas to life.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-lg backdrop-blur-sm hover:bg-slate-800 transition-all hover:scale-105 group">
              <div className="text-blue-500 mb-4 transform group-hover:scale-110 transition-transform">
                <CommandLineIcon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3">Front-End Development</h4>
              <p className="text-slate-400">Building responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks.</p>
            </div>
            
            <div className="bg-slate-800/50 p-8 rounded-lg backdrop-blur-sm hover:bg-slate-800 transition-all hover:scale-105 group">
              <div className="text-blue-500 mb-4 transform group-hover:scale-110 transition-transform">
                <ServerIcon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3">Back-End Development</h4>
              <p className="text-slate-400">Creating robust server-side applications with Node.js, Express, and database management systems.</p>
            </div>
            
            <div className="bg-slate-800/50 p-8 rounded-lg backdrop-blur-sm hover:bg-slate-800 transition-all hover:scale-105 group">
              <div className="text-blue-500 mb-4 transform group-hover:scale-110 transition-transform">
                <CodeBracketIcon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3">Full-Stack Development</h4>
              <p className="text-slate-400">End-to-end application development, from database design to user interface implementation.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Client Testimonials</h2>
            
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#0c1220] to-transparent z-10" />
              <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#0c1220] to-transparent z-10" />
              
              <div className="flex animate-marquee">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-none w-[400px] mx-4"
                  >
                    <div className="rounded-xl p-8 border border-slate-800 hover:border-blue-500/50 transition-all">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-slate-200 mb-6 text-lg leading-relaxed">"{testimonial.text}"</p>
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 border border-blue-500/20">
                          <span className="text-blue-400 font-bold text-xl">{testimonial.author[0]}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-white">{testimonial.author}</p>
                          <p className="text-sm text-blue-400">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold mb-4">Have a Project in Mind?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            I'm currently available for freelance work. Let's discuss your project and create something amazing together.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact" 
              className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all hover:scale-105">
              Start a Conversation
            </Link>
            <Link href="/projects" 
              className="border border-blue-500 text-blue-500 px-8 py-3 rounded-full hover:bg-slate-800 transition-all hover:scale-105">
              View My Work
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-800/50 backdrop-blur-sm py-16 mt-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12">
              {/* Brand */}
              <div>
                <Link href="/" className="flex items-center mb-4">
                  <span className="text-white text-2xl font-bold">Joseph</span>
                  <span className="text-blue-500 text-2xl font-bold">Robinson</span>
                </Link>
                <p className="text-slate-400 mb-6">Full-stack developer creating modern web applications with clean code and great user experiences.</p>
                <div className="flex gap-4">
                  <Link href="https://github.com/jsrobinson" target="_blank" 
                    className="text-slate-400 hover:text-blue-500 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </Link>
                  <Link href="https://linkedin.com/in/jsrobinson" target="_blank" 
                    className="text-slate-400 hover:text-blue-500 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white text-lg font-bold mb-4">Quick Links</h4>
                <div className="flex flex-col gap-2">
                  <Link href="/" className="text-slate-400 hover:text-blue-500 transition-colors">Home</Link>
                  <Link href="/projects" className="text-slate-400 hover:text-blue-500 transition-colors">Projects</Link>
                  <Link href="/contact" className="text-slate-400 hover:text-blue-500 transition-colors">Contact</Link>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-white text-lg font-bold mb-4">Services</h4>
                <div className="flex flex-col gap-2">
                  <Link href="#" className="text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2">
                    <CommandLineIcon className="w-5 h-5" /> Front-End Development
                  </Link>
                  <Link href="#" className="text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2">
                    <ServerIcon className="w-5 h-5" /> Back-End Development
                  </Link>
                  <Link href="#" className="text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2">
                    <CodeBracketIcon className="w-5 h-5" /> Full-Stack Development
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
              <p>© {new Date().getFullYear()} Joseph Robinson. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
