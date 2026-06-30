/**
 * @file types/index.ts
 * @description Single source of truth for ALL TypeScript interfaces used
 *              across the Context-Aware Pitch Generator application.
 */

// ─────────────────────────────────────────────────────────────────────────────
// MASTER PROFILE
// ─────────────────────────────────────────────────────────────────────────────

/** A single portfolio project showcased in the master profile */
export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  outcome?: string;
  year?: number;
}

/** The complete professional identity of the application user */
export interface MasterProfile {
  id?: string;
  profileName?: string;
  isDefault?: boolean;
  fullName: string;
  jobTitle: string;
  bio: string;
  skills: string[];
  projects: Project[];
  email?: string;
  websiteUrl?: string;
  avatarUrl?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT CONTEXT
// ─────────────────────────────────────────────────────────────────────────────

export type PitchStyle = "Persuasive" | "Analytical" | "Creative" | "Bold";
export type PitchLength = "Short" | "Medium" | "Long";

export interface ClientContext {
  targetAudience: string;
  pitchGoal: string;
  style: PitchStyle;
  length: PitchLength;
  /** Optional extra context: pasted job description, RFP excerpt, etc. */
  rawContext?: string;
  /** Optional subset of profile skills selected for generation */
  selectedSkills?: string[];
  /** Slider value from 0 to 100 where 0 is Formal, 100 is Casual */
  toneValue?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// GENERATED PITCH — Structured AI output
// ─────────────────────────────────────────────────────────────────────────────

/** Scenario A: Strategic, analytical, metric-oriented */
export interface PitchScenarioA {
  label: string;
  title: string;
  content: string;
  bullets: string[];
  headline?: string;
}

/** A single stat/value highlight with a Lucide icon key */
export interface PitchStat {
  label: string;
  /** One of: rocket | lightbulb | shield | zap | users | trending-up | award | heart | target */
  icon: string;
  value?: string;
}

/** Scenario B: Energetic, visionary, product-focused */
export interface PitchScenarioB {
  label: string;
  title: string;
  content: string;
  stats: PitchStat[];
}

export interface FitAnalysis {
  alignmentScore: number;
  strengths: string[];
  gaps: string[];
}

/** Complete structured output from the Gemini API */
export interface GeneratedPitch {
  scenarioA: PitchScenarioA;
  scenarioB: PitchScenarioB;
  matchAnalysis?: FitAnalysis;
}

// ─────────────────────────────────────────────────────────────────────────────
// SAVED PITCH — Persistence record
// ─────────────────────────────────────────────────────────────────────────────

export interface SavedPitch {
  id: string;
  createdAt: string;
  date: string;
  context: ClientContext;
  pitch: GeneratedPitch;
  profileSnap: {
    fullName: string;
    jobTitle: string;
    avatarUrl?: string;
  };
  starred?: boolean;
  note?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// UI COMPONENT PROP TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface PitchCardProps {
  pitch: SavedPitch;
  onDelete: (id: string) => void;
  onLoad: (pitch: SavedPitch) => void;
  onStar?: (id: string) => void;
  className?: string;
}

export interface ScenarioPanelProps {
  scenario: PitchScenarioA | PitchScenarioB;
  type: "A" | "B";
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}

export interface ProfileFormProps {
  initialProfile: MasterProfile;
  onSave: (profile: MasterProfile) => Promise<void>;
  isSaving?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// API / SERVER ACTION TYPES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generic server response wrapper.
 * Exactly one of `data` or `error` will be non-null.
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export type PitchGenerationStatus = "idle" | "loading" | "success" | "error";

export interface ToastPayload {
  message: string;
  type: "success" | "error" | "info";
  id?: string;
}
