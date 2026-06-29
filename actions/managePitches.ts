"use server";
/**
 * @file actions/managePitches.ts
 * @description Server Actions: CRUD operations for saved pitches isolated by Clerk userId.
 */

import { auth } from "@clerk/nextjs/server";
import {
  readPitches,
  deletePitchById,
  togglePitchStar,
} from "@/lib/storage";
import type { SavedPitch, ApiResponse } from "@/types";

/** Returns all saved pitches for the logged-in user, newest first. */
export async function getPitchesAction(): Promise<ApiResponse<SavedPitch[]>> {
  const { userId } = await auth();
  if (!userId) {
    return { data: null, error: "Unauthorized. Please sign in again." };
  }

  try {
    const pitches = await readPitches(userId);
    return { data: pitches, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load pitches.";
    return { data: null, error: message };
  }
}

/** Deletes a single saved pitch by ID for the logged-in user. */
export async function deletePitchAction(
  id: string
): Promise<ApiResponse<boolean>> {
  const { userId } = await auth();
  if (!userId) {
    return { data: null, error: "Unauthorized. Please sign in again." };
  }

  try {
    const deleted = await deletePitchById(userId, id);
    if (!deleted) return { data: false, error: `Pitch with id "${id}" not found.` };
    return { data: true, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete pitch.";
    return { data: null, error: message };
  }
}

/** Toggles the starred status of a pitch for the logged-in user. */
export async function starPitchAction(
  id: string
): Promise<ApiResponse<SavedPitch>> {
  const { userId } = await auth();
  if (!userId) {
    return { data: null, error: "Unauthorized. Please sign in again." };
  }

  try {
    const updated = await togglePitchStar(userId, id);
    if (!updated) return { data: null, error: `Pitch with id "${id}" not found.` };
    return { data: updated, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update pitch.";
    return { data: null, error: message };
  }
}
