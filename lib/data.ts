/* Resume & GitHub data for the portfolio. */

export interface Project {
  name: string;
  stack: string;
  description: string;
  points: string[];
  repo: string;
  featured?: boolean;
}

export interface EduItem {
  degree: string;
  school: string;
  date: string;
}

export const profile = {
  name: "Firoz Khan Chauhan",
  role: "Full Stack Developer",
  location: "Meerut, Uttar Pradesh, IN",
  email: "firozchauhan0001@gmail.com",
  github: "https://github.com/FirozChauhan",
  githubHandle: "github.com/FirozChauhan",
  timezone: "UTC +05:30",
  summary:
    "Full-stack developer building scalable web apps with the MERN stack and Docker. Hackathon winner with a shipped music streaming app and custom Linux tools. Passionate about creating high-impact, production-ready features that users actually love.",
};

export const experience = {
  title: "Front-End Development Intern",
  org: "Sarvam Foundation",
  date: "Dec 2025 – Apr 2026",
  points: [
    "Built responsive UI components using React.js, improving cross-device accessibility and engagement.",
    "Customized WordPress themes/plugins for SEO gains and optimized site architecture.",
    "Integrated REST APIs with marketing tools (Mailchimp/HubSpot) to automate donor pipelines and reduce manual data entry.",
  ],
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "C/C++"],
  },
  {
    group: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Shadcn UI"],
  },
  {
    group: "Backend & BaaS",
    items: ["Node.js", "Express.js", "REST APIs", "Socket.io", "Firebase"],
  },
  {
    group: "Databases & Storage",
    items: ["PostgreSQL", "MongoDB", "Cloudinary", "Cloudflare R2"],
  },
  {
    group: "Tools & DevOps",
    items: ["Git", "GitHub", "Linux (Bash)", "Docker"],
  },
];

export const projects: Project[] = [
  {
    name: "Tyla",
    stack: "TypeScript · Express.js · MongoDB (Mongoose) · Sharp · Firebase Auth · Vite",
    description:
      "Image processing API for developers — upload once, transform forever via a single composable URL, with per-key analytics.",
    points: [
      "Transform images on the fly with a single composable URL — resize, crop, optimize without storing variants.",
      "Per-key analytics and secure uploads with Firebase Admin auth over an Express/MongoDB backend.",
    ],
    repo: "https://github.com/FirozChauhan/Tyla",
    featured: true,
  },
  {
    name: "OOB",
    stack:
      "Next.js · React 19 · TypeScript · PostgreSQL · Firebase Auth · Socket.io",
    description:
      "Real-time media collaboration board — live canvas drawing, synced playback, file uploads, and room-based chat.",
    points: [
      "Real-time collaboration board with live canvas drawing, synced audio/video playback, file uploads and room chat.",
      "Low-latency backend over WebSockets + Cloudinary, wired to Firebase auth for seamless data sync.",
    ],
    repo: "https://github.com/FirozChauhan/oob",
    featured: true,
  },
];

export const education: EduItem[] = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "CCSU, Meerut, Uttar Pradesh",
    date: "Aug 2024 – Present",
  },
  {
    degree: "Senior Secondary (XII) · Science",
    school: "Army Public School, Bhatinda, Punjab",
    date: "Completed 2024",
  },
  {
    degree: "Secondary (X)",
    school: "Army Public School, Lucknow, Uttar Pradesh",
    date: "Completed 2022",
  },
];
