"use client";

import { useState } from "react";
import { education, experience, projects, skills } from "@/lib/data";
import type { GithubRepo } from "@/lib/github";
import {
  BookOpenIcon,
  BriefcaseIcon,
  Code2Icon,
  ExternalLinkIcon,
  GitHubIcon,
  GraduationCapIcon,
  LayersIcon,
  RocketIcon,
  SparkleIcon,
} from "@/components/icons";

type Tab = "projects" | "experience" | "skills" | "education";

const TABS: { id: Tab; label: string; icon: typeof Code2Icon }[] = [
  { id: "projects", label: "Projects", icon: RocketIcon },
  { id: "experience", label: "Experience", icon: BriefcaseIcon },
  { id: "skills", label: "Skills", icon: LayersIcon },
  { id: "education", label: "Education", icon: GraduationCapIcon },
];

function SectionHeader({ icon: Icon, children }: { icon: typeof Code2Icon; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="text-foreground" />
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
        {children}
      </h2>
    </div>
  );
}

function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  return (
    <article className="group border border-[#d9d9d9] bg-[#131313] p-5 flex flex-col gap-3 transition-colors duration-200 hover:bg-[#1d1d1d] animate-fadeIn">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-br from-[#ffffff] to-[#c9c9c9] text-black">
            <Code2Icon />
          </span>
          <div>
            <h3 className="text-base font-extrabold tracking-tight leading-none text-foreground">
              {p.name}
            </h3>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
              {p.repo.split("/").pop()}
            </span>
          </div>
        </div>
        <a
          href={p.repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${p.name} repository`}
          className="p-1.5 rounded-sm text-muted hover:text-foreground hover:bg-[#0a0a0a] transition-all duration-200"
        >
          <ExternalLinkIcon />
        </a>
      </div>

      <p className="text-sm text-tertiary leading-relaxed">{p.description}</p>

      <ul className="space-y-1.5">
        {p.points.map((pt, i) => (
          <li key={i} className="flex gap-2 text-xs text-muted leading-relaxed">
            <SparkleIcon className="shrink-0 mt-0.5 text-tertiary" />
            <span>{pt}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        {p.stack.split(" · ").map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] uppercase tracking-[0.15em] border border-[#d9d9d9] px-2 py-0.5 text-muted bg-[#0a0a0a]"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
export function MainPanel({ repos = [] }: { repos?: GithubRepo[] }) {
  const [tab, setTab] = useState<Tab>("projects");

  return (
    <section className="flex flex-col border border-[#d9d9d9] bg-[#0a0a0a] min-h-0 animate-fadeIn">
      <div
        role="tablist"
        aria-label="Portfolio sections"
        className="flex items-center gap-1 border-b border-[#d9d9d9] bg-[#131313] px-3 py-2"
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
              className={`flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                active
                  ? "bg-[#d9d9d9] text-black"
                  : "text-muted hover:bg-[#1d1d1d] hover:text-foreground"
              }`}
            >
              <Icon />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        {tab === "projects" && (
          <div className="space-y-4">
            <SectionHeader icon={Code2Icon}>
              Featured work → github.com/FirozChauhan
            </SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <ProjectCard key={p.name} p={p} />
              ))}
            </div>
            <div className="space-y-3">
              <SectionHeader icon={GitHubIcon}>More from GitHub</SectionHeader>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {repos.map((r) => (
                  <li key={r.name}>
                    <a
                      href={r.repo}
                      target="_blank"
                      rel="noreferrer"
                      title={r.description || r.name}
                      className="flex items-center justify-between border border-[#d9d9d9] bg-[#131313] px-4 py-3 hover:bg-[#1d1d1d] transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <BookOpenIcon className="shrink-0 text-muted" />
                        <span className="font-mono text-xs text-foreground truncate">
                          {r.name}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-muted shrink-0">
                        {r.lang}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === "experience" && (
          <div className="space-y-3">
            <SectionHeader icon={BriefcaseIcon}>Work experience</SectionHeader>
            <div className="border border-[#d9d9d9] bg-[#131313] p-5 animate-fadeIn">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-base font-extrabold tracking-tight text-foreground">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-tertiary">{experience.org}</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted border border-[#d9d9d9] px-2 py-1">
                  {experience.date}
                </span>
              </div>
              <ul className="space-y-2">
                {experience.points.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-xs text-muted leading-relaxed">
                    <SparkleIcon className="shrink-0 mt-0.5 text-tertiary" />
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
                  className="border border-[#d9d9d9] bg-[#131313] p-4 transition-colors duration-200 hover:bg-[#1d1d1d] animate-fadeIn"
                >
                  <p className="section-header mb-3">{s.group}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-[10px] uppercase tracking-[0.15em] border border-[#d9d9d9] px-2 py-1 text-muted bg-[#0a0a0a]"
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
                  className="flex items-start justify-between gap-3 border border-[#d9d9d9] bg-[#131313] p-4 transition-colors duration-200 hover:bg-[#1d1d1d] animate-fadeIn"
                >
                  <div>
                    <h3 className="text-sm font-bold tracking-tight text-foreground">
                      {e.degree}
                    </h3>
                    <p className="text-xs text-tertiary mt-0.5">{e.school}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-muted border border-[#d9d9d9] px-2 py-1">
                    {e.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}


