import { CodeBracketIcon, CommandLineIcon, ServerIcon, BeakerIcon, RocketLaunchIcon, LightBulbIcon, AcademicCapIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const skills = [
  {
    category: "Programming",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C++", "SQL"]
  },
  {
    category: "Web Development",
    items: ["React", "Next.js", "Node.js", "Tailwind CSS", "REST APIs", "MongoDB"]
  },
  {
    category: "Tools & Technologies",
    items: ["Git", "Docker", "AWS", "Machine Learning", "Data Analysis", "Linux"]
  }
];

const interests = [
  {
    title: "Software Architecture",
    description: "Passionate about designing scalable and maintainable software systems using modern best practices.",
    icon: BeakerIcon
  },
  {
    title: "Machine Learning",
    description: "Keen interest in exploring AI and ML applications in software development.",
    icon: LightBulbIcon
  },
  {
    title: "Innovation",
    description: "Driven to create innovative solutions that push the boundaries of technology.",
    icon: RocketLaunchIcon
  }
];

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-[#0c1220] text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            About Me
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Computer Science undergraduate with a passion for software development and innovation
          </p>
        </div>

        {/* Bio Section */}
        <div className="bg-slate-800/50 rounded-xl p-8 md:p-12 backdrop-blur-sm border border-slate-700/50 mb-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-500/10 p-3 rounded-xl">
                <AcademicCapIcon className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold">Academic Journey</h2>
            </div>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                I'm Joseph Robinson, a final-year undergraduate student studying Computer Science. My academic journey has been 
                driven by a passion for technology and innovation, and I've gained extensive experience in software development, 
                web design, and data analysis throughout my coursework and projects.
              </p>
              <p>
                After graduation, I'm planning to pursue an MSc in Software Engineering to deepen my expertise and explore 
                advanced topics in software architecture, machine learning, and artificial intelligence.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 justify-center mb-10">
            <div className="bg-blue-500/10 p-3 rounded-xl">
              <CodeBracketIcon className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold">Technical Skills</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillSet, index) => (
              <div key={index} className="bg-slate-800/30 rounded-xl p-8 backdrop-blur-sm border border-slate-700/50">
                <h3 className="text-xl font-bold mb-6 text-blue-500">{skillSet.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillSet.items.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="bg-blue-500/10 text-blue-500 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Interests */}
        <div className="mb-20">
          <div className="flex items-center gap-4 justify-center mb-10">
            <div className="bg-blue-500/10 p-3 rounded-xl">
              <BookOpenIcon className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold">Research Interests</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {interests.map((interest, index) => (
              <div key={index} className="bg-slate-800/30 rounded-xl p-8 backdrop-blur-sm border border-slate-700/50">
                <div className="bg-blue-500/10 p-3 rounded-xl w-fit mb-6">
                  <interest.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">{interest.title}</h3>
                <p className="text-slate-400">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-slate-800/50 rounded-xl p-8 md:p-12 backdrop-blur-sm border border-slate-700/50 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Let's Connect</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Interested in discussing technology, research opportunities, or potential collaborations?
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