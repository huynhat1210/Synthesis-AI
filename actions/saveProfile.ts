"use server";
/**
 * @file actions/saveProfile.ts
 * @description Server Action: validates and persists the Master Profile for the authenticated Clerk user.
 */

import { auth } from "@clerk/nextjs/server";
import { writeProfile } from "@/lib/storage";
import type { MasterProfile, ApiResponse } from "@/types";

function validateProfile(profile: MasterProfile): string | null {
  if (!profile.fullName?.trim()) return "Full name is required.";
  if (!profile.jobTitle?.trim()) return "Job title is required.";
  if (!profile.bio?.trim()) return "Bio is required.";
  return null;
}

/**
 * Saves the master profile to the database, isolated by Clerk userId.
 */
export async function saveProfileAction(
  profile: MasterProfile
): Promise<ApiResponse<MasterProfile>> {
  const { userId } = await auth();
  if (!userId) {
    return { data: null, error: "Unauthorized. Please sign in again." };
  }

  const validationError = validateProfile(profile);
  if (validationError) {
    return { data: null, error: validationError };
  }

  try {
    await writeProfile(userId, profile);
    return { data: profile, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save profile.";
    return { data: null, error: message };
  }
}
