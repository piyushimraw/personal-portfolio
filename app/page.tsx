"use client";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TracingBeam } from "@/components/ui/tracing-beam";
import {
  IconHome,
  IconUser,
  IconBriefcase,
  IconMail,
  IconBrandReact,
  IconBrandNodejs,
  IconBrandGolang,
  IconBrandTypescript,
  IconDatabase,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconDeviceMobile,
  IconCloud,
  IconCode,
} from "@tabler/icons-react";
import { motion } from "motion/react";

const navItems = [
  { name: "Home", link: "#home", icon: <IconHome size={18} /> },
  { name: "About", link: "#about", icon: <IconUser size={18} /> },
  {
    name: "Experience",
    link: "#experience",
    icon: <IconBriefcase size={18} />,
  },
  { name: "Contact", link: "#contact", icon: <IconMail size={18} /> },
];

const skills = [
  {
    title: "React & Next.js",
    description:
      "Building modern, performant web applications with React ecosystem and server-side rendering.",
    icon: <IconBrandReact className="h-6 w-6 text-cyan-500" />,
    className: "md:col-span-2",
  },
  {
    title: "Node.js & Express",
    description: "Developing robust backend APIs and microservices.",
    icon: <IconBrandNodejs className="h-6 w-6 text-green-500" />,
    className: "md:col-span-1",
  },
  {
    title: "Golang",
    description:
      "Writing high-performance CLI tools, AWS Lambda functions, and backend services.",
    icon: <IconBrandGolang className="h-6 w-6 text-sky-400" />,
    className: "md:col-span-1",
  },
  {
    title: "TypeScript & GraphQL",
    description: "Type-safe development with modern API design patterns.",
    icon: <IconBrandTypescript className="h-6 w-6 text-blue-500" />,
    className: "md:col-span-1",
  },
  {
    title: "React Native",
    description:
      "Cross-platform mobile development for iOS and Android applications.",
    icon: <IconDeviceMobile className="h-6 w-6 text-purple-500" />,
    className: "md:col-span-1",
  },
  {
    title: "Cloud & DevOps",
    description:
      "AWS Lambda, Docker, CI/CD pipelines, and infrastructure automation.",
    icon: <IconCloud className="h-6 w-6 text-orange-500" />,
    className: "md:col-span-1",
  },
  {
    title: "Database Design",
    description:
      "MongoDB, PostgreSQL, and data modeling for scalable applications.",
    icon: <IconDatabase className="h-6 w-6 text-yellow-500" />,
    className: "md:col-span-1",
  },
];

const experiences = [
  {
    company: "MindTickle",
    role: "Software Engineer 2",
    period: "Current",
    highlights: [
      "Developed on-call utility CLI in Golang, reducing incident response time by 40%",
      "Built AWS Lambda functions for async workflows (certificates, emails) using Golang",
      "Delivered core Learning Apps features using React.js and GraphQL, contributing to $2M account renewals",
      "Improved frontend code coverage from 30% to 80% with Playwright, Jest, and React Testing Library",
      "Developed React Native features for MindTickle mobile app",
    ],
  },
  {
    company: "Squadcast",
    role: "Software Engineer 2",
    period: "Previous",
    highlights: [
      "Revamped Squadcast Mobile App, owned Android and iOS release pipelines",
      "Implemented DND override for high-priority incident notifications using React Native",
      "Added Microsoft Teams integration released to marketplace using Golang",
      "Built incident-specific Slack/Teams collaboration features with MongoDB persistence",
    ],
  },
  {
    company: "Leena AI",
    role: "Software Engineer",
    period: "Previous",
    highlights: [
      "Developed web-based chat application using React.js and Redux",
      "Built Chatbot flow builder with React.js, Redux, and Three.js",
      "Created mobile applications using React Native",
      "Developed marketing website using Next.js",
      "Maintained backend services with Node.js, Express.js, and MongoDB",
    ],
  },
];

export default function Home() {
  return (
    <main className="relative bg-black antialiased">
      {/* Floating Navigation */}
      <FloatingNav navItems={navItems} />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen w-full overflow-hidden bg-black/[0.96] bg-grid-white/[0.02] flex items-center justify-center"
      >
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm uppercase tracking-widest text-neutral-400 mb-4">
              Staff Software Engineer
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
          >
            Hi, I&apos;m Piyush
          </motion.h1>

          <TextGenerateEffect
            words="I build fast, delightful experiences on the web. Passionate about Web Standards, Performance, Animations, and crafting scalable distributed systems."
            className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <a
              href="#experience"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 font-medium text-white transition-all duration-300 hover:scale-105"
            >
              <span>View My Work</span>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-sm uppercase tracking-widest text-purple-400 mb-4">
              About Me
            </h2>
            <h3 className="text-3xl font-bold text-white md:text-4xl">
              Skills & Technologies
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
              Full stack engineer with expertise in building mobile and web
              applications. I work heavily with modern JavaScript frameworks and
              cloud technologies.
            </p>
          </motion.div>

          <BentoGrid className="mx-auto">
            {skills.map((skill, i) => (
              <BentoGridItem
                key={i}
                title={skill.title}
                description={skill.description}
                icon={skill.icon}
                className={skill.className}
                header={
                  <div className="flex h-full min-h-[6rem] w-full flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/[0.1]">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                      {skill.icon}
                    </div>
                  </div>
                }
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-32 px-6 bg-black/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-sm uppercase tracking-widest text-purple-400 mb-4">
              Career Journey
            </h2>
            <h3 className="text-3xl font-bold text-white md:text-4xl">
              Work Experience
            </h3>
          </motion.div>

          <TracingBeam className="px-6">
            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-8"
                >
                  <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />

                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 p-8 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-white">
                          {exp.company}
                        </h4>
                        <p className="text-purple-400">{exp.role}</p>
                      </div>
                      <span className="mt-2 md:mt-0 inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-300 border border-purple-500/20">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <IconCode className="mt-1 h-4 w-4 flex-shrink-0 text-purple-400" />
                          <span className="text-neutral-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </TracingBeam>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm uppercase tracking-widest text-purple-400 mb-4">
              Let&apos;s Connect
            </h2>
            <h3 className="text-3xl font-bold text-white md:text-5xl mb-6">
              Get In Touch
            </h3>
            <p className="mx-auto max-w-2xl text-neutral-400 mb-10">
              I&apos;m always open to discussing new opportunities, interesting
              projects, or just having a conversation about technology.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="mailto:hello@piyushrivastava.com"
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-10 font-medium text-white transition-all duration-300 hover:scale-105"
              >
                <IconMail className="mr-2 h-5 w-5" />
                <span>Say Hello</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                  <div className="relative h-full w-8 bg-white/20" />
                </div>
              </a>
            </div>

            <div className="flex items-center justify-center gap-6">
              <a
                href="https://github.com/piyushrivastava"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              >
                <IconBrandGithub className="h-5 w-5 text-neutral-400 transition-colors group-hover:text-white" />
              </a>
              <a
                href="https://linkedin.com/in/piyushrivastava"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              >
                <IconBrandLinkedin className="h-5 w-5 text-neutral-400 transition-colors group-hover:text-white" />
              </a>
              <a
                href="https://twitter.com/piyushrivastava"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              >
                <IconBrandX className="h-5 w-5 text-neutral-400 transition-colors group-hover:text-white" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Piyush Shrivastava. All rights
            reserved.
          </p>
          <p className="text-sm text-neutral-600">
            Built with Next.js, Tailwind CSS & Aceternity UI
          </p>
        </div>
      </footer>
    </main>
  );
}
