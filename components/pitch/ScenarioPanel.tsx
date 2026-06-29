/**
 * @file components/pitch/ScenarioPanel.tsx
 * @description Renders a single pitch scenario (A or B) side-by-side.
 */
"use client";

import {
  Rocket, Lightbulb, Shield, Zap, Users,
  TrendingUp, Award, Heart, Target, Sparkles,
  Copy, Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PitchScenarioA, PitchScenarioB, PitchStat } from "@/types";

function StatIcon({ name }: { name: string }) {
  const cls = "w-5 h-5";
  switch (name.toLowerCase()) {
    case "rocket":      return <Rocket className={cls} />;
    case "lightbulb":  return <Lightbulb className={cls} />;
    case "shield":     return <Shield className={cls} />;
    case "zap":        return <Zap className={cls} />;
    case "users":      return <Users className={cls} />;
    case "trending-up": return <TrendingUp className={cls} />;
    case "award":      return <Award className={cls} />;
    case "heart":      return <Heart className={cls} />;
    case "target":     return <Target className={cls} />;
    default:           return <Sparkles className={cls} />;
  }
}

interface ScenarioPanelProps {
  scenario: PitchScenarioA | PitchScenarioB;
  type: "A" | "B";
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}

export function ScenarioPanel({ scenario, type, onCopy, copiedId }: ScenarioPanelProps) {
  const copyId = `scenario-${type}`;
  const isCopied = copiedId === copyId;

  const isA = type === "A";
  const scenarioA = isA ? (scenario as PitchScenarioA) : null;
  const scenarioB = !isA ? (scenario as PitchScenarioB) : null;

  const fullText = isA
    ? `${scenario.title}\n\n${scenario.content}\n\n${scenarioA?.bullets.join("\n")}`
    : `${scenario.title}\n\n${scenario.content}\n\n${scenarioB?.stats.map((s: PitchStat) => s.label).join("\n")}`;

  return (
    <div
      className={cn(
        "flex-1 rounded-2xl border p-6 flex flex-col gap-4 relative",
        isA
          ? "bg-surface-container-lowest border-outline-variant"
          : "bg-primary-container/5 border-primary-container/30"
      )}
    >
      {/* Label + copy */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className={cn(
            "inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2",
            isA
              ? "bg-surface-container text-on-surface-variant"
              : "bg-secondary-container/40 text-on-secondary-container"
          )}>
            {scenario.label}
          </span>
          <h3 className="text-base font-bold font-geist text-primary leading-tight">
            {scenario.title}
          </h3>
        </div>
        <button
          onClick={() => onCopy(fullText, copyId)}
          title="Copy to clipboard"
          className="shrink-0 mt-1 p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-secondary transition-colors"
        >
          {isCopied ? <Check className="w-4 h-4 text-secondary" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Content paragraph */}
      <p className="text-sm text-on-surface-variant leading-relaxed">{scenario.content}</p>

      {/* Scenario A: bullets */}
      {isA && scenarioA && (
        <ul className="space-y-2 mt-auto">
          {scenarioA.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-on-surface">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* Scenario B: stat cards */}
      {!isA && scenarioB && (
        <div className="flex flex-wrap gap-3 mt-auto">
          {scenarioB.stats.map((stat: PitchStat, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl bg-secondary-container/20 border border-secondary-container/30 text-on-secondary-container min-w-[100px]"
            >
              <StatIcon name={stat.icon} />
              {stat.value && (
                <span className="text-sm font-bold text-secondary">{stat.value}</span>
              )}
              <span className="text-xs font-semibold text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
