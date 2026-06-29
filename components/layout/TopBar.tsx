/**
 * @file components/layout/TopBar.tsx
 * @description Top application header with AI engine status indicator.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_TABS = [
  { href: "/dashboard",  label: "🏠 Dashboard" },
  { href: "/profile",    label: "👤 Profile" },
  { href: "/projects",   label: "💼 Projects" },
  { href: "/pitches",    label: "✨ Saved Pitches" },
  { href: "/analytics",  label: "📈 Analytics" },
  { href: "/settings",   label: "⚙️ Settings" },
  { href: "/help",       label: "❓ Help" },
] as const;

interface TopBarProps {
  hasApiKey?: boolean;
}

export function TopBar({ hasApiKey = false }: TopBarProps) {
  const pathname = usePathname();

  return (
    <header className="h-16 w-full flex justify-between items-center px-6 border-b border-outline-variant bg-surface-container-lowest sticky top-0 z-10 shrink-0">
      {/* Left: brand + status badge */}
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-secondary" />
        <h1 className="text-lg font-bold font-geist text-primary tracking-tight">
          PitchPerfect
        </h1>
        <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container-low text-primary-container border border-outline-variant">
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              hasApiKey ? "bg-secondary animate-pulse" : "bg-outline"
            )}
          />
          {hasApiKey ? "AI Engine Connected" : "Local Playground Mode"}
        </span>
      </div>

      {/* Right: mobile nav select + generate button */}
      <div className="flex items-center gap-2">
        {/* Mobile nav dropdown */}
        <div className="md:hidden">
          <select
            value={pathname}
            onChange={(e) => { window.location.href = e.target.value; }}
            className="bg-surface-container-low text-primary text-xs font-semibold px-3 py-1.5 rounded-lg outline-none border border-outline-variant"
          >
            {MOBILE_TABS.map(({ href, label }) => (
              <option key={href} value={href}>{label}</option>
            ))}
          </select>
        </div>

        {/* Generate button */}
        <Link
          href="/generate"
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
            "bg-primary text-on-primary hover:bg-primary/90"
          )}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Generate</span>
        </Link>
      </div>
    </header>
  );
}
