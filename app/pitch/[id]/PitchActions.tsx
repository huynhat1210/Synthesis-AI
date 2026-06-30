/**
 * @file app/pitch/[id]/PitchActions.tsx
 * @description Client component — action buttons for the public pitch page.
 *              Handles PDF export with a clean, professional layout.
 */
"use client";

import React, { useState } from "react";
import { FileDown, Copy, Check } from "lucide-react";
import type { SavedPitch } from "@/types";

interface PitchActionsProps {
  pitch: SavedPitch;
  profileFullName: string;
  profileJobTitle: string;
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

    const fullName = sanitize(profileFullName);
    const jobTitle  = sanitize(profileJobTitle);

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

    const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Pitch — ${fullName}</title>
<style>
/* ─── RESET ─── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
a{color:inherit;text-decoration:none}

/* ─── BASE ─── */
html,body{
  font-family:"Segoe UI",Arial,"Helvetica Neue",sans-serif;
  font-size:13px;
  line-height:1.72;
  color:#111;
  background:#fff;
}
.wrap{
  width:740px;
  margin:0 auto;
  padding:52px 56px 64px;
}

/* ─── TOP RULE ─── */
.top-rule{
  border-top:3px solid #111;
  padding-top:16px;
  margin-bottom:28px;
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:24px;
}
.brand{
  flex-shrink:0;
}
.brand-name{
  font-size:11px;
  font-weight:900;
  letter-spacing:3px;
  text-transform:uppercase;
  color:#111;
  display:block;
}
.brand-sub{
  font-size:10px;
  color:#888;
  display:block;
  margin-top:2px;
}
.meta{
  text-align:right;
  font-size:11px;
  color:#555;
  line-height:1.8;
  flex-shrink:0;
  max-width:320px;
}
.meta strong{color:#111;font-weight:700}

/* ─── DIVIDER ─── */
.rule{border:none;border-top:1px solid #ddd;margin:24px 0}

/* ─── PROFILE ROW ─── */
.profile{
  display:flex;
  align-items:center;
  gap:14px;
  padding:14px 18px;
  background:#f7f7f7;
  border-radius:6px;
  margin-bottom:32px;
}
.avatar{
  width:42px;height:42px;
  border-radius:50%;
  background:#111;
  color:#fff;
  font-size:18px;
  font-weight:900;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
}
.pname{font-size:15px;font-weight:800;color:#111}
.ptitle{font-size:11px;color:#666;margin-top:1px}

/* ─── SECTION LABELS ─── */
.label{
  font-size:9.5px;
  font-weight:900;
  text-transform:uppercase;
  letter-spacing:3px;
  color:#888;
  margin-bottom:10px;
  display:block;
}

/* ─── PITCH TITLE ─── */
.pitch-title{
  font-size:26px;
  font-weight:900;
  color:#111;
  line-height:1.2;
  margin-bottom:16px;
  letter-spacing:-0.4px;
}

/* ─── BODY TEXT ─── */
.body{
  font-size:13.5px;
  color:#333;
  line-height:1.78;
  margin-bottom:28px;
}

/* ─── PILLARS TABLE ─── */
.pillars-head{
  font-size:9.5px;
  font-weight:900;
  text-transform:uppercase;
  letter-spacing:2.5px;
  color:#555;
  padding-bottom:8px;
  border-bottom:1px solid #ddd;
  margin-bottom:12px;
}
.pillars-table{
  width:100%;
  border-collapse:collapse;
}
.pillars-table .check{
  width:20px;
  padding:7px 10px 7px 0;
  font-weight:900;
  color:#111;
  vertical-align:top;
  border-bottom:1px solid #f2f2f2;
}
.pillars-table .btext{
  padding:7px 0;
  font-size:13px;
  color:#333;
  line-height:1.62;
  border-bottom:1px solid #f2f2f2;
}
.pillars-table tr:last-child .check,
.pillars-table tr:last-child .btext{border-bottom:none}

/* ─── SCENARIO B BOX ─── */
.scenb{
  background:#f4f4f4;
  border-left:3px solid #111;
  border-radius:0 6px 6px 0;
  padding:22px 24px;
  page-break-inside:avoid;
}
.scenb-label{
  font-size:9px;
  font-weight:900;
  text-transform:uppercase;
  letter-spacing:2.5px;
  color:#888;
  margin-bottom:8px;
}
.scenb-title{
  font-size:17px;
  font-weight:800;
  color:#111;
  margin-bottom:10px;
  line-height:1.3;
}
.scenb-body{
  font-size:12.5px;
  color:#444;
  line-height:1.72;
}

/* ─── STATS GRID ─── */
.stats{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:8px;
  margin-top:16px;
}
.stat{
  background:#fff;
  border:1px solid #ddd;
  border-radius:5px;
  padding:10px 12px;
  font-size:11.5px;
  color:#333;
  line-height:1.5;
}

/* ─── FOOTER ─── */
.footer{
  margin-top:48px;
  padding-top:16px;
  border-top:1px solid #ddd;
  display:flex;
  justify-content:space-between;
  font-size:9.5px;
  color:#aaa;
}

/* ─── PAGE BREAK HELPERS ─── */
.section{page-break-inside:avoid}

/* ─── PRINT ─── */
@page{size:A4;margin:0}
@media print{
  body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .wrap{padding:42px 52px 56px}
}
</style>
</head>
<body>
<div class="wrap">

  <!-- Header -->
  <div class="top-rule">
    <div class="brand">
      <span class="brand-name">Synthesis AI</span>
      <span class="brand-sub">Pitch Proposal</span>
    </div>
    <div class="meta">
      <div>Prepared for: <strong>${sanitize(ctx.targetAudience)}</strong></div>
      <div>Goal: <strong>${sanitize(ctx.pitchGoal)}</strong></div>
      <div>Date: <strong>${dateStr}</strong></div>
    </div>
  </div>

  <!-- Profile -->
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

  <!-- Footer -->
  <div class="footer">
    <span>Generated via Synthesis AI</span>
    <span>${fullName} &nbsp;·&nbsp; ${jobTitle}</span>
  </div>

</div>
<script>
window.addEventListener("load", function(){
  setTimeout(function(){ window.print(); }, 300);
  setTimeout(function(){ window.close(); }, 1500);
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
