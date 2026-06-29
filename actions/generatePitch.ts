"use server";
/**
 * @file actions/generatePitch.ts
 * @description Server Action: generates a context-aware pitch via Gemini AI
 *              and saves the result to the database for the authenticated Clerk user.
 */

import { nanoid } from "nanoid";
import { auth } from "@clerk/nextjs/server";
import { generateContextualPitch } from "@/lib/gemini";
import { readProfile, appendPitch } from "@/lib/storage";
import { formatDate } from "@/lib/utils";
import type { ClientContext, SavedPitch, ApiResponse } from "@/types";

/**
 * Validates that the required ClientContext fields are present.
 * Returns an error string if invalid, null if valid.
 */
function validateContext(context: ClientContext): string | null {
  if (!context.targetAudience?.trim()) {
    return "Target audience is required.";
  }
  if (!context.pitchGoal?.trim()) {
    return "Pitch goal is required.";
  }
  return null;
}

/**
 * Main Server Action — generates a pitch and saves it.
 */
export async function generatePitchAction(
  context: ClientContext
): Promise<ApiResponse<SavedPitch>> {
  const { userId } = await auth();
  if (!userId) {
    return { data: null, error: "Unauthorized. Please sign in again." };
  }

  // ── 1. Validate inputs ───────────────────────────────────────────────────
  const validationError = validateContext(context);
  if (validationError) {
    return { data: null, error: validationError };
  }

  // ── 2. Read master profile from database ─────────────────────────────────
  const profile = await readProfile(userId);

  // Filter skills to only include user-selected ones if specified
  const filteredProfile = {
    ...profile,
    skills: context.selectedSkills && context.selectedSkills.length > 0
      ? profile.skills.filter((s) => context.selectedSkills!.includes(s))
      : profile.skills,
  };

  // ── 3. Call Gemini AI service ────────────────────────────────────────────
  const { data: generatedPitch, error: geminiError } =
    await generateContextualPitch(filteredProfile, context);

  if (!generatedPitch) {
    return {
      data: null,
      error: geminiError ?? "Failed to generate pitch — please try again.",
    };
  }

  // ── 4. Build SavedPitch record ───────────────────────────────────────────
  const now = new Date().toISOString();
  const savedPitch: SavedPitch = {
    id: nanoid(),
    createdAt: now,
    date: formatDate(now),
    context,
    pitch: generatedPitch,
    profileSnap: {
      fullName: profile.fullName,
      jobTitle: profile.jobTitle,
      avatarUrl: profile.avatarUrl,
    },
    starred: false,
  };

  // ── 5. Persist to storage ─────────────────────────────────────────────────
  try {
    await appendPitch(userId, savedPitch);
  } catch (storageError) {
    console.error("[Storage] Failed to save pitch:", storageError);
    return {
      data: savedPitch,
      error:
        geminiError ||
        (storageError instanceof Error ? storageError.message : String(storageError)),
    };
  }

  return { data: savedPitch, error: geminiError };
}
