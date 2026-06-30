/**
 * @file components/dashboard/SettingsView.tsx
 * @description Renders the system settings configuration tab.
 */
"use client";

import React from "react";
import { translations, type Language } from "@/lib/translations";

import type { MasterProfile } from "@/types";

interface SettingsViewProps {
  hasApiKey: boolean;
  handleResetState: () => void;
  lang: Language;
  profile: MasterProfile;
  handleUpdatePlan: (plan: "free" | "pro") => void;
}

export function SettingsView({ hasApiKey, handleResetState, lang, profile, handleUpdatePlan }: SettingsViewProps) {
  const isPro = profile.plan === "pro";

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm space-y-6 animate-fade-in text-left">
      <div className="border-b border-outline-variant pb-4">
        <h2 className="text-xl font-bold font-geist text-primary">
          {lang === "vi" ? "CÀI ĐẶT HỆ THỐNG" : "SYSTEM SETTINGS"}
        </h2>
        <p className="text-sm text-on-surface-variant">
          {lang === "vi"
            ? "Cấu hình các thuộc tính viết mặc định và chế độ mô phỏng sandbox."
            : "Configure default writing properties and sandbox simulation modes."}
        </p>
      </div>

      <div className="space-y-5 max-w-xl animate-fade-in">
        {/* Plan / Subscription Status section */}
        <div>
          <h3 className="text-sm font-bold text-primary mb-2">
            {lang === "vi" ? "Gói dịch vụ & Tài khoản" : "Subscription & Billing"}
          </h3>
          <p className="text-xs text-on-surface-variant mb-3">
            {lang === "vi"
              ? "Theo dõi trạng thái tài khoản của bạn. Nâng cấp lên Pro để xóa mọi giới hạn tạo kịch bản."
              : "Track your account status. Upgrade to Pro to bypass any limit on proposal generation."}
          </p>
          <div className="p-4 bg-surface rounded-lg border border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-primary block">
                {lang === "vi" ? "Gói dịch vụ hiện tại:" : "Current plan:"}
              </span>
              <span className={`inline-block mt-1 text-xs font-black uppercase px-2.5 py-0.5 rounded ${isPro ? "bg-emerald-500/10 text-emerald-700" : "bg-slate-200 text-slate-700"}`}>
                {isPro ? (lang === "vi" ? "Thành viên PRO" : "PRO MEMBERSHIP") : (lang === "vi" ? "Tài khoản STARTER (Miễn phí)" : "STARTER ACCOUNT (Free)")}
              </span>
            </div>
            
            <button
              onClick={() => handleUpdatePlan(isPro ? "free" : "pro")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${isPro ? "border border-outline text-primary hover:bg-surface-container-low" : "bg-secondary text-on-secondary hover:bg-secondary/95 shadow-sm"}`}
            >
              {isPro
                ? (lang === "vi" ? "Chuyển về Starter (Demo)" : "Switch to Starter (Demo)")
                : (lang === "vi" ? "Nâng cấp lên Pro" : "Upgrade to Pro")}
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-primary mb-2">
            {lang === "vi" ? "Chế độ mô phỏng Sandbox" : "Sandbox simulation mode"}
          </h3>
          <p className="text-xs text-on-surface-variant mb-3">
            {lang === "vi"
              ? "Nếu Gemini API key bị thiếu, Synthesis AI sẽ tự động chuyển sang chế độ mô phỏng sandbox thông minh."
              : "If Gemini API key is missing, Synthesis AI automatically falls back to beautiful smart-personalized sandbox mock simulations."}
          </p>
          <div className="p-3 bg-surface rounded-lg border border-outline-variant flex items-center justify-between">
            <span className="text-xs font-semibold text-primary">
              {lang === "vi" ? "Trạng thái mô phỏng" : "Simulation state"}
            </span>
            <span className="text-xs font-bold text-secondary uppercase bg-secondary-container/10 px-2.5 py-1 rounded">
              {hasApiKey
                ? (lang === "vi" ? "AI Đang Hoạt Động" : "AI Active")
                : (lang === "vi" ? "Đang Dùng Mock Fallback" : "Mock Fallback Activated")}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-primary mb-2">
            {lang === "vi" ? "Xóa Bộ Nhớ Cache Cục Bộ" : "Clear Local Storage Cache"}
          </h3>
          <p className="text-xs text-on-surface-variant mb-3">
            {lang === "vi"
              ? "Thao tác này sẽ khôi phục trạng thái ứng dụng về mặc định, xóa tất cả thay đổi và bài pitch đã lưu."
              : "This will restore the app state back to default placeholders, removing all your changes and saved pitches."}
          </p>
          <button
            onClick={handleResetState}
            className="bg-error text-on-error hover:bg-error/95 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            {lang === "vi" ? "Đặt Lại Trạng Thái Ứng Dụng" : "Reset Application State"}
          </button>
        </div>
      </div>
    </div>
  );
}
