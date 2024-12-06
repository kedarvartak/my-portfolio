import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, SiJavascript, SiTypescript, SiPython, 
  SiNodedotjs, SiTailwindcss, SiGit, SiDocker,
  SiMongodb, SiPostgresql, SiLinux,
  SiNextdotjs, SiVuedotjs, SiAngular, SiExpress,
  SiDjango, SiFlask, SiMysql, SiRedis,
  SiKubernetes, SiJenkins, SiTerraform, 
} from 'react-icons/si';

const skillRows = [
  // Frontend
  [
    { icon: SiReact, name: "React" },
    { icon: SiNextdotjs, name: "Next.js" },
    { icon: SiVuedotjs, name: "Vue.js" },
    { icon: SiAngular, name: "Angular" },
    { icon: SiJavascript, name: "JavaScript" },
    { icon: SiTypescript, name: "TypeScript" },
    { icon: SiTailwindcss, name: "Tailwind" },
  ],
  // Backend
  [
    { icon: SiNodedotjs, name: "Node.js" },
    { icon: SiExpress, name: "Express" },
    { icon: SiPython, name: "Python" },
    { icon: SiDjango, name: "Django" },
    { icon: SiFlask, name: "Flask" },
    { icon: SiMongodb, name: "MongoDB" },
    { icon: SiPostgresql, name: "PostgreSQL" },
    { icon: SiMysql, name: "MySQL" },
    { icon: SiRedis, name: "Redis" },
  ],
  // DevOps
  [
    { icon: SiGit, name: "Git" },
    { icon: SiDocker, name: "Docker" },
    { icon: SiKubernetes, name: "Kubernetes" },
    { icon: SiJenkins, name: "Jenkins" },
    { icon: SiTerraform, name: "Terraform" },
    { icon: SiLinux, name: "Linux" },
  ],
];

const SkillIcon = ({ Icon, name }) => (
  <div className="flex flex-col items-center justify-center mx-12 group">
    <Icon className="text-4xl text-neutral-400 group-hover:text-white transition-colors duration-300" />
    <span className="mt-2 text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300">
      {name}
    </span>
  </div>
);

const Ticker = ({ children, direction = 1, speed = 20 }) => {
  // Create copies of children to ensure smooth infinite scroll
  const items = React.Children.toArray(children);
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative flex overflow-hidden">
      <motion.div
        animate={{
          x: direction > 0 ? [0, -items.length * 192] : [-items.length * 192, 0]
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }
        }}
        className="flex flex-shrink-0 items-center"
      >
        {duplicatedItems}
      </motion.div>
    </div>
  );
};

const Skills = () => {
  return (
    <section className="py-24 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">Tech Stack</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto font-light">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>
      </div>

      <div className="space-y-12">
        {skillRows.map((row, index) => (
          <Ticker 
            key={index} 
            direction={index % 2 === 0 ? 1 : -1}
            speed={30 + index * 5}
          >
            {row.map((skill, skillIndex) => (
              <SkillIcon 
                key={skillIndex} 
                Icon={skill.icon} 
                name={skill.name} 
              />
            ))}
          </Ticker>
        ))}
      </div>

      {/* Additional Technologies */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 sm:px-6 mt-20"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "REST APIs", 
            "GraphQL", 
            "UI/UX Design", 
            "Agile", 
            "CI/CD", 
            "Testing", 
            "System Design",
            "WebSockets",
            "OAuth",
            "JWT",
            "Microservices"
          ].map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="px-4 py-2 bg-neutral-900/50 border border-neutral-800 rounded-full text-sm text-neutral-300 hover:bg-neutral-800/50 transition-colors duration-300"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills; 