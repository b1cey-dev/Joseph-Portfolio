'use client';

import { motion } from 'framer-motion';
import { CodeBracketIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const projects = [
  {
    title: 'Subpace - Community Management Platform',
    description: 'Building Subpace, a SaaS platform for community management, member engagement, and seamless integrations with Discord, Slack, and more. Leading product vision, business strategy, and a cross-functional team to empower creators and organizations to grow and monetize their online communities.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Discord API', 'Slack API'],
    image: '/projects/subpace.jpg',
    demoUrl: 'https://subpace.com',
    features: [
      'Multi-Platform Integration with Discord, WhatsApp & Slack',
      'Advanced Analytics Dashboard',
      'Secure Access Control',
      'Automated Member Management',
      'Payment Processing & Monetization',
    ],
  },
  {
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and a responsive design.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: '/projects/portfolio.jpg',
    demoUrl: 'https://jsrob.com',
    githubUrl: 'https://github.com/jsrobinson/portfolio',
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-[#0c1220] text-white">
      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Featured Projects</h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Here are some of the significant projects I've worked on. Each project represents a unique challenge and demonstrates my ability to deliver innovative solutions.
            </p>
          </div>

          <div className="grid gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-lg overflow-hidden hover:bg-slate-800/70 transition-all group"
              >
                <div className="grid md:grid-cols-2 gap-6 p-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <p className="text-slate-400 mb-6">{project.description}</p>
                    
                    {project.features && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {project.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-slate-300">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-sm px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Link
                        href={project.demoUrl}
                        target="_blank"
                        className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <GlobeAltIcon className="w-5 h-5" />
                        Visit Website
                      </Link>
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          className="flex items-center gap-2 bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-600 transition-colors"
                        >
                          <CodeBracketIcon className="w-5 h-5" />
                          View Code
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="aspect-video bg-slate-900 rounded-lg relative overflow-hidden">
                    {/* Add actual project images here */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all hover:scale-105"
            >
              Start Your Project
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 