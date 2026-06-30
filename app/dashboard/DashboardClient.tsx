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
  Check,
  X,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { generatePitchAction } from "@/actions/generatePitch";
import { saveProfileAction } from "@/actions/saveProfile";
import { starPitchAction, deletePitchAction } from "@/actions/managePitches";
import { parsePdfAction } from "@/actions/parsePdf";
import { createProfileAction, selectProfileAction } from "@/actions/manageProfiles";
import { createCheckoutSessionAction, verifyCheckoutSessionAction } from "@/actions/stripe";
import { cn } from "@/lib/utils";
import { translations, type Language } from "@/lib/translations";

// View Subcomponents
import { DashboardView } from "@/components/dashboard/DashboardView";
import { ProfileView } from "@/components/dashboard/ProfileView";
import { ProjectsView } from "@/components/dashboard/ProjectsView";
import { PitchesView } from "@/components/dashboard/PitchesView";
import { AnalyticsView } from "@/components/dashboard/AnalyticsView";
import { SettingsView } from "@/components/dashboard/SettingsView";
import { HelpView } from "@/components/dashboard/HelpView";
import { ChatView } from "@/components/dashboard/ChatView";

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
  // i18n Language configuration
  const [lang, setLang] = useState<Language>("vi");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("pitch_lang") as Language;
      if (savedLang === "en" || savedLang === "vi") {
        setLang(savedLang);
      }
    }
  }, []);

  // ── Stripe Checkout Verification mount hook ──
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const payment = urlParams.get("payment");
      const sessionId = urlParams.get("session_id");

      if (payment === "success" && sessionId) {
        const verifyPayment = async () => {
          setLoading(true);
          try {
            const res = await verifyCheckoutSessionAction(sessionId);
            if (res.data) {
              setProfileState(res.data);
              showNotification(
                lang === "vi"
                  ? "Chúc mừng! Bạn đã nâng cấp thành công lên gói PRO thực tế thông qua Stripe!"
                  : "Congratulations! You successfully upgraded to the real PRO plan via Stripe!",
                "success"
              );
              // Clear query parameters
              window.history.replaceState({}, document.title, window.location.pathname);
            } else {
              showNotification(res.error || "Failed to verify transaction.", "error");
            }
          } catch (err: any) {
            showNotification(err.message || "Failed to verify payment.", "error");
          } finally {
            setLoading(false);
          }
        };
        verifyPayment();
      } else if (payment === "cancel") {
        showNotification(
          lang === "vi" ? "Giao dịch nâng cấp đã bị hủy." : "Upgrade checkout was cancelled.",
          "info"
        );
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      const upgrade = urlParams.get("upgrade");
      if (upgrade === "true") {
        setShowUpgradeModal(true);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [lang]);

  const handleToggleLang = () => {
    const nextLang = lang === "vi" ? "en" : "vi";
    setLang(nextLang);
    localStorage.setItem("pitch_lang", nextLang);
  };

  const t = translations[lang];

  // Navigation active tab
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "profile" | "projects" | "pitches" | "analytics" | "settings" | "help" | "chat"
  >("dashboard");

  // Shared Master Profile & Pitching states
  const [profile, setProfileState] = useState<MasterProfile>(initialProfile);
  const [inputs, setInputs] = useState<ClientContext>(INITIAL_INPUTS);
  const [currentResult, setCurrentResult] = useState<GeneratedPitch | null>(null);
  const [savedPitches, setSavedPitches] = useState<SavedPitch[]>(initialPitches);

  // Master Profiles management states
  const [profiles, setProfiles] = useState<MasterProfile[]>(initialProfiles);

  // ── Reset Confirmation Modal state ───────────────────────────────────
  const [showResetModal, setShowResetModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const handleConfirmReset = async () => {
    const defaults: MasterProfile = {
      fullName: "Jane Doe",
      jobTitle: "Lead Strategic Designer",
      bio: "Helping companies translate complex, multi-sided user needs into elegant, high-velocity digital products...",
      skills: ["UI/UX Design", "Product Strategy", "Data Visualization", "User Research"],
      projects: [
        { id: "1", title: "Project Alpha", description: "Redesign of enterprise dashboard, increasing day-to-day workflow efficiency by 40%.", image: MOCK_IMAGES[0] },
        { id: "2", title: "FinTech Pivot", description: "Led cross-functional product design team to launch a next-generation asset trading application.", image: MOCK_IMAGES[1] },
      ],
    };
    setProfileState(defaults);
    setSavedPitches([]);
    setCurrentResult(INITIAL_RESULT);
    setInputs(INITIAL_INPUTS);
    setShowResetModal(false);
    showNotification(lang === "vi" ? "Đã đặt lại ứng dụng về mặc định!" : "Application state has been reset!", "success");
    await syncProfileToServer(defaults);
  };

  const handleUpgradeToPro = async () => {
    setLoading(true);
    try {
      const res = await createCheckoutSessionAction();
      if (res.data) {
        setShowUpgradeModal(false);
        window.location.href = res.data;
      } else {
        showNotification(res.error || "Failed to initiate payment.", "error");
      }
    } catch (err: any) {
      showNotification(err.message || "Failed to initiate payment.", "error");
    } finally {
      setLoading(false);
    }
  };
  const [showNewProfileModal, setShowNewProfileModal] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [creatingProfile, setCreatingProfile] = useState(false);

  const handleCreateProfile = () => {
    setNewProfileName("");
    setShowNewProfileModal(true);
  };

  const handleConfirmCreateProfile = async () => {
    const name = newProfileName.trim();
    if (!name) return;

    setCreatingProfile(true);
    setLoading(true);
    try {
      const res = await createProfileAction(name);
      if (res.error || !res.data) {
        throw new Error(res.error ?? "Failed to create profile.");
      }

      setProfiles((prev) => [...prev, res.data!]);
      showNotification(`Created profile: "${name}"`, "success");
      handleSelectProfile(res.data.id!);
    } catch (err: any) {
      showNotification(err.message || "Failed to create profile.", "info");
    } finally {
      setCreatingProfile(false);
      setLoading(false);
      setShowNewProfileModal(false);
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
      showNotification(lang === "vi" ? "Vui lòng mô tả khách hàng mục tiêu." : "Please state your target audience.", "info");
      return;
    }

    const isPro = profile.plan === "pro";
    if (!isPro && savedPitches.length >= 10) {
      setShowUpgradeModal(true);
      return;
    }

    setLoading(true);
    try {
      const res = await generatePitchAction({ ...inputs, lang });
      if (!res.data) {
        throw new Error(res.error ?? "Failed to communicate with generation engine.");
      }

      setCurrentResult(res.data.pitch);
      setSavedPitches((prev) => [res.data!, ...prev]);
      
      if (res.error) {
        showNotification(res.error, "info");
      } else {
        showNotification(
          lang === "vi"
            ? "Đã tạo bản Pitch bằng AI và hiển thị ở khung xem trước!"
            : "AI pitch created and loaded in live preview!",
          "success"
        );
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
      showNotification(
        lang === "vi"
          ? "Bài Pitch này đã được lưu trong Lịch sử trước đó!"
          : "Pitch is already saved in the history archive!"
      );
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

  const handlePublishScenario = async (scenario: "A" | "B") => {
    if (!currentResult) return;
    const found = savedPitches.find(
      (p) =>
        p.pitch.scenarioA.title === currentResult.scenarioA.title &&
        p.pitch.scenarioA.content === currentResult.scenarioA.content
    );

    if (found) {
      window.open(`/pitch/${found.id}?scenario=${scenario}`, "_blank");
    } else {
      setLoading(true);
      try {
        const res = await generatePitchAction({ ...inputs, lang });
        if (res.error || !res.data) {
          throw new Error(res.error ?? "Failed to save pitch.");
        }
        setSavedPitches((prev) => [res.data!, ...prev]);
        window.open(`/pitch/${res.data.id}?scenario=${scenario}`, "_blank");
      } catch (err: any) {
        showNotification(err.message || "Failed to publish scenario.", "info");
      } finally {
        setLoading(false);
      }
    }
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

      {/* ── Reset Confirmation Modal ── */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div
            key="reset-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowResetModal(false); }}
          >
            <motion.div
              key="reset-modal"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl w-full max-w-md p-6"
            >
              {/* Icon + Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-error/10 border border-error/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-error" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary font-geist">
                    {lang === "vi" ? "Đặt lại ứng dụng?" : "Reset Application?"}
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    {lang === "vi" ? "Thao tác này không thể hoàn tác." : "This action cannot be undone."}
                  </p>
                </div>
              </div>

              {/* Warning list */}
              <div className="bg-error/5 border border-error/15 rounded-xl p-4 mb-5 space-y-2">
                {[
                  lang === "vi" ? "Đặt lại toàn bộ thông tin hồ sơ về mặc định" : "Reset all profile info to placeholder defaults",
                  lang === "vi" ? "Xóa toàn bộ lịch sử Pitch đã lưu" : "Permanently delete all saved pitch history",
                  lang === "vi" ? "Đặt lại kết quả pitch hiện tại" : "Clear current pitch results",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-error/80">
                    <span className="font-bold mt-0.5 shrink-0">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 px-4 py-2.5 border border-outline text-primary rounded-xl text-sm font-semibold hover:bg-surface-container-low transition-colors cursor-pointer"
                >
                  {lang === "vi" ? "Hủy bỏ" : "Cancel"}
                </button>
                <button
                  onClick={handleConfirmReset}
                  className="flex-1 px-4 py-2.5 bg-error text-on-error rounded-xl text-sm font-bold hover:bg-error/90 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  {lang === "vi" ? "Đặt lại ngay" : "Yes, Reset"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showNewProfileModal && (
          <motion.div
            key="new-profile-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowNewProfileModal(false); }}
          >
            <motion.div
              key="new-profile-modal"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl w-full max-w-md p-6"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-base font-bold text-primary font-geist">
                    {lang === "vi" ? "Tạo hồ sơ mới" : "Create New Profile"}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    {lang === "vi"
                      ? "Mỗi hồ sơ có thể có bộ kỹ năng và dự án riêng biệt."
                      : "Each profile can have its own skills and projects for different contexts."}
                  </p>
                </div>
                <button
                  onClick={() => setShowNewProfileModal(false)}
                  className="text-on-surface-variant hover:text-error transition-colors cursor-pointer p-1 rounded-lg hover:bg-surface-container-low"
                >
                  <AlertCircle className="w-4 h-4" />
                </button>
              </div>

              {/* Input */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                  {lang === "vi" ? "Tên hồ sơ" : "Profile Name"}
                </label>
                <input
                  type="text"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleConfirmCreateProfile(); if (e.key === "Escape") setShowNewProfileModal(false); }}
                  autoFocus
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-3 text-sm text-primary focus:border-secondary focus:ring-2 focus:ring-secondary/15 outline-none transition-all"
                  placeholder={lang === "vi" ? "VD: Tập trung Freelance, Phỏng vấn Tech..." : "e.g. Consulting Focus, Web Dev Focus..."}
                  maxLength={60}
                />
                <p className="text-[10px] text-on-surface-variant mt-1 text-right">{newProfileName.length}/60</p>
              </div>

              {/* Examples */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {["Freelance Dev", "Job Interview", "Enterprise Sales", "Startup Pitch"].map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setNewProfileName(ex)}
                    className="text-[10px] px-2.5 py-1 bg-surface border border-outline-variant rounded-full text-on-surface-variant hover:border-secondary hover:text-secondary transition-all cursor-pointer font-semibold"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNewProfileModal(false)}
                  className="flex-1 px-4 py-2.5 border border-outline text-primary rounded-xl text-sm font-semibold hover:bg-surface-container-low transition-colors cursor-pointer"
                >
                  {lang === "vi" ? "Hủy" : "Cancel"}
                </button>
                <button
                  onClick={handleConfirmCreateProfile}
                  disabled={!newProfileName.trim() || creatingProfile}
                  className="flex-1 px-4 py-2.5 bg-primary-container text-on-primary rounded-xl text-sm font-bold hover:bg-primary-container/90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {creatingProfile ? (
                    <><div className="w-3.5 h-3.5 border-2 border-on-primary/40 border-t-on-primary rounded-full animate-spin" />{lang === "vi" ? "Đang tạo..." : "Creating..."}</>
                  ) : (
                    <>{lang === "vi" ? "✓ Tạo hồ sơ" : "✓ Create Profile"}</>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Pro Upgrade Subscription Modal ── */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            key="upgrade-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowUpgradeModal(false); }}
          >
            <motion.div
              key="upgrade-modal"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl w-full max-w-md p-6 text-left"
            >
              {/* Icon + Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-secondary animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary font-geist uppercase">
                    {lang === "vi" ? "Nâng cấp lên gói Pro" : "Upgrade to Pro"}
                  </h3>
                  <p className="text-xs text-on-surface-variant font-semibold">
                    {lang === "vi" ? "Vượt qua giới hạn 10 bản Pitch / tháng" : "Bypass the 10 pitches / month limit"}
                  </p>
                </div>
              </div>

              {/* Benefits list */}
              <div className="bg-surface rounded-xl p-4 mb-5 border border-outline-variant/60">
                <p className="text-xs text-primary font-bold mb-3">
                  {lang === "vi" ? "Quyền lợi thành viên Pro:" : "Pro Member Benefits:"}
                </p>
                <ul className="space-y-2.5">
                  {[
                    lang === "vi" ? "Không giới hạn lượt tạo Pitch bằng AI" : "Unlimited AI-powered pitch generation",
                    lang === "vi" ? "Tự động trích xuất kỹ năng nâng cao từ JD" : "Extract advanced capabilities directly from JDs",
                    lang === "vi" ? "Mở khóa toàn bộ chỉ số phân tích độ tương thích" : "Unlock complete match compatibility analytics",
                    lang === "vi" ? "Hỗ trợ xuất bản đề xuất PDF 2 cột cao cấp" : "Premium 2-column print-ready PDF exports",
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-on-surface-variant">
                      <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 px-4 py-2.5 border border-outline text-primary rounded-xl text-sm font-semibold hover:bg-surface-container-low transition-colors cursor-pointer"
                >
                  {lang === "vi" ? "Hủy bỏ" : "Cancel"}
                </button>
                <button
                  onClick={handleUpgradeToPro}
                  className="flex-1 px-4 py-2.5 bg-secondary text-on-secondary rounded-xl text-sm font-bold hover:bg-secondary/90 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-secondary/10"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  {lang === "vi" ? "Nâng cấp ngay" : "Upgrade Now"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Share Pitch Proposal Modal ── */}
      <AnimatePresence>
        {shareUrl && (
          <motion.div
            key="share-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setShareUrl(null); }}
          >
            <motion.div
              key="share-modal"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl w-full max-w-md p-6 text-center"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-4">
                <span className="text-xs font-black text-primary uppercase tracking-wider">
                  {lang === "vi" ? "Chia sẻ kịch bản Pitch" : "Share Proposal Pitch"}
                </span>
                <button
                  onClick={() => setShareUrl(null)}
                  className="text-on-surface-variant hover:text-error cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* QR Code Container */}
              <div className="py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(shareUrl)}&color=006b5f`}
                  alt="Pitch QR Code"
                  className="w-44 h-44 mx-auto rounded-xl border border-outline-variant p-2 bg-white shadow-md"
                />
                <p className="text-[10px] text-on-surface-variant mt-3 font-semibold">
                  {lang === "vi" ? "Quét mã QR để xem bài Pitch trên điện thoại di động" : "Scan QR code to view the Pitch on mobile devices"}
                </p>
              </div>

              {/* URL Input Box */}
              <div className="space-y-1.5 text-left mb-5">
                <label className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  {lang === "vi" ? "Đường dẫn bài viết:" : "Public Link URL:"}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 bg-surface border border-outline-variant rounded-lg px-3 py-2 text-xs text-primary outline-none focus:border-secondary font-mono"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      showNotification(lang === "vi" ? "Đã sao chép liên kết!" : "Link copied to clipboard!", "success");
                    }}
                    className="bg-secondary text-on-secondary px-3.5 py-2 rounded-lg text-xs font-bold uppercase hover:bg-secondary/95 active:scale-95 transition-all cursor-pointer"
                  >
                    {lang === "vi" ? "Copy" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-3 mb-2">
                <a
                  href={`mailto:?subject=Personalized Proposal Pitch&body=${encodeURIComponent("Hi! I have generated a custom proposal matching your requirements: " + shareUrl)}`}
                  className="px-4 py-2 border border-outline-variant hover:bg-surface-container-low rounded-xl text-xs font-bold text-primary flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  ✉️ Email
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-outline-variant hover:bg-surface-container-low rounded-xl text-xs font-bold text-primary flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  🌐 LinkedIn
                </a>
              </div>
            </motion.div>
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
          {profile.plan === "pro" ? (
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              PRO PLAN ACTIVE
            </div>
          ) : (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="mt-2.5 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold bg-slate-200 text-slate-700 hover:bg-secondary/15 hover:text-secondary border border-outline-variant/60 cursor-pointer transition-all active:scale-95"
            >
              ⭐ STARTER PLAN · UPGRADE
            </button>
          )}
        </div>

        {/* Profile Switcher */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              {t.activeProfile}
            </span>
            <button
              onClick={handleCreateProfile}
              className="text-[10px] text-secondary hover:underline font-bold uppercase flex items-center gap-0.5 cursor-pointer"
              title="Create New Profile"
            >
              <Plus className="w-3 h-3" /> {lang === "vi" ? "MỚI" : "NEW"}
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
              showNotification(
                lang === "vi"
                  ? "Đã đặt lại các ô nhập liệu. Sẵn sàng tạo bài pitch mới!"
                  : "Reset inputs. Ready for a new pitch context!"
              );
              changeTab("dashboard");
            }}
            className="w-full bg-primary-container hover:bg-primary-container/95 text-on-primary py-3 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer"
          >
            {t.newPitchBtn}
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
              <span className="text-sm">{t.tabDashboard}</span>
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
              <span className="text-sm">{t.tabProfile}</span>
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
              <span className="text-sm">{t.tabProjects} ({profile.projects.length})</span>
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
              <span className="text-sm">{t.tabPitches}</span>
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
              <span className="text-sm">{t.tabAnalytics}</span>
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
              <span className="text-sm">{t.tabSettings}</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => changeTab("chat")}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all text-left relative",
                activeTab === "chat"
                  ? "bg-surface-container-high text-primary border-r-4 border-secondary"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="text-sm">{lang === "vi" ? "Tư vấn AI" : "AI Advisor"}</span>
              <span className="ml-auto text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-secondary/15 text-secondary tracking-wider">NEW</span>
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
              <span className="text-sm">{t.tabHelp}</span>
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

      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
        {/* TopNavBar */}
        <header className="h-16 w-full flex justify-between items-center px-4 md:px-6 border-b border-outline-variant bg-surface-container-lowest sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3 w-1/2">
            <Link href="/" className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer">
              <h1 className="text-lg font-bold font-geist text-primary tracking-tight">
                Synthesis AI
              </h1>
            </Link>

            {/* Quick indicators */}
            {hasApiKey ? (
              <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.05)] transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
                {t.geminiOnline}
              </span>
            ) : (
              <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.05)] transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]"></span>
                {t.geminiOffline}
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
                <option value="dashboard">🏠 {t.tabDashboard}</option>
                <option value="profile">👤 {t.tabProfile}</option>
                <option value="projects">💼 {t.tabProjects}</option>
                <option value="pitches">✨ {t.tabPitches}</option>
                <option value="analytics">📈 {t.tabAnalytics}</option>
                <option value="settings">⚙️ {t.tabSettings}</option>
                <option value="help">❓ {t.tabHelp}</option>
              </select>
            </div>

            {/* i18n Language Toggle Button */}
            <button
              onClick={handleToggleLang}
              className="px-3 py-1.5 border border-outline-variant hover:border-outline rounded-full text-xs font-bold text-primary bg-surface flex items-center gap-1 cursor-pointer transition-all hover:bg-surface-container-low"
              title={lang === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
            >
              <span className="text-xs">🌐</span>
              <span>{lang === "vi" ? "EN" : "VI"}</span>
            </button>

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
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        {lang === "vi" ? "Thông báo gần đây" : "Recent Notifications"}
                      </span>
                      <button
                        onClick={() => {
                          setUnreadNotifications(false);
                          setShowNotifications(false);
                        }}
                        className="text-[10px] text-secondary font-bold uppercase hover:underline cursor-pointer"
                      >
                        {lang === "vi" ? "Đóng" : "Close"}
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-outline-variant/50">
                      <div className="p-3.5 hover:bg-surface-container-low transition-colors text-left">
                        <p className="text-xs font-semibold text-primary">
                          {lang === "vi" ? "Kết nối Gemini AI" : "Gemini AI Connection"}
                        </p>
                        <p className="text-[10px] text-on-surface-variant mt-0.5 leading-relaxed">
                          {hasApiKey
                            ? (lang === "vi" ? "Gemini AI đã được kết nối trực tuyến thành công. Sẵn sàng tạo các bản Pitch chất lượng cao." : "Gemini AI connected successfully online. Ready to generate high quality proposals.")
                            : (lang === "vi" ? "Đang chạy ở chế độ Chạy thử Local (Mã Gemini API chưa cấu hình)." : "Running in offline Sandbox mode.")}
                        </p>
                        <span className="text-[9px] text-outline font-medium block mt-1">
                          {lang === "vi" ? "Vừa xong" : "Just now"}
                        </span>
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
        <main className="flex-1 overflow-y-auto overscroll-y-contain p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="pb-8"
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
                  setCurrentResult={setCurrentResult}
                  copiedScenario={copiedScenario}
                  copyToClipboard={copyToClipboard}
                  setActiveTab={changeTab}
                  showNotification={showNotification}
                  syncProfileToServer={syncProfileToServer}
                  handleSaveCurrentPitch={handleSaveCurrentPitch}
                  renderIcon={renderIcon}
                  handlePdfUpload={handlePdfUpload}
                  parsingPdf={parsingPdf}
                  lang={lang}
                  handlePublishScenario={handlePublishScenario}
                  savedPitchesCount={savedPitches.length}
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
                  lang={lang}
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
                  lang={lang}
                />
              )}

              {activeTab === "pitches" && (
                <PitchesView
                  savedPitches={savedPitches}
                  loadSavedPitch={loadSavedPitch}
                  handleStarSavedPitch={handleStarSavedPitch}
                  copyToClipboard={copyToClipboard}
                  handleDeleteSavedPitch={handleDeleteSavedPitch}
                  lang={lang}
                  onSharePitch={(url) => setShareUrl(url)}
                />
              )}

              {activeTab === "analytics" && (
                <AnalyticsView
                  profile={profile}
                  savedPitches={savedPitches}
                  lang={lang}
                />
              )}

              {activeTab === "settings" && (
                <SettingsView
                  hasApiKey={hasApiKey}
                  lang={lang}
                  handleResetState={() => setShowResetModal(true)}
                  profile={profile}
                  handleUpdatePlan={async (newPlan) => {
                    const updated = { ...profile, plan: newPlan };
                    setProfileState(updated);
                    showNotification(
                      lang === "vi"
                        ? `Đã chuyển đổi tài khoản về Starter (Miễn phí).`
                        : `Plan switched back to Starter (Free).`,
                      "info"
                    );
                    await syncProfileToServer(updated);
                  }}
                  onOpenUpgradeModal={() => setShowUpgradeModal(true)}
                />
              )}

              {activeTab === "help" && <HelpView lang={lang} />}

              {activeTab === "chat" && (
                <ChatView profile={profile} lang={lang} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
