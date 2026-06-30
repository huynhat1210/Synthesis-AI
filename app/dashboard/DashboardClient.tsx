/**
 * @file app/dashboard/DashboardClient.tsx
 * @description Unified SPA workspace orchestrating all tab views.
 *              Acts as the central controller keeping the states in sync
 *              and delegating layout rendering to modular subcomponents.
 */
"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Zap,
  Users,
  Plus,
  Bell,
  HelpCircle,
  User,
  Briefcase,
  CheckCircle,
  Home,
  Settings,
  Star,
  Rocket,
  Lightbulb,
  Shield,
  TrendingUp,
  Award,
  Heart,
  Target,
  AlertCircle,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { generatePitchAction } from "@/actions/generatePitch";
import { saveProfileAction } from "@/actions/saveProfile";
import { starPitchAction, deletePitchAction } from "@/actions/managePitches";
import { parsePdfAction } from "@/actions/parsePdf";
import { createProfileAction, selectProfileAction } from "@/actions/manageProfiles";
import { cn } from "@/lib/utils";

// View Subcomponents
import { DashboardView } from "@/components/dashboard/DashboardView";
import { ProfileView } from "@/components/dashboard/ProfileView";
import { ProjectsView } from "@/components/dashboard/ProjectsView";
import { PitchesView } from "@/components/dashboard/PitchesView";
import { AnalyticsView } from "@/components/dashboard/AnalyticsView";
import { SettingsView } from "@/components/dashboard/SettingsView";
import { HelpView } from "@/components/dashboard/HelpView";

import type {
  SavedPitch,
  MasterProfile,
  ClientContext,
  GeneratedPitch,
  Project,
  PitchStyle,
  PitchLength,
} from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// Constants & Defaults
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
];

const INITIAL_INPUTS: ClientContext = {
  targetAudience: "",
  pitchGoal: "Freelance Project Proposal",
  style: "Persuasive",
  length: "Medium",
  toneValue: 50,
};

const INITIAL_RESULT: GeneratedPitch = {
  scenarioA: {
    label: "Scenario A: Finance Target",
    title: "Maximizing ROI through Strategic Redesign",
    content: "By streamlining the core user flows, we project a 15% reduction in support costs and a 12% increase in user retention within Q3, delivering measurable value to the bottom line.",
    bullets: [
      "Risk-mitigated phased rollout",
      "Clear metrics for success",
      "Calculated cost-to-benefit mapping",
    ],
    headline: "↑ 15% ROI",
  },
  scenarioB: {
    label: "Scenario B: Tech Startup",
    title: "Disrupting the Workflow Experience",
    content: "We're moving fast to build an intuitive, zero-friction interface. It's about empowering the user, killing redundant clicks, and shipping a product that feels like magic.",
    stats: [
      { label: "Velocity & Focus", icon: "rocket" },
      { label: "High Innovation Rate", icon: "lightbulb" },
    ],
  },
};

const LOADING_STEPS = [
  "Analyzing your Master Profile experience...",
  "Scanning target audience preferences...",
  "Synthesizing high-impact scenario directions...",
  "Applying professional design tone & formatting...",
];

interface DashboardClientProps {
  initialPitches: SavedPitch[];
  profile: MasterProfile;
  initialProfiles: MasterProfile[];
  hasApiKey: boolean;
}

export function DashboardClient({
  initialPitches,
  profile: initialProfile,
  initialProfiles,
  hasApiKey,
}: DashboardClientProps) {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "profile" | "projects" | "pitches" | "analytics" | "settings" | "help"
  >("dashboard");

  // Shared Master Profile & Pitching states
  const [profile, setProfileState] = useState<MasterProfile>(initialProfile);
  const [inputs, setInputs] = useState<ClientContext>(INITIAL_INPUTS);
  const [currentResult, setCurrentResult] = useState<GeneratedPitch | null>(null);
  const [savedPitches, setSavedPitches] = useState<SavedPitch[]>(initialPitches);

  // Master Profiles management states
  const [profiles, setProfiles] = useState<MasterProfile[]>(initialProfiles);

  const handleCreateProfile = async () => {
    const name = prompt("Enter a name for your new Master Profile (e.g. 'Consulting Focus', 'Web Dev Focus'):");
    if (!name || !name.trim()) return;

    setLoading(true);
    try {
      const res = await createProfileAction(name);
      if (res.error || !res.data) {
        throw new Error(res.error ?? "Failed to create profile.");
      }

      setProfiles((prev) => [...prev, res.data!]);
      showNotification(`Created profile: "${name}"`, "success");
      // Auto select the new profile
      handleSelectProfile(res.data.id!);
    } catch (err: any) {
      showNotification(err.message || "Failed to create profile.", "info");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProfile = async (profileId: string) => {
    setLoading(true);
    try {
      const res = await selectProfileAction(profileId);
      if (res.error || !res.data) {
        throw new Error(res.error ?? "Failed to select profile.");
      }

      setProfileState(res.data);
      // Re-load list to update default state indicator
      setProfiles((prev) =>
        prev.map((p) => ({
          ...p,
          isDefault: p.id === profileId,
        }))
      );
      showNotification(`Switched profile to: "${res.data.profileName}"`, "success");
    } catch (err: any) {
      showNotification(err.message || "Failed to switch profiles.", "info");
    } finally {
      setLoading(false);
    }
  };

  // Global loading overlay & Toast alert states
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "info" | "error";
  } | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(true);
  const [copiedScenario, setCopiedScenario] = useState<string | null>(null);

  // Skill editing states
  const [newSkill, setNewSkill] = useState("");

  // PDF Parsing state
  const [parsingPdf, setParsingPdf] = useState(false);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsingPdf(true);
    setLoading(true);
    showNotification("Parsing Job Description PDF with Gemini...", "info");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await parsePdfAction(formData);
      if (res.error || !res.data) {
        throw new Error(res.error ?? "Failed to parse PDF.");
      }

      const parsed = res.data;
      setInputs((prev) => ({
        ...prev,
        targetAudience: parsed.targetAudience,
        pitchGoal: parsed.pitchGoal,
      }));
      showNotification("PDF parsed successfully! Form fields updated.", "success");
    } catch (err: any) {
      console.error(err);
      showNotification(err.message || "Failed to process PDF.", "info");
    } finally {
      setParsingPdf(false);
      setLoading(false);
      e.target.value = "";
    }
  };

  // Projects editing inline states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectRole, setProjectRole] = useState("");
  const [projectChallenge, setProjectChallenge] = useState("");
  const [projectTags, setProjectTags] = useState("");
  const [projectOutcome, setProjectOutcome] = useState("");

  // Auto dismiss Toast alert
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Synchronize document title with the active tab dynamically
  useEffect(() => {
    const tabNames: Record<string, string> = {
      dashboard: "Dashboard",
      profile: "Master Profile",
      projects: "Featured Projects",
      pitches: "Saved Pitches",
      analytics: "Match Analytics",
      settings: "Settings",
      help: "Help Guide",
    };
    const name = tabNames[activeTab] || "Dashboard";
    if (typeof document !== "undefined") {
      document.title = `${name} | Synthesis AI`;
    }
  }, [activeTab]);

  // Read URL search params on mount to select initial tab
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      const validTabs = ["dashboard", "profile", "projects", "pitches", "analytics", "settings", "help"];
      if (tabParam && validTabs.includes(tabParam)) {
        setActiveTab(tabParam as any);
      }
    }
  }, []);

  // Update tab state & URL search params dynamically
  const changeTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const newUrl = tab === "dashboard" ? "/dashboard" : `/dashboard?tab=${tab}`;
      window.history.pushState({ tab }, "", newUrl);
    }
  };

  // Loading steps indicator cycle
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % 4);
      }, 1200);
      return () => clearInterval(interval);
    } else {
      setLoadingStep(0);
    }
  }, [loading]);

  const showNotification = (
    message: string,
    type: "success" | "info" | "error" = "success"
  ) => {
    setNotification({ message, type });
  };

  // ── SERVER ACTION HANDLERS ─────────────────────────────────────────────────

  const syncProfileToServer = async (updatedProfile: MasterProfile) => {
    try {
      const res = await saveProfileAction(updatedProfile);
      if (res.error) showNotification(res.error, "info");
    } catch (err) {
      console.error(err);
      showNotification("Failed to sync profile changes with server", "info");
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;

    // Split by comma, trim each tag, and remove empty entries
    const tagsToAdd = newSkill
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    if (tagsToAdd.length === 0) return;

    // Filter out tags that are already present in the profile skills
    const uniqueTagsToAdd = tagsToAdd.filter((tag) => !profile.skills.includes(tag));

    if (uniqueTagsToAdd.length > 0) {
      const updated = {
        ...profile,
        skills: [...profile.skills, ...uniqueTagsToAdd],
      };
      setProfileState(updated);
      setNewSkill("");
      showNotification(`Added ${uniqueTagsToAdd.length} tag(s) successfully!`);
      await syncProfileToServer(updated);
    } else {
      setNewSkill("");
      showNotification("All tag(s) already exist!", "info");
    }
  };

  const handleRemoveSkill = async (skillToRemove: string) => {
    const updated = {
      ...profile,
      skills: profile.skills.filter((s) => s !== skillToRemove),
    };
    setProfileState(updated);
    showNotification("Skill removed");
    await syncProfileToServer(updated);
  };

  const openProjectModal = (proj?: Project) => {
    if (proj) {
      setEditingProject(proj);
      setProjectTitle(proj.title);
      setProjectDesc(proj.description);
      setProjectRole(proj.role || "");
      setProjectChallenge(proj.challenge || "");
      setProjectTags(proj.tags ? proj.tags.join(", ") : "");
      setProjectOutcome(proj.outcome || "");
    } else {
      setEditingProject({ id: "", title: "", description: "" });
      setProjectTitle("");
      setProjectDesc("");
      setProjectRole("");
      setProjectChallenge("");
      setProjectTags("");
      setProjectOutcome("");
    }
  };

  const handleSaveProject = async () => {
    if (!projectTitle.trim() || !projectDesc.trim()) return;

    let updatedProjects = [...profile.projects];
    const tagsArray = projectTags.split(",").map((t) => t.trim()).filter((t) => t !== "");

    if (editingProject && editingProject.id) {
      updatedProjects = profile.projects.map((p) =>
        p.id === editingProject.id
          ? {
              ...p,
              title: projectTitle,
              description: projectDesc,
              role: projectRole,
              challenge: projectChallenge,
              tags: tagsArray,
              outcome: projectOutcome,
            }
          : p
      );
      showNotification("Project updated successfully!");
    } else {
      const newProj: Project = {
        id: Date.now().toString(),
        title: projectTitle,
        description: projectDesc,
        role: projectRole,
        challenge: projectChallenge,
        tags: tagsArray,
        outcome: projectOutcome,
      };
      updatedProjects.push(newProj);
      showNotification("New project added to profile!");
    }

    const updatedProfile = { ...profile, projects: updatedProjects };
    setProfileState(updatedProfile);
    setEditingProject(null);
    await syncProfileToServer(updatedProfile);
  };

  const handleDeleteProject = async (id: string) => {
    const updatedProfile = {
      ...profile,
      projects: profile.projects.filter((p) => p.id !== id),
    };
    setProfileState(updatedProfile);
    showNotification("Project removed from profile");
    await syncProfileToServer(updatedProfile);
  };

  const handleGeneratePitch = async () => {
    if (!inputs.targetAudience.trim()) {
      showNotification("Please state your target audience.", "info");
      return;
    }

    setLoading(true);
    try {
      const res = await generatePitchAction(inputs);
      if (!res.data) {
        throw new Error(res.error ?? "Failed to communicate with generation engine.");
      }

      setCurrentResult(res.data.pitch);
      setSavedPitches((prev) => [res.data!, ...prev]);
      
      if (res.error) {
        showNotification(res.error, "info");
      } else {
        showNotification("AI pitch created and loaded in live preview!", "success");
      }
    } catch (err: any) {
      console.error(err);
      showNotification(err.message || "An error occurred during generation.", "info");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCurrentPitch = async () => {
    if (!currentResult) return;

    const alreadySaved = savedPitches.some(
      (p) =>
        p.pitch.scenarioA.title === currentResult.scenarioA.title &&
        p.context.targetAudience === inputs.targetAudience
    );

    if (alreadySaved) {
      showNotification("Pitch is already saved in the history archive!");
      return;
    }

    setLoading(true);
    try {
      const res = await generatePitchAction(inputs);
      if (res.error || !res.data) {
        throw new Error(res.error ?? "Failed to save pitch.");
      }
      setSavedPitches((prev) => [res.data!, ...prev]);
      showNotification("Saved pitch to history archive!");
    } catch (err: any) {
      showNotification(err.message || "Failed to save pitch.", "info");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSavedPitch = async (id: string) => {
    try {
      const res = await deletePitchAction(id);
      if (res.error) throw new Error(res.error);
      setSavedPitches((prev) => prev.filter((p) => p.id !== id));
      showNotification("Removed pitch from history archive");
    } catch (err: any) {
      showNotification(err.message || "Failed to delete pitch", "info");
    }
  };

  const handleStarSavedPitch = async (id: string) => {
    try {
      const res = await starPitchAction(id);
      if (res.error || !res.data) throw new Error(res.error ?? "");
      setSavedPitches((prev) => prev.map((p) => (p.id === id ? res.data! : p)));
      showNotification(res.data.starred ? "Pitch starred!" : "Pitch unstarred");
    } catch (err) {
      showNotification("Failed to update star state", "info");
    }
  };

  const loadSavedPitch = (saved: SavedPitch) => {
    setInputs(saved.context);
    setCurrentResult(saved.pitch);
    showNotification("Loaded archived pitch into dashboard.");
    setActiveTab("dashboard");
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScenario(id);
    setTimeout(() => setCopiedScenario(null), 2000);
    showNotification("Copied pitch content to clipboard!");
  };

  const renderIcon = (iconName: string) => {
    const iconClass = "w-5 h-5 text-secondary-container mb-1 block";
    switch (iconName.toLowerCase()) {
      case "rocket":      return <Rocket className={iconClass} />;
      case "lightbulb":   return <Lightbulb className={iconClass} />;
      case "shield":      return <Shield className={iconClass} />;
      case "zap":         return <Zap className={iconClass} />;
      case "users":       return <Users className={iconClass} />;
      case "trending-up": return <TrendingUp className={iconClass} />;
      case "award":       return <Award className={iconClass} />;
      case "heart":       return <Heart className={iconClass} />;
      case "target":      return <Target className={iconClass} />;
      default:            return <Sparkles className={iconClass} />;
    }
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────

  return (
    <div className="bg-surface text-on-surface font-sans flex h-screen overflow-hidden overscroll-none antialiased">
      {/* Toast Alert Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -40, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 16, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, x: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "fixed top-4 right-4 z-50 px-5 py-3.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md flex items-center gap-3.5 border text-sm font-semibold overflow-hidden max-w-sm md:max-w-md transition-all",
              notification.type === "success"
                ? "bg-emerald-50/95 text-emerald-800 border-emerald-200/80 shadow-[0_8px_25px_rgba(16,185,129,0.08)]"
                : notification.type === "error"
                ? "bg-rose-50/95 text-rose-800 border-rose-200/80 shadow-[0_8px_25px_rgba(244,63,94,0.08)]"
                : "bg-slate-50/95 text-slate-800 border-slate-200/80 shadow-[0_8px_25px_rgba(71,85,105,0.06)]"
            )}
          >
            {notification.type === "success" && (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            )}
            {notification.type === "error" && (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 animate-bounce" />
            )}
            {notification.type === "info" && (
              <Info className="w-5 h-5 text-slate-600 shrink-0" />
            )}
            <span className="leading-snug pr-2">{notification.message}</span>
            
            {/* Visual Progress Bar indicator */}
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-current opacity-20">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-full bg-current"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SideNavBar */}
      <nav className="hidden md:flex w-[280px] h-screen flex-col border-r border-outline-variant bg-surface shrink-0 py-6">
        <div className="px-6 mb-8">
          <Link href="/" className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon.png"
              alt="Synthesis AI Logo"
              className="w-8 h-8 rounded-lg object-contain bg-surface-container-low p-0.5 border border-outline-variant"
            />
            <h2 className="text-xl font-bold font-geist text-primary tracking-tight">
              Synthesis AI
            </h2>
          </Link>
          <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant/80">
            Context-Aware Generator
          </p>
        </div>

        {/* Profile Switcher */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Active Profile
            </span>
            <button
              onClick={handleCreateProfile}
              className="text-[10px] text-secondary hover:underline font-bold uppercase flex items-center gap-0.5 cursor-pointer"
              title="Create New Profile"
            >
              <Plus className="w-3 h-3" /> New
            </button>
          </div>
          <select
            value={profile.id || ""}
            onChange={(e) => handleSelectProfile(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs font-semibold text-primary outline-none focus:border-secondary transition-all cursor-pointer"
          >
            {profiles.map((p) => (
              <option key={p.id} value={p.id}>
                👤 {p.profileName || "Unnamed Profile"}
              </option>
            ))}
          </select>
        </div>

        <div className="px-6 mb-6">
          <button
            onClick={() => {
              setInputs(INITIAL_INPUTS);
              setCurrentResult(null); // Clear live pitch state as requested
              showNotification("Reset inputs. Ready for a new pitch context!");
              changeTab("dashboard");
            }}
            className="w-full bg-primary-container hover:bg-primary-container/95 text-on-primary py-3 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer"
          >
            New Pitch
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto overscroll-y-contain px-4 space-y-1">
          <li>
            <button
              onClick={() => changeTab("dashboard")}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all text-left",
                activeTab === "dashboard"
                  ? "bg-surface-container-high text-primary border-r-4 border-secondary"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <Home className="w-5 h-5 text-primary" />
              <span className="text-sm">Dashboard</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => changeTab("profile")}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all text-left",
                activeTab === "profile"
                  ? "bg-surface-container-high text-primary border-r-4 border-secondary"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <User className="w-5 h-5 text-primary" />
              <span className="text-sm">Master Profile</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => changeTab("projects")}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all text-left",
                activeTab === "projects"
                  ? "bg-surface-container-high text-primary border-r-4 border-secondary"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <Briefcase className="w-5 h-5 text-primary" />
              <span className="text-sm">Projects ({profile.projects.length})</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => changeTab("pitches")}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all text-left relative",
                activeTab === "pitches"
                  ? "bg-surface-container-high text-primary border-r-4 border-secondary"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm">Generated Pitches</span>
              {savedPitches.length > 0 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-secondary text-on-secondary text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {savedPitches.length}
                </span>
              )}
            </button>
          </li>
          <li>
            <button
              onClick={() => changeTab("analytics")}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all text-left",
                activeTab === "analytics"
                  ? "bg-surface-container-high text-primary border-r-4 border-secondary"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm">Analytics</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => changeTab("settings")}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all text-left",
                activeTab === "settings"
                  ? "bg-surface-container-high text-primary border-r-4 border-secondary"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <Settings className="w-5 h-5 text-primary" />
              <span className="text-sm">Settings</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => changeTab("help")}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all text-left",
                activeTab === "help"
                  ? "bg-surface-container-high text-primary border-r-4 border-secondary"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <HelpCircle className="w-5 h-5 text-primary" />
              <span className="text-sm">Help</span>
            </button>
          </li>
        </ul>

        {/* Footer profile info */}
        <div className="mt-auto px-6 pt-4 border-t border-outline-variant flex items-center justify-between min-h-12 w-full overflow-hidden">
          <UserButton
            showName={true}
            appearance={{
              elements: {
                userButtonBox: "flex-row-reverse gap-3",
                userButtonOuterIdentifier: "text-sm font-semibold text-primary font-geist truncate max-w-[120px]",
              },
            }}
          />
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
        {/* TopNavBar */}
        <header className="h-16 w-full flex justify-between items-center px-6 border-b border-outline-variant bg-surface-container-lowest sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3 w-1/2">
            <Link href="/" className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer">
              <h1 className="text-lg font-bold font-geist text-primary tracking-tight">
                PitchPerfect
              </h1>
            </Link>

            {/* Quick indicators */}
            {hasApiKey ? (
              <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.05)] transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
                Gemini AI Connected (Online)
              </span>
            ) : (
              <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.05)] transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]"></span>
                Local Simulation Mode (Offline Sandbox)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Tab Select Dropdown (visible only on small screens) */}
            <div className="md:hidden mr-2">
              <select
                value={activeTab}
                onChange={(e) => changeTab(e.target.value as any)}
                className="bg-surface-container-low text-primary text-xs font-semibold px-3 py-1.5 rounded-lg outline-none border border-outline-variant"
              >
                <option value="dashboard">🏠 Dashboard</option>
                <option value="profile">👤 Master Profile</option>
                <option value="projects">💼 Projects</option>
                <option value="pitches">✨ Saved Pitches</option>
                <option value="analytics">📈 Analytics</option>
                <option value="settings">⚙️ Settings</option>
                <option value="help">❓ Help</option>
              </select>
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setUnreadNotifications(false);
                }}
                className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors active:scale-95 cursor-pointer relative"
                title="Notifications"
              >
                <Bell className={`w-5 h-5 text-outline origin-top ${unreadNotifications ? "animate-jiggle" : ""}`} />
                {unreadNotifications && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                )}
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">Thông báo gần đây</span>
                      <button
                        onClick={() => {
                          setUnreadNotifications(false);
                          setShowNotifications(false);
                        }}
                        className="text-[10px] text-secondary font-bold uppercase hover:underline cursor-pointer"
                      >
                        Đóng
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-outline-variant/50">
                      <div className="p-3.5 hover:bg-surface-container-low transition-colors text-left">
                        <p className="text-xs font-semibold text-primary">Kết nối Gemini AI</p>
                        <p className="text-[10px] text-on-surface-variant mt-0.5 leading-relaxed">
                          {hasApiKey
                            ? "Gemini AI đã được kết nối trực tuyến thành công. Sẵn sàng tạo các bản Pitch chất lượng cao."
                            : "Đang chạy ở chế độ Chạy thử Local (Mã Gemini API chưa cấu hình)."}
                        </p>
                        <span className="text-[9px] text-outline font-medium block mt-1">Vừa xong</span>
                      </div>
                      <div className="p-3.5 hover:bg-surface-container-low transition-colors text-left">
                        <p className="text-xs font-semibold text-primary">Trình quản lý hồ sơ</p>
                        <p className="text-[10px] text-on-surface-variant mt-0.5 leading-relaxed">Đã đồng bộ thành công hồ sơ cá nhân Master Profile lên máy chủ lưu trữ đám mây.</p>
                        <span className="text-[9px] text-outline font-medium block mt-1">10 phút trước</span>
                      </div>
                      <div className="p-3.5 hover:bg-surface-container-low transition-colors text-left">
                        <p className="text-xs font-semibold text-primary">Phân tích tài liệu PDF</p>
                        <p className="text-[10px] text-on-surface-variant mt-0.5 leading-relaxed">Trí tuệ nhân tạo đã quét và phân tích thành công tệp JD PDF được tải lên.</p>
                        <span className="text-[9px] text-outline font-medium block mt-1">1 giờ trước</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => changeTab("help")}
              className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors active:scale-95 cursor-pointer"
              title="Help Guide"
            >
              <HelpCircle className="w-5 h-5 text-outline" />
            </button>
            <div className="flex items-center pl-1">
              <UserButton />
            </div>
          </div>
        </header>

        {/* Global Loading Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex flex-col justify-center items-center text-on-primary"
            >
              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-2xl max-w-sm w-full mx-4 border border-outline-variant text-center">
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-secondary/20 animate-pulse"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-lg font-bold font-geist text-primary mb-2">
                  Synthesizing Creative Pitch
                </h3>
                <p className="text-sm text-on-surface-variant h-10 animate-fade-in flex items-center justify-center">
                  {LOADING_STEPS[loadingStep]}
                </p>
                <div className="mt-4 flex gap-1 justify-center">
                  {[0, 1, 2, 3].map((idx) => (
                    <span
                      key={idx}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        idx === loadingStep ? "bg-secondary scale-125" : "bg-outline-variant"
                      )}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto overscroll-y-contain p-6 md:p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              {activeTab === "dashboard" && (
                <DashboardView
                  profile={profile}
                  setProfileState={setProfileState}
                  inputs={inputs}
                  setInputs={setInputs}
                  newSkill={newSkill}
                  setNewSkill={setNewSkill}
                  handleAddSkill={handleAddSkill}
                  handleRemoveSkill={handleRemoveSkill}
                  handleGeneratePitch={handleGeneratePitch}
                  currentResult={currentResult}
                  copiedScenario={copiedScenario}
                  copyToClipboard={copyToClipboard}
                  setActiveTab={changeTab}
                  showNotification={showNotification}
                  syncProfileToServer={syncProfileToServer}
                  handleSaveCurrentPitch={handleSaveCurrentPitch}
                  renderIcon={renderIcon}
                  handlePdfUpload={handlePdfUpload}
                  parsingPdf={parsingPdf}
                />
              )}

              {activeTab === "profile" && (
                <ProfileView
                  profile={profile}
                  setProfileState={setProfileState}
                  newSkill={newSkill}
                  setNewSkill={setNewSkill}
                  handleAddSkill={handleAddSkill}
                  handleRemoveSkill={handleRemoveSkill}
                  setActiveTab={changeTab}
                  showNotification={showNotification}
                  syncProfileToServer={syncProfileToServer}
                />
              )}

              {activeTab === "projects" && (
                <ProjectsView
                  profile={profile}
                  editingProject={editingProject}
                  projectTitle={projectTitle}
                  setProjectTitle={setProjectTitle}
                  projectDesc={projectDesc}
                  setProjectDesc={setProjectDesc}
                  projectRole={projectRole}
                  setProjectRole={setProjectRole}
                  projectChallenge={projectChallenge}
                  setProjectChallenge={setProjectChallenge}
                  projectTags={projectTags}
                  setProjectTags={setProjectTags}
                  projectOutcome={projectOutcome}
                  setProjectOutcome={setProjectOutcome}
                  openProjectModal={openProjectModal}
                  handleSaveProject={handleSaveProject}
                  handleDeleteProject={handleDeleteProject}
                  setEditingProject={setEditingProject}
                  mockImages={MOCK_IMAGES}
                />
              )}

              {activeTab === "pitches" && (
                <PitchesView
                  savedPitches={savedPitches}
                  loadSavedPitch={loadSavedPitch}
                  handleStarSavedPitch={handleStarSavedPitch}
                  copyToClipboard={copyToClipboard}
                  handleDeleteSavedPitch={handleDeleteSavedPitch}
                />
              )}

              {activeTab === "analytics" && (
                <AnalyticsView
                  profile={profile}
                  savedPitches={savedPitches}
                />
              )}

              {activeTab === "settings" && (
                <SettingsView
                  hasApiKey={hasApiKey}
                  handleResetState={async () => {
                    if (
                      confirm("Are you sure you want to reset everything back to defaults?")
                    ) {
                      const defaults: MasterProfile = {
                        fullName: "Jane Doe",
                        jobTitle: "Lead Strategic Designer",
                        bio: "Helping companies translate complex, multi-sided user needs into elegant, high-velocity digital products...",
                        skills: [
                          "UI/UX Design",
                          "Product Strategy",
                          "Data Visualization",
                          "User Research",
                        ],
                        projects: [
                          {
                            id: "1",
                            title: "Project Alpha",
                            description:
                              "Redesign of enterprise dashboard, increasing day-to-day workflow efficiency by 40%.",
                            image: MOCK_IMAGES[0],
                          },
                          {
                            id: "2",
                            title: "FinTech Pivot",
                            description:
                              "Led cross-functional product design team to launch a next-generation asset trading application.",
                            image: MOCK_IMAGES[1],
                          },
                        ],
                      };
                      setProfileState(defaults);
                      setSavedPitches([]);
                      setCurrentResult(INITIAL_RESULT);
                      setInputs(INITIAL_INPUTS);
                      showNotification("Application state has been reset!");
                      await syncProfileToServer(defaults);
                    }
                  }}
                />
              )}

              {activeTab === "help" && <HelpView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
