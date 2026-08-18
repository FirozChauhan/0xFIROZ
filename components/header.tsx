import { profile } from "@/lib/data";
import { getAppVersion } from "@/lib/version";
import { GitHubIcon, MailIcon } from "@/components/icons";

export function Header() {
  const version = getAppVersion();
  return (
    <header className="relative shrink-0 bg-black pt-[env(safe-area-inset-top)]">
      {/* Accent hairline across the very top */}
      <div className="top-accent absolute inset-x-0 top-0" aria-hidden />

      {/* Row 1 — brand + actions */}
      <div className="flex h-14 items-center gap-3 border-b border-line px-4">
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono text-xl font-bold leading-none tracking-[0.2em] text-foreground">
            0xFIROZ
          </span>
          {version && (
            <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-muted">
              v{version}
            </span>
          )}
        </div>

        <div className="flex-1" />

        <div className="hidden sm:flex items-center gap-1.5">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            title={profile.email}
            className="flex h-9 w-9 items-center justify-center rounded-sm text-muted transition-all duration-200 hover:bg-surface-light hover:text-accent-strong"
          >
            <MailIcon />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title={profile.githubHandle}
            className="flex h-9 w-9 items-center justify-center rounded-sm text-muted transition-all duration-200 hover:bg-surface-light hover:text-accent-strong"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </header>
  );
}