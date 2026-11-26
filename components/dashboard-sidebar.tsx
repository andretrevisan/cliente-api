import { Building2, GraduationCap } from "lucide-react";

export default function DashboardSidebar() {
  return (
    <aside className="bg-[#13293D] px-5 py-5 text-white md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col md:px-6 md:py-8">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-[#1B98E0]">
          <GraduationCap className="size-6" aria-hidden="true" />
        </span>
        <div>
          <p className="font-semibold tracking-wide">Universidades</p>
          <p className="text-xs text-white/60">Painel</p>
        </div>
      </div>
      <div className="mt-9 hidden md:block">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
          Menu
        </p>
        <div className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3 text-sm font-medium">
          <Building2 className="size-4 text-[#1B98E0]" aria-hidden="true" />
          Universidades
        </div>
      </div>
      <div className="mt-auto hidden border-t border-white/10 pt-5 text-xs text-white/55 md:block">
        API MockAPI
      </div>
    </aside>
  );
}
