/**
 * @file components/layout/Sidebar.tsx
 * @description Left navigation sidebar — mirrors the Vite prototype's nav exactly.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Home,
  User,
  Briefcase,
  FileText,
  TrendingUp,
  Settings,
  HelpCircle,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard",  label: "Dashboard",      icon: Home },
  { href: "/profile",    label: "Master Profile",  icon: User },
  { href: "/projects",   label: "Projects",        icon: Briefcase },
  { href: "/pitches",    label: "Saved Pitches",   icon: FileText },
  { href: "/analytics",  label: "Analytics",       icon: TrendingUp },
  { href: "/settings",   label: "Settings",        icon: Settings },
  { href: "/help",       label: "Help",             icon: HelpCircle },
] as const;

interface SidebarProps {
  /** User's full name for the profile chip at the bottom */
  fullName?: string;
  jobTitle?: string;
  avatarUrl?: string;
}

export function Sidebar({ fullName = "Jane Doe", jobTitle = "Strategic Designer", avatarUrl }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex w-[280px] h-screen flex-col border-r border-outline-variant bg-surface shrink-0 py-6">
      {/* Brand */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold font-geist text-primary tracking-tight">
          Synthesis AI
        </h2>
        <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant/80">
          Context-Aware Generator
        </p>
      </div>

      {/* Generate CTA */}
      <div className="px-6 mb-6">
        <Link
          href="/generate"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Generate New Pitch
        </Link>
      </div>

      {/* Nav links */}
      <div className="flex-1 px-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group",
                isActive
                  ? "bg-primary-container text-on-primary-container"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  isActive ? "text-on-primary-container" : "text-on-surface-variant group-hover:text-secondary"
                )}
              />
              {label}
            </Link>
          );
        })}
      </div>

      {/* Profile chip */}
      <div className="px-6 mt-6 pt-6 border-t border-outline-variant flex items-center gap-3">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt={fullName} className="w-9 h-9 rounded-full object-cover border border-outline-variant" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-on-primary-container" />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary truncate">{fullName}</p>
          <p className="text-xs text-on-surface-variant truncate">{jobTitle}</p>
        </div>
      </div>
    </nav>
  );
}
