"use client";

import { useState } from "react";
import { education, experience, projects, skills } from "@/lib/data";
import type { GithubRepo } from "@/lib/github";
import {
  ArrowUpRightIcon,
  BriefcaseIcon,
  Code2Icon,
  ExternalLinkIcon,
  GitHubIcon,
  GraduationCapIcon,
  LayersIcon,
  PinIcon,
  RocketIcon,
  SparkleIcon,
} from "@/components/icons";
import { BrandIcon } from "@/components/brand-icons";

type Tab = "projects" | "experience" | "skills" | "education";

const TABS: { id: Tab; label: string; icon: typeof Code2Icon }[] = [
  { id: "projects", label: "Projects", icon: RocketIcon },
  { id: "experience", label: "Experience", icon: BriefcaseIcon },
  { id: "skills", label: "Skills", icon: LayersIcon },
  { id: "education", label: "Education", icon: GraduationCapIcon },
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#4f8cff",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
};
const LANG_FALLBACK = "#9c9c9c";

// Local favicons captured from each repo's live deployment (public/favicons).
const LOCAL_FAVICONS: Record<string, string> = {
  "0xFIROZ": "/favicon.png",
  Fanaa: "/favicons/fanaa.svg",
  Jigar: "/favicons/jigar.png",
  oob: "/favicons/oob.svg",
  Tyla: "/favicons/tyla.svg",
  johanka: "/favicons/johanka.svg",
  pebbles: "/favicons/pebbles.png",
};

function RepoFavicon({ name }: { name: string }) {
  const src = LOCAL_FAVICONS[name];
  if (!src) {
    return (
      <span className="flex h-full w-full items-center justify-center rounded-[2px] bg-gradient-to-br from-accent to-[#1e40af] font-mono text-[10px] font-bold text-white">
        {name.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={16}
      height={16}
      loading="lazy"
      className="h-4 w-4 object-contain"
    />
  );
}

const TECH_COLORS: Record<string, string> = {
  "JavaScript (ES6+)": "#F7DF1E",
  TypeScript: "#3178C6",
  Python: "#3776AB",
  "C/C++": "#00599C",
  "React.js": "#61DAFB",
  "Next.js": "#e4e4e7",
  "Tailwind CSS": "#06B6D4",
  "Shadcn UI": "#e2e8f0",
  "Node.js": "#5FA04E",
  "Express.js": "#d4d4d8",
  "REST APIs": "#f43f5e",
  "Socket.io": "#d1d5db",
  Firebase: "#FFCA28",
  PostgreSQL: "#4169E1",
  MongoDB: "#47A248",
  Cloudinary: "#3448C5",
  "Cloudflare R2": "#F6821F",
  Git: "#F05032",
  GitHub: "#8b949e",
  "Linux (Bash)": "#d4d4d4",
  Docker: "#2496ED",
};

const TOOLS = [
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Firebase",
  "Docker",
  "Tailwind CSS",
];

function toolColor(name: string): string {
  return TECH_COLORS[name] || `hsl(${name.length * 47 % 360} 70% 62%)`;
}

function SectionHeader({ icon: Icon, children }: { icon: typeof Code2Icon; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="text-accent-strong" />
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
        {children}
      </h2>
    </div>
  );
}

function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  return (
    <article className="group relative flex flex-col gap-3 border border-line bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-light">
      <span
        className="absolute inset-x-0 top-0 h-px bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-br from-white to-[#8ea2ff] text-black">
            <Code2Icon />
          </span>
          <div>
            <h3 className="font-display text-base font-bold tracking-tight leading-none text-foreground">
              {p.name}
            </h3>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
              {p.repo.split("/").pop()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {p.featured && (
            <span className="chip chip-accent">
              <PinIcon className="h-3 w-3" />
              pinned
            </span>
          )}
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            aria-label={`${p.name} repository`}
            className="p-1.5 rounded-sm text-muted hover:text-accent-strong hover:bg-surface-soft transition-all duration-200"
          >
            <ExternalLinkIcon />
          </a>
        </div>
      </div>

      <p className="text-sm text-tertiary leading-relaxed">{p.description}</p>

      <ul className="space-y-1.5">
        {p.points.map((pt, i) => (
          <li key={i} className="flex gap-2 text-xs text-muted leading-relaxed">
            <SparkleIcon className="shrink-0 mt-0.5 text-accent" />
            <span>{pt}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex flex-wrap gap-2">
          {p.stack.split(" · ").map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-[0.15em] border border-line px-2 py-0.5 text-muted bg-background transition-colors group-hover:border-line-strong"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={p.repo}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-strong opacity-0 transition-all duration-200 group-hover:opacity-100 hover:text-white sm:flex"
        >
          open repo
          <ArrowUpRightIcon />
        </a>
      </div>
    </article>
  );
}

export function MainPanel({ repos = [] }: { repos?: GithubRepo[] }) {
  const [tab, setTab] = useState<Tab>("projects");

  return (
    <section className="panel-pattern relative flex flex-col border border-line bg-background/85 backdrop-blur-sm animate-fadeIn md:h-full">
      {/* Accent hairline */}
      <div className="top-accent absolute inset-x-0 top-0" aria-hidden />

      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Portfolio sections"
        className="tab-scroll flex items-center gap-1 overflow-x-auto border-b border-line bg-surface px-3 py-2"
      >
        {TABS.map((t) => {
          const active = tab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`relative flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm px-3 py-2 text-xs font-medium transition-all duration-200 ${
                active
                  ? "text-foreground"
                  : "text-muted hover:bg-surface-light hover:text-foreground"
              }`}
            >
              <Icon />
              {t.label}
              <span
                className={`absolute inset-x-2 bottom-0 h-0.5 rounded-full transition-opacity duration-200 ${
                  active ? "bg-accent opacity-100" : "opacity-0"
                }`}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      {/* Stat strip */}
      <div className="flex items-center justify-between gap-2 border-b border-line bg-surface/60 px-4 py-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="hidden sm:flex flex-wrap items-center gap-1" aria-label="Toolbox">
            {TOOLS.map((tool) => {
              const c = toolColor(tool);
              return (
                <span
                  key={tool}
                  style={{
                    color: `color-mix(in srgb, ${c} 62%, #ffffff)`,
                    borderColor: `${c}45`,
                  }}
                  className="inline-flex items-center gap-1.5 border border-line bg-surface-light py-1 pl-1.5 pr-2 leading-none"
                >
                  <span
                    className="flex h-4 w-4 items-center justify-center overflow-hidden"
                    style={{ color: c }}
                  >
                    <BrandIcon name={tool} className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em]">
                    {tool}
                  </span>
                </span>
              );
            })}
          </span>
        </div>
      </div>

      <div className="p-4 md:min-h-0 md:flex-1 md:overflow-y-auto">
        {tab === "projects" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p, i) => (
                <ProjectCard key={p.name} p={p} />
              ))}
            </div>

            <div className="space-y-3">
              <SectionHeader icon={GitHubIcon}>More from GitHub</SectionHeader>
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {repos.map((r) => (
                  <li key={r.name}>
                    <div
                      title={r.description || r.name}
                      role="link"
                      tabIndex={0}
                      onClick={() => window.open(r.repo, "_blank")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          window.open(r.repo, "_blank");
                        }
                      }}
                      className="group relative flex cursor-pointer items-center justify-between gap-2 border border-line bg-surface px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-light hover:shadow-[0_10px_30px_-16px_rgba(59,130,246,0.35)]"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      />
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-line bg-surface-soft transition-colors group-hover:border-line-strong">
                          <RepoFavicon name={r.name} />
                        </span>
                        <span className="font-mono text-xs text-foreground truncate">
                          {r.name}
                        </span>
                      </div>
                      <span className="relative flex shrink-0 items-center">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: LANG_COLORS[r.lang] || LANG_FALLBACK }}
                          aria-hidden
                        />
                        {/* Label is the visible element (right side); links overlay it on hover */}
                        <span className="relative ml-1.5 flex items-center sm:block">                          <span className="hidden translate-x-0 whitespace-nowrap text-[10px] uppercase tracking-wider text-muted transition-all duration-200 ease-out delay-150 group-hover:delay-0 group-hover:-translate-x-2 group-hover:opacity-0 sm:inline-block">
                            {r.lang}
                          </span>
                          <span className="flex items-center gap-1.5 transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] sm:absolute sm:inset-y-0 sm:right-0 sm:translate-x-2 sm:opacity-0 sm:pointer-events-none sm:group-focus-within:delay-0 sm:group-focus-within:translate-x-0 sm:group-focus-within:opacity-100 sm:group-focus-within:pointer-events-auto sm:group-hover:delay-100 sm:group-hover:translate-x-0 sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto">
                            {r.homepage && (
                              <a
                                href={r.homepage}
                                target="_blank"
                                rel="noreferrer"
                                title={`${r.name} — live site`}
                                aria-label={`${r.name} — open live site`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex h-8 w-8 items-center justify-center rounded-sm text-muted transition-colors duration-150 hover:bg-surface-soft hover:text-accent-strong sm:h-7 sm:w-7"
                              >
                                <ExternalLinkIcon className="h-4 w-4" />
                              </a>
                            )}
                            <a
                              href={r.repo}
                              target="_blank"
                              rel="noreferrer"
                              title={`${r.name} — source code`}
                              aria-label={`${r.name} — open source code`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex h-8 w-8 items-center justify-center rounded-sm text-muted transition-colors duration-150 hover:bg-surface-soft hover:text-foreground sm:h-7 sm:w-7"
                            >
                              <GitHubIcon className="h-4 w-4" />
                            </a>
                          </span>
                        </span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === "experience" && (
          <div className="space-y-3">
            <SectionHeader icon={BriefcaseIcon}>Work experience</SectionHeader>
            <div className="group relative border border-line bg-surface p-5 transition-colors duration-200 hover:bg-surface-light animate-fadeIn">
              <span
                className="absolute inset-x-0 top-0 h-px bg-accent opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-display text-base font-bold tracking-tight text-foreground">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-tertiary">{experience.org}</p>
                </div>
                <span className="chip">
                  <span className="text-online" aria-hidden>
                    ●
                  </span>
                  {experience.date}
                </span>
              </div>
              <ul className="space-y-2">
                {experience.points.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-xs text-muted leading-relaxed">
                    <SparkleIcon className="shrink-0 mt-0.5 text-accent" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === "skills" && (
          <div className="space-y-3">
            <SectionHeader icon={LayersIcon}>Technical skills</SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {skills.map((s) => (
                <div
                  key={s.group}
                  className="group border border-line bg-surface p-4 transition-all duration-200 hover:border-line-strong hover:bg-surface-light animate-fadeIn"
                >
                  <p className="flex items-center gap-2 section-header mb-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                    {s.group}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-[10px] uppercase tracking-[0.15em] border border-line px-2 py-1 text-muted bg-background transition-colors hover:border-accent hover:text-accent-strong"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "education" && (
          <div className="space-y-3">
            <SectionHeader icon={GraduationCapIcon}>Education</SectionHeader>
            <ul className="space-y-3">
              {education.map((e, i) => (
                <li
                  key={i}
                  className="group relative border border-line bg-surface p-4 transition-all duration-200 hover:border-line-strong hover:bg-surface-light animate-fadeIn"
                >
                  <span
                    className="absolute inset-y-0 left-0 w-0.5 bg-accent opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-sm font-bold tracking-tight text-foreground">
                        {e.degree}
                      </h3>
                      <p className="text-xs text-tertiary mt-0.5">{e.school}</p>
                    </div>
                    <span className="shrink-0 chip">{e.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}