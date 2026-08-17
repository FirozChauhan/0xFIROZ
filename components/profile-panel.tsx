import { profile, skills } from "@/lib/data";
import {
  ClockIcon,
  DownloadIcon,
  ExternalLinkIcon,
  GitHubIcon,
  MailIcon,
  MapPinIcon,
} from "@/components/icons";

export function ProfilePanel() {
  // Direct Cloudflare link to the resume PDF (set in .env as NEXT_PUBLIC_RESUME_URL).
  const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || "#";
  return (
    <aside className="panel-pattern relative flex h-full flex-col overflow-hidden border border-line bg-surface/85 backdrop-blur-sm animate-slideIn">
      {/* accent hairline */}
      <div className="top-accent absolute inset-x-0 top-0" aria-hidden />

      <div className="relative flex flex-col gap-3.5 p-5">
        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-white via-[#8ea2ff] to-accent flex items-center justify-center text-3xl font-black text-black ring-2 ring-background">
              F
            </div>
            {/* online pulse ring */}
            <span
              className="pulse-glow absolute -inset-1 rounded-full border border-accent-line"
              aria-hidden
            />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-3xl font-black tracking-tight leading-none text-foreground">
              {profile.name}
            </h1>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-online pulse-glow" />
                <p className="text-xs uppercase tracking-[0.2em] text-muted font-mono">
                  {profile.role}
                </p>
              </div>
              <span className="chip">
                <span className="h-1.5 w-1.5 rounded-full bg-online" />
                open to work
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white text-sm font-medium px-4 py-2.5 transition-all duration-200 hover:bg-accent-strong active:scale-[0.98]"
            >
              <DownloadIcon />
              Download Resume
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-line-strong bg-transparent text-white text-sm font-medium px-4 py-2.5 transition-all duration-200 hover:border-accent hover:text-accent-strong"
            >
              <GitHubIcon />
              GitHub
              <ExternalLinkIcon />
            </a>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 space-y-2">
          <p className="section-header">Summary</p>
          <p className="text-sm text-tertiary leading-normal text-justify">
            {profile.summary}
          </p>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <p className="section-header">Contact</p>
          <ul className="space-y-1.5 text-sm">
            <li className="group flex items-center gap-2.5 text-muted">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-line bg-surface-light text-tertiary transition-colors group-hover:border-accent group-hover:text-accent-strong">
                <MapPinIcon />
              </span>
              <span className="truncate">{profile.location}</span>
            </li>
            <li className="group flex items-center gap-2.5 text-muted">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-line bg-surface-light text-tertiary transition-colors group-hover:border-accent group-hover:text-accent-strong">
                <MailIcon />
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="truncate transition-colors hover:text-accent-strong"
              >
                {profile.email}
              </a>
            </li>
            <li className="group flex items-center gap-2.5 text-muted">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-line bg-surface-light text-tertiary transition-colors group-hover:border-accent group-hover:text-accent-strong">
                <ClockIcon />
              </span>
              <span>{profile.timezone}</span>
            </li>
          </ul>
        </div>

        {/* Technical Skills */}
        <div className="mt-3 space-y-2">
          <p className="section-header">Technical Skills</p>
          <div className="space-y-2">
            {skills.map((s) => (
              <div key={s.group} className="space-y-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {s.group}
                </p>
                <div className="flex flex-wrap gap-1">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="border border-line bg-surface-light px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-tertiary transition-colors hover:border-accent hover:text-accent-strong"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}