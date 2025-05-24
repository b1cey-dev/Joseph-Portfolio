import { CodeBracketIcon, CommandLineIcon, ServerIcon, CubeIcon, CloudArrowUpIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const services = [
  {
    title: "Front-End Development",
    description: "Creating responsive and interactive user interfaces with modern frameworks and best practices.",
    icon: CommandLineIcon,
    features: [
      "React & Next.js Development",
      "Responsive Design",
      "UI/UX Implementation",
      "Performance Optimization"
    ]
  },
  {
    title: "Back-End Development",
    description: "Building robust server-side applications and APIs with scalable architecture.",
    icon: ServerIcon,
    features: [
      "Node.js & Express",
      "RESTful APIs",
      "Database Design",
      "Server Architecture"
    ]
  },
  {
    title: "Full-Stack Solutions",
    description: "End-to-end application development from database to user interface.",
    icon: CodeBracketIcon,
    features: [
      "Full Application Development",
      "System Architecture",
      "Technical Consulting",
      "Code Review & Optimization"
    ]
  },
  {
    title: "Cloud Services",
    description: "Deploying and managing applications in the cloud with modern infrastructure.",
    icon: CloudArrowUpIcon,
    features: [
      "AWS & Vercel Deployment",
      "Cloud Architecture",
      "Serverless Solutions",
      "Performance Monitoring"
    ]
  },
  {
    title: "API Integration",
    description: "Seamless integration of third-party services and APIs into your applications.",
    icon: CubeIcon,
    features: [
      "API Development",
      "Third-party Integration",
      "WebSocket Implementation",
      "API Documentation"
    ]
  },
  {
    title: "Security Implementation",
    description: "Implementing robust security measures and best practices in applications.",
    icon: ShieldCheckIcon,
    features: [
      "Authentication Systems",
      "Data Encryption",
      "Security Best Practices",
      "Vulnerability Assessment"
    ]
  }
];

export default function Services() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-[#0c1220] text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Professional Development Services
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Comprehensive web development solutions tailored to your needs. From front-end design to back-end architecture, 
            I deliver high-quality, scalable applications that drive results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-slate-800/50 rounded-xl p-8 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all group">
              <div className="bg-blue-500/10 p-3 rounded-xl w-fit mb-6 group-hover:bg-blue-500/20 transition-all">
                <service.icon className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-slate-400 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-slate-300">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-slate-800/50 rounded-xl p-8 md:p-12 backdrop-blur-sm border border-slate-700/50 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how I can help bring your ideas to life with professional development services.
            </p>
            <a 
              href="/contact"
              className="bg-blue-500/10 text-blue-500 px-8 py-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all font-medium border border-blue-500/20 hover:border-blue-500 inline-block"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </main>
  );
} 