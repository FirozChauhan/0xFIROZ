import { profile } from "@/lib/data";
import { getAppVersion } from "@/lib/version";
import { GitHubIcon, MailIcon } from "@/components/icons";

export function Header() {
  const version = getAppVersion();
  return (
    <header className="h-14 shrink-0 bg-black border-b border-[#d9d9d9] px-4 flex items-center gap-3">
      {/* Brand / logo text + git tag version */}
      <div className="mr-2 flex items-baseline gap-2">
        <span className="font-mono text-xl font-bold tracking-[0.2em] text-foreground">
          0xFIROZ
        </span>
        {version && (
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
            v{version}
          </span>
        )}
      </div>

      <div className="flex-1" />

      {/* Header actions */}
      <div className="hidden sm:flex items-center gap-2">
        <a
          href={`mailto:${profile.email}`}
          aria-label="Email"
          title={profile.email}
          className="p-2 rounded-sm text-muted hover:bg-[#1d1d1d] hover:text-foreground transition-all duration-200"
        >
          <MailIcon />
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          title={profile.githubHandle}
          className="p-2 rounded-sm text-muted hover:bg-[#1d1d1d] hover:text-foreground transition-all duration-200"
        >
          <GitHubIcon />
        </a>
      </div>
    </header>
  );
}
