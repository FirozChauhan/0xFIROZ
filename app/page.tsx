import { Header } from "@/components/header";
import { ProfilePanel } from "@/components/profile-panel";
import { MainPanel } from "@/components/main-panel";
import { getGithubRepos } from "@/lib/github";

export default async function Home() {
  const repos = await getGithubRepos();

  return (
    <div className="board-grid relative flex h-dvh flex-col overflow-hidden">
      {/* Blurred white glow blobs */}
      <div className="glow-blob top-[-120px] left-[-80px] h-[380px] w-[380px]" aria-hidden />
      <div className="glow-blob bottom-[-140px] right-[-100px] h-[420px] w-[420px] opacity-40" aria-hidden />
      <div className="glow-blob top-[30%] left-[45%] h-[300px] w-[300px] opacity-25" aria-hidden />

      <Header />

      <main className="relative z-0 grid flex-1 min-h-0 grid-cols-1 gap-3 p-3 md:grid-cols-12">
        <div className="md:col-span-4 min-h-0 overflow-y-auto">
          <ProfilePanel />
        </div>
        <div className="md:col-span-8 min-h-0">
          <MainPanel repos={repos} />
        </div>
      </main>

      {/* Footer — Arabic signature sits bottom-right inside it */}
      <footer className="relative z-10 h-14 shrink-0 border-t border-[#d9d9d9] bg-black px-4 flex items-center justify-between gap-3">
        <p dir="rtl" className="bg-white font-reem text-lg text-muted leading-tight bg-clip-text text-transparent">
          مصلحت حسن کو بیگانہ بنا دیتی ہے
        </p>
        <span
          dir="rtl"
          className="font-aref text-2xl sm:text-[28px] mb-2"
        >
          {/* Aref Ruqaa Ink ships with baked-in red color glyphs, so plain
              text-* color is ignored by the font. We use a solid background
              clipped to the text shape (bg-clip-text + text-transparent) to
              force a flat color that overrides the font's built-in red. */}
          <span className="bg-[#3b82f6] bg-clip-text text-transparent">فیروز</span>{" "}
          <span className="bg-white bg-clip-text text-transparent">خان چوہان</span>
        </span>
      </footer>
    </div>
  );
}
