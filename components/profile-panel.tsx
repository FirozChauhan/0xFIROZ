import { profile, skills } from "@/lib/data";
import {
  ClockIcon,
  DownloadIcon,
  ExternalLinkIcon,
  GitHubIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";

export function ProfilePanel() {
  // Direct Cloudflare link to the resume PDF (set in .env as NEXT_PUBLIC_RESUME_URL).
  const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || "#";
  return (
    <aside className="relative flex h-full flex-col border border-[#d9d9d9] bg-[#131313] p-5 animate-slideIn">
      {/* auth-dots texture accent */}
      <div
        className="auth-dots absolute inset-0 opacity-40 pointer-events-none"
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col justify-between gap-5">
        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#ffffff] to-[#c9c9c9] flex items-center justify-center text-3xl font-black text-black ring-2 ring-[#0a0a0a]">
            F
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight leading-none text-foreground">
              {profile.name}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white pulse-glow" />
              <p className="text-xs uppercase tracking-[0.2em] text-muted font-mono">
                {profile.role}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-black text-sm font-medium px-4 py-3 transition-all duration-200 hover:bg-[#cccccc] active:scale-[0.98]"
            >
              <DownloadIcon />
              Download Resume
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#d9d9d9] bg-[#131313] text-white text-sm font-medium px-4 py-3 transition-all duration-200 hover:bg-[#1d1d1d]"
            >
              <GitHubIcon />
              GitHub
              <ExternalLinkIcon />
            </a>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <p className="section-header">Summary</p>
          <p className="text-sm text-tertiary leading-relaxed text-justify">{profile.summary}</p>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <p className="section-header">Contact</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2.5 text-muted">
              <MapPinIcon className="shrink-0 text-tertiary" />
              <span>{profile.location}</span>
            </li>
            <li className="flex items-center gap-2.5 text-muted">
              <MailIcon className="shrink-0 text-tertiary" />
              <a href={`mailto:${profile.email}`} className="hover:text-foreground truncate transition-colors">
                {profile.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-muted">
              <ClockIcon className="shrink-0 text-tertiary" />
              <span>{profile.timezone}</span>
            </li>
          </ul>
        </div>

        {/* Technical Skills */}
        <div className="space-y-3">
          <p className="section-header">Technical Skills</p>
          <div className="space-y-3">
            {skills.map((s) => (
              <p key={s.group} className="text-xs leading-relaxed text-muted">
                <span className="font-semibold text-foreground/85">
                  {s.group}:
                </span>{" "}
                {s.items.join(", ")}
              </p>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
