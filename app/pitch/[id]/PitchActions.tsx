/**
 * @file app/pitch/[id]/PitchActions.tsx
 * @description Client component — action buttons for the public pitch page.
 *              Handles PDF export, copy to clipboard, and email connect.
 */
"use client";

import React, { useState } from "react";
import { FileDown, Copy, Check, Share2, Printer } from "lucide-react";
import type { SavedPitch } from "@/types";

interface PitchActionsProps {
  pitch: SavedPitch;
  profileFullName: string;
  profileJobTitle: string;
}

export function PitchActions({ pitch, profileFullName, profileJobTitle }: PitchActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPdf = () => {
    const p = pitch.pitch;
    const ctx = pitch.context;

    const bulletsHtml =
      p.scenarioA.bullets && p.scenarioA.bullets.length > 0
        ? `<ul class="bullets">${p.scenarioA.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`
        : "";

    const statsHtml =
      p.scenarioB.stats && p.scenarioB.stats.length > 0
        ? `<div class="stats-grid">${p.scenarioB.stats
            .map((s) => `<div class="stat-item"><strong>${s.label}</strong></div>`)
            .join("")}</div>`
        : "";

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Pitch Proposal — ${profileFullName}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Segoe UI", Roboto, -apple-system, sans-serif;
      color: #111827;
      background: #fff;
      padding: 48px 56px;
      line-height: 1.65;
      font-size: 14px;
    }

    /* ── Header ── */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 20px;
      margin-bottom: 36px;
    }
    .brand { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; color: #2563eb; }
    .meta { font-size: 11px; color: #6b7280; text-align: right; }
    .meta strong { color: #374151; }

    /* ── Profile Strip ── */
    .profile-strip {
      background: #f8fafc;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 16px 20px;
      margin-bottom: 32px;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .avatar {
      width: 48px; height: 48px; border-radius: 50%;
      background: #dbeafe; color: #1d4ed8;
      font-size: 20px; font-weight: 900;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .profile-info h2 { font-size: 16px; font-weight: 800; color: #111827; }
    .profile-info p { font-size: 12px; color: #6b7280; font-weight: 500; }

    /* ── Section Titles ── */
    .section-tag {
      font-size: 9px; font-weight: 900; text-transform: uppercase;
      letter-spacing: 2.5px; color: #3b82f6; margin-bottom: 8px;
    }
    h1.pitch-title {
      font-size: 26px; font-weight: 900; color: #111827;
      line-height: 1.25; margin-bottom: 14px; font-family: Georgia, serif;
    }
    .pitch-body { font-size: 14px; color: #374151; margin-bottom: 28px; }

    /* ── Focus Pillars ── */
    .pillars-box {
      background: #eff6ff; border: 1px solid #bfdbfe;
      border-radius: 10px; padding: 20px 24px; margin-bottom: 28px;
    }
    .pillars-title {
      font-size: 9px; font-weight: 900; text-transform: uppercase;
      letter-spacing: 2px; color: #1d4ed8; margin-bottom: 12px;
    }
    .bullets { padding-left: 0; list-style: none; }
    .bullets li {
      font-size: 13px; color: #1e3a8a;
      padding: 6px 0; border-bottom: 1px solid #dbeafe;
      display: flex; align-items: flex-start; gap: 10px;
    }
    .bullets li:last-child { border-bottom: none; }
    .bullets li::before { content: "✓"; color: #2563eb; font-weight: 900; flex-shrink: 0; }

    /* ── Scenario B ── */
    .scenario-b {
      background: #0f172a; border-radius: 10px;
      padding: 24px 28px; margin-bottom: 36px; color: #e2e8f0;
    }
    .scenario-b-tag {
      font-size: 9px; font-weight: 900; text-transform: uppercase;
      letter-spacing: 2px; color: #7dd3fc; margin-bottom: 6px;
    }
    .scenario-b h4 { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 10px; }
    .scenario-b p { font-size: 13px; color: #94a3b8; line-height: 1.6; }
    .stats-grid {
      display: grid; grid-template-columns: repeat(2, 1fr);
      gap: 8px; margin-top: 16px;
    }
    .stat-item {
      background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px; padding: 10px 12px; font-size: 11px; color: #cbd5e1;
    }

    /* ── Footer ── */
    .footer {
      margin-top: 48px; border-top: 1px solid #e5e7eb;
      padding-top: 16px; font-size: 10px; color: #9ca3af;
      display: flex; justify-content: space-between; align-items: center;
    }

    @media print {
      body { padding: 30px 40px; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>

  <div class="header">
    <div>
      <div class="brand">Synthesis AI — Pitch Proposal</div>
    </div>
    <div class="meta">
      Prepared for: <strong>${ctx.targetAudience}</strong><br/>
      Goal: <strong>${ctx.pitchGoal}</strong><br/>
      Date: <strong>${new Date(pitch.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</strong>
    </div>
  </div>

  <div class="profile-strip">
    <div class="avatar">${profileFullName.slice(0, 1).toUpperCase()}</div>
    <div class="profile-info">
      <h2>${profileFullName}</h2>
      <p>${profileJobTitle}</p>
    </div>
  </div>

  <div class="section-tag">Strategic Proposal — Scenario A</div>
  <h1 class="pitch-title">${p.scenarioA.title}</h1>
  <div class="pitch-body">${p.scenarioA.content}</div>

  ${bulletsHtml ? `<div class="pillars-box"><div class="pillars-title">Strategic Focus Pillars</div>${bulletsHtml}</div>` : ""}

  <div class="scenario-b">
    <div class="scenario-b-tag">Alternative Vision — ${p.scenarioB.label}</div>
    <h4>${p.scenarioB.title}</h4>
    <p>${p.scenarioB.content}</p>
    ${statsHtml}
  </div>

  <div class="footer">
    <span>Generated via Synthesis AI · ${window.location.href}</span>
    <span>${profileFullName} · ${profileJobTitle}</span>
  </div>

  <script>
    window.onload = function () {
      window.print();
      setTimeout(function () { window.close(); }, 800);
    };
  </script>
</body>
</html>`;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Pop-up blocked! Please allow pop-ups to export PDF.");
      return;
    }
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

      {/* Download / Print PDF */}
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
