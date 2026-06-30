/**
 * @file app/pitch/[id]/PitchActions.tsx
 * @description Client component — action buttons for the public pitch page.
 *              Handles PDF export with a clean, professional single-color layout.
 */
"use client";

import React, { useState } from "react";
import { FileDown, Copy, Check } from "lucide-react";
import type { SavedPitch } from "@/types";

interface PitchActionsProps {
  pitch: SavedPitch;
  profileFullName: string;
  profileJobTitle: string;
  profileBio?: string;
}

// Safely normalize text to avoid broken Vietnamese characters in print window
function n(text: string): string {
  try {
    return (text || "").normalize("NFC");
  } catch {
    return text || "";
  }
}

export function PitchActions({ pitch, profileFullName, profileJobTitle, profileBio }: PitchActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPdf = () => {
    const p = pitch.pitch;
    const ctx = pitch.context;

    const dateStr = new Date(pitch.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const bulletsHtml =
      p.scenarioA.bullets && p.scenarioA.bullets.length > 0
        ? p.scenarioA.bullets
            .map(
              (b) =>
                `<div class="bullet-row">
                  <div class="bullet-check">✓</div>
                  <div class="bullet-text">${n(b)}</div>
                </div>`
            )
            .join("")
        : "";

    const statsHtml =
      p.scenarioB.stats && p.scenarioB.stats.length > 0
        ? `<div class="stats-grid">${p.scenarioB.stats
            .map((s) => `<div class="stat-card">${n(s.label)}</div>`)
            .join("")}</div>`
        : "";

    const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pitch Proposal — ${n(profileFullName)}</title>
  <style>
    /* ─── Reset ─── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* ─── Base ─── */
    body {
      font-family: "Segoe UI", Arial, "Helvetica Neue", sans-serif;
      font-size: 13px;
      line-height: 1.7;
      color: #1a1a1a;
      background: #ffffff;
      padding: 0;
    }

    /* ─── Page ─── */
    .page {
      width: 100%;
      max-width: 760px;
      margin: 0 auto;
      padding: 52px 60px 60px;
    }

    /* ─── Top Bar ─── */
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 20px;
      margin-bottom: 32px;
      border-bottom: 2px solid #1a1a1a;
    }
    .brand-block {}
    .brand-name {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #1a1a1a;
      display: block;
    }
    .brand-sub {
      font-size: 10px;
      color: #6b6b6b;
      display: block;
      margin-top: 2px;
    }
    .meta-block { text-align: right; }
    .meta-row {
      font-size: 11px;
      color: #4a4a4a;
      line-height: 1.6;
    }
    .meta-row strong { color: #1a1a1a; font-weight: 700; }

    /* ─── Profile Strip ─── */
    .profile-strip {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      background: #f5f5f5;
      border-radius: 6px;
      margin-bottom: 36px;
    }
    .avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #1a1a1a;
      color: #ffffff;
      font-size: 18px;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .profile-name { font-size: 15px; font-weight: 800; color: #1a1a1a; }
    .profile-title { font-size: 11px; color: #6b6b6b; font-weight: 500; margin-top: 1px; }

    /* ─── Section Label ─── */
    .section-label {
      font-size: 9px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #6b6b6b;
      margin-bottom: 10px;
      display: block;
    }

    /* ─── Pitch Title ─── */
    .pitch-title {
      font-size: 24px;
      font-weight: 900;
      color: #1a1a1a;
      line-height: 1.25;
      margin-bottom: 16px;
      letter-spacing: -0.3px;
    }

    /* ─── Body Text ─── */
    .pitch-body {
      font-size: 13px;
      color: #2d2d2d;
      line-height: 1.75;
      margin-bottom: 32px;
    }

    /* ─── Divider ─── */
    .divider {
      height: 1px;
      background: #e0e0e0;
      margin: 28px 0;
    }

    /* ─── Focus Pillars ─── */
    .pillars-header {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      color: #4a4a4a;
      margin-bottom: 14px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e0e0e0;
    }
    .bullet-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 9px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .bullet-row:last-child { border-bottom: none; }
    .bullet-check {
      font-size: 12px;
      font-weight: 900;
      color: #1a1a1a;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .bullet-text {
      font-size: 13px;
      color: #2d2d2d;
      line-height: 1.6;
    }

    /* ─── Scenario B ─── */
    .scenario-b-box {
      background: #f5f5f5;
      border-left: 3px solid #1a1a1a;
      border-radius: 0 6px 6px 0;
      padding: 22px 24px;
      margin-top: 32px;
    }
    .scenario-b-label {
      font-size: 9px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #6b6b6b;
      margin-bottom: 8px;
    }
    .scenario-b-title {
      font-size: 16px;
      font-weight: 800;
      color: #1a1a1a;
      margin-bottom: 10px;
      line-height: 1.3;
    }
    .scenario-b-body {
      font-size: 12.5px;
      color: #4a4a4a;
      line-height: 1.7;
    }

    /* ─── Stats ─── */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-top: 16px;
    }
    .stat-card {
      background: #ffffff;
      border: 1px solid #d8d8d8;
      border-radius: 5px;
      padding: 10px 12px;
      font-size: 11.5px;
      color: #2d2d2d;
      line-height: 1.5;
    }

    /* ─── Footer ─── */
    .footer {
      margin-top: 48px;
      padding-top: 16px;
      border-top: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 9.5px;
      color: #9a9a9a;
    }

    /* ─── Print overrides ─── */
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page { padding: 40px 48px 48px; }
    }
  </style>
</head>
<body>
<div class="page">

  <!-- Top Bar -->
  <div class="top-bar">
    <div class="brand-block">
      <span class="brand-name">Synthesis AI</span>
      <span class="brand-sub">Pitch Proposal Document</span>
    </div>
    <div class="meta-block">
      <div class="meta-row">Prepared for: <strong>${n(ctx.targetAudience)}</strong></div>
      <div class="meta-row">Goal: <strong>${n(ctx.pitchGoal)}</strong></div>
      <div class="meta-row">Date: <strong>${dateStr}</strong></div>
    </div>
  </div>

  <!-- Profile -->
  <div class="profile-strip">
    <div class="avatar">${n(profileFullName).slice(0, 1).toUpperCase()}</div>
    <div>
      <div class="profile-name">${n(profileFullName)}</div>
      <div class="profile-title">${n(profileJobTitle)}</div>
    </div>
  </div>

  <!-- Scenario A -->
  <span class="section-label">Strategic Proposal — Scenario A</span>
  <h1 class="pitch-title">${n(p.scenarioA.title)}</h1>
  <div class="pitch-body">${n(p.scenarioA.content)}</div>

  ${bulletsHtml ? `
  <div class="divider"></div>
  <div class="pillars-header">Strategic Focus Pillars</div>
  ${bulletsHtml}
  ` : ""}

  <!-- Scenario B -->
  <div class="scenario-b-box">
    <div class="scenario-b-label">Alternative Approach — ${n(p.scenarioB.label)}</div>
    <div class="scenario-b-title">${n(p.scenarioB.title)}</div>
    <div class="scenario-b-body">${n(p.scenarioB.content)}</div>
    ${statsHtml}
  </div>

  <!-- Footer -->
  <div class="footer">
    <span>Generated via Synthesis AI</span>
    <span>${n(profileFullName)} &nbsp;·&nbsp; ${n(profileJobTitle)}</span>
  </div>

</div>
<script>
  window.onload = function () {
    window.print();
    setTimeout(function () { window.close(); }, 1000);
  };
</script>
</body>
</html>`;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Pop-up blocked! Please allow pop-ups to export PDF.");
      return;
    }
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-300 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg transition-all cursor-pointer"
        title="Copy share link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-400" />
            <span className="text-green-400">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            Copy Link
          </>
        )}
      </button>

      {/* Download PDF */}
      <button
        onClick={handleExportPdf}
        className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 border border-blue-500 rounded-lg transition-all cursor-pointer shadow-lg shadow-blue-900/30 active:scale-95"
        title="Export as PDF"
      >
        <FileDown className="w-3.5 h-3.5" />
        Download PDF
      </button>
    </div>
  );
}
