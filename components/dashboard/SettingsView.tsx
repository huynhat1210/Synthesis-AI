/**
 * @file components/dashboard/SettingsView.tsx
 * @description Renders the system settings configuration tab.
 */
"use client";

import React from "react";
import { translations, type Language } from "@/lib/translations";

interface SettingsViewProps {
  hasApiKey: boolean;
  handleResetState: () => void;
  lang: Language;
}

export function SettingsView({ hasApiKey, handleResetState, lang }: SettingsViewProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm space-y-6 animate-fade-in">
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
        <div>
          <h3 className="text-sm font-bold text-primary mb-2">
            {lang === "vi" ? "Chế độ mô phỏng Sandbox" : "Sandbox simulation mode"}
          </h3>
          <p className="text-xs text-on-surface-variant mb-3">
            {lang === "vi"
              ? "Nếu Gemini API key bị thiếu, PitchPerfect sẽ tự động chuyển sang chế độ mô phỏng sandbox thông minh."
              : "If Gemini API key is missing, PitchPerfect automatically falls back to beautiful smart-personalized sandbox mock simulations."}
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
