/**
 * @file app/pitch/[id]/PitchActions.tsx
 * @description Client component — action buttons for the public pitch page.
 *              Handles PDF export with a clean, professional layout including
 *              the full Master Profile (About Me, Skills, Projects).
 */
"use client";

import React, { useState } from "react";
import { FileDown, Copy, Check } from "lucide-react";
import type { SavedPitch, MasterProfile } from "@/types";

interface PitchActionsProps {
  pitch: SavedPitch;
  profile: MasterProfile;
}

/**
 * Strips all HTML tags and decodes common entities from a string.
 * Prevents AI-generated hyperlinks from rendering in the PDF print window.
 */
function sanitize(text: string): string {
  if (!text) return "";
  return text
    .normalize("NFC")
    .replace(/<[^>]*>/g, "")            // strip all HTML tags
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export function PitchActions({ pitch, profile }: PitchActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPdf = () => {
    const p = pitch.pitch;
    const ctx = pitch.context;

    const fullName = sanitize(profile.fullName);
    const jobTitle  = sanitize(profile.jobTitle);

    const dateStr = new Date(pitch.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    /* ── Scenario A bullets ── */
    const bulletsHtml =
      p.scenarioA.bullets && p.scenarioA.bullets.length > 0
        ? p.scenarioA.bullets
            .map(
              (b) =>
                `<tr>
                  <td class="check">✓</td>
                  <td class="btext">${sanitize(b)}</td>
                </tr>`
            )
            .join("")
        : "";

    /* ── Scenario B stats ── */
    const statsHtml =
      p.scenarioB.stats && p.scenarioB.stats.length > 0
        ? `<div class="stats">
            ${p.scenarioB.stats
              .map((s) => `<div class="stat">${sanitize(s.label)}</div>`)
              .join("")}
          </div>`
        : "";

    /* ── Profile Skills HTML ── */
    const skillsHtml =
      profile.skills && profile.skills.length > 0
        ? profile.skills
            .map((s) => `<span class="pdf-skill-tag">${sanitize(s)}</span>`)
            .join("")
        : "";

    /* ── Profile Projects HTML ── */
    const projectsHtml =
      profile.projects && profile.projects.length > 0
        ? profile.projects
            .map(
              (proj) =>
                `<div class="pdf-project-card">
                  <h4 class="pdf-project-title">${sanitize(proj.title)}</h4>
                  <div class="pdf-project-meta">
                    ${proj.role ? `<span><strong>Role:</strong> ${sanitize(proj.role)}</span>` : ""}
                    ${proj.outcome ? `<span><strong>Result:</strong> ${sanitize(proj.outcome)}</span>` : ""}
                  </div>
                  <p class="pdf-project-desc">${sanitize(proj.description)}</p>
                </div>`
            )
            .join("")
        : "";

    const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Pitch — ${fullName}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
/* ─── RESET ─── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
a{color:inherit;text-decoration:none}

/* ─── BASE ─── */
html,body{
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.75;
  color: #1a1a1a;
  background: #fff;
}
.wrap{
  width: 100%;
}

/* ─── TOP HEADER ─── */
.top-rule{
  border-bottom: 2px solid #111;
  padding-bottom: 18px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
}
.brand{
  flex-shrink: 0;
}
.brand-name{
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #111;
  display: block;
}
.brand-sub{
  font-size: 10px;
  color: #666;
  display: block;
  margin-top: 3px;
}
.meta{
  text-align: right;
  font-size: 11px;
  color: #444;
  line-height: 1.6;
  flex-shrink: 0;
  max-width: 380px;
}
.meta strong{color: #111; font-weight: 600}

/* ─── DIVIDER ─── */
.rule{border: none; border-top: 1px solid #e5e5e5; margin: 28px 0}

/* ─── PROFILE ROW ─── */
.profile{
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: #f8f9fa;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  margin-bottom: 36px;
}
.avatar{
  width: 44px; height: 44px;
  border-radius: 50%;
  background: #111;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.pname{font-size: 15px; font-weight: 700; color: #111}
.ptitle{font-size: 11px; color: #666; margin-top: 2px; font-weight: 500}

/* ─── SECTION LABELS ─── */
.label{
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #777;
  margin-bottom: 12px;
  display: block;
}

/* ─── PITCH TITLE ─── */
.pitch-title{
  font-size: 24px;
  font-weight: 800;
  color: #111;
  line-height: 1.3;
  margin-bottom: 18px;
  letter-spacing: -0.5px;
}

/* ─── BODY TEXT ─── */
.body{
  font-size: 13px;
  color: #2b2b2b;
  line-height: 1.8;
  margin-bottom: 28px;
  text-align: justify;
  text-justify: inter-word;
}

/* ─── PILLARS TABLE ─── */
.pillars-head{
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #444;
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 12px;
}
.pillars-table{
  width: 100%;
  border-collapse: collapse;
}
.pillars-table td{
  padding: 10px 0;
  vertical-align: top;
  border-bottom: 1px solid #f0f0f0;
}
.pillars-table .check{
  width: 24px;
  font-weight: 700;
  color: #111;
}
.pillars-table .btext{
  font-size: 12.5px;
  color: #333;
  line-height: 1.7;
  text-align: justify;
  text-justify: inter-word;
}
.pillars-table tr:last-child td{border-bottom: none}

/* ─── SCENARIO B BOX ─── */
.scenb{
  background: #f8f9fa;
  border-left: 4px solid #111;
  border-radius: 0 8px 8px 0;
  padding: 24px 28px;
  margin-top: 36px;
  border-top: 1px solid #eaeaea;
  border-right: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  page-break-inside: avoid;
}
.scenb-label{
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #777;
  margin-bottom: 10px;
}
.scenb-title{
  font-size: 16px;
  font-weight: 700;
  color: #111;
  margin-bottom: 12px;
  line-height: 1.35;
}
.scenb-body{
  font-size: 12.5px;
  color: #3b3b3b;
  line-height: 1.75;
  text-align: justify;
  text-justify: inter-word;
}

/* ─── STATS GRID ─── */
.stats{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 18px;
}
.stat{
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px 14px;
  font-size: 11.5px;
  color: #333;
  line-height: 1.5;
  font-weight: 500;
}

/* ─── PROFILE SKILLS & PROJECTS ─── */
.pdf-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}
.pdf-skill-tag {
  font-size: 10.5px;
  font-weight: 600;
  background: #f1f3f5;
  border: 1px solid #e9ecef;
  color: #495057;
  padding: 4px 10px;
  border-radius: 4px;
}
.pdf-projects {
  margin-top: 10px;
}
.pdf-project-card {
  margin-bottom: 12px;
  padding: 12px 14px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  page-break-inside: avoid;
}
.pdf-project-title {
  font-size: 12.5px;
  font-weight: 700;
  color: #1a1a1a;
}
.pdf-project-meta {
  font-size: 10px;
  color: #6c757d;
  margin: 3px 0 6px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.pdf-project-meta strong {
  color: #495057;
}
.pdf-project-desc {
  font-size: 11.5px;
  color: #495057;
  line-height: 1.6;
  text-align: justify;
  text-justify: inter-word;
}

/* ─── FOOTER ─── */
.footer{
  margin-top: 48px;
  padding-top: 18px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #888;
  font-weight: 500;
}

/* ─── PAGE BREAK HELPERS ─── */
.section{page-break-inside: avoid}

/* ─── PRINT PAGE SPEC ─── */
@page {
  size: A4;
  margin: 20mm 20mm 20mm 20mm;
}
@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
</head>
<body>
<div class="wrap">

  <!-- Header -->
  <div class="top-rule">
    <div class="brand">
      <span class="brand-name">Synthesis AI</span>
      <span class="brand-sub">Tailored Pitch Proposal</span>
    </div>
    <div class="meta">
      <div>Prepared for: <strong>${sanitize(ctx.targetAudience)}</strong></div>
      <div>Goal: <strong>${sanitize(ctx.pitchGoal)}</strong></div>
      <div>Date: <strong>${dateStr}</strong></div>
    </div>
  </div>

  <!-- Profile Header Card -->
  <div class="profile section">
    <div class="avatar">${fullName.slice(0,1).toUpperCase()}</div>
    <div>
      <div class="pname">${fullName}</div>
      <div class="ptitle">${jobTitle}</div>
    </div>
  </div>

  <!-- Scenario A -->
  <div class="section">
    <span class="label">Strategic Proposal — Scenario A</span>
    <div class="pitch-title">${sanitize(p.scenarioA.title)}</div>
    <div class="body">${sanitize(p.scenarioA.content)}</div>
  </div>

  ${bulletsHtml ? `
  <div class="section">
    <hr class="rule"/>
    <div class="pillars-head">Strategic Focus Pillars</div>
    <table class="pillars-table"><tbody>${bulletsHtml}</tbody></table>
    <hr class="rule"/>
  </div>` : "<hr class=\"rule\"/>"}

  <!-- Scenario B -->
  <div class="scenb section">
    <div class="scenb-label">Alternative Approach — ${sanitize(p.scenarioB.label)}</div>
    <div class="scenb-title">${sanitize(p.scenarioB.title)}</div>
    <div class="scenb-body">${sanitize(p.scenarioB.content)}</div>
    ${statsHtml}
  </div>

  <!-- Professional Profile Details Section -->
  <div class="section" style="margin-top: 36px;">
    <hr class="rule"/>
    <span class="label" style="margin-bottom: 16px;">Professional Biography &amp; Profile Details</span>
    
    <!-- About Me / Bio -->
    <div style="margin-bottom: 24px;">
      <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #495057; margin-bottom: 6px; letter-spacing: 1px;">About Me</h3>
      <p class="body" style="margin-bottom: 0;">${sanitize(profile.bio)}</p>
    </div>

    <!-- Skills -->
    ${skillsHtml ? `
    <div style="margin-bottom: 24px; page-break-inside: avoid;">
      <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #495057; margin-bottom: 8px; letter-spacing: 1px;">Core Capabilities</h3>
      <div class="pdf-skills">${skillsHtml}</div>
    </div>` : ""}

    <!-- Projects -->
    ${projectsHtml ? `
    <div style="margin-bottom: 0; page-break-inside: avoid;">
      <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #495057; margin-bottom: 10px; letter-spacing: 1px;">Portfolio Proof Points</h3>
      <div class="pdf-projects">${projectsHtml}</div>
    </div>` : ""}
  </div>

  <!-- Footer -->
  <div class="footer">
    <span>Generated via Synthesis AI</span>
    <span>${fullName} &nbsp;·&nbsp; ${jobTitle}</span>
  </div>

</div>
<script>
window.addEventListener("load", function(){
  setTimeout(function(){ window.print(); }, 400);
  setTimeout(function(){ window.close(); }, 2000);
});
</script>
</body>
</html>`;

    const pw = window.open("", "_blank");
    if (!pw) {
      alert("Pop-up blocked! Please allow pop-ups to export PDF.");
      return;
    }
    pw.document.open();
    pw.document.write(htmlContent);
    pw.document.close();
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-300 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg transition-all cursor-pointer"
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
      >
        <FileDown className="w-3.5 h-3.5" />
        Download PDF
      </button>
    </div>
  );
}
