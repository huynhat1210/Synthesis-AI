"use server";
/**
 * @file actions/manageProfiles.ts
 * @description Server Actions to list, create, and set active Master Profiles.
 */

import { auth } from "@clerk/nextjs/server";
import { readAllProfiles, createNewProfile, setDefaultProfile, readProfile } from "@/lib/storage";
import type { MasterProfile, ApiResponse } from "@/types";

/** Lists all profiles belonging to the authenticated user */
export async function getProfilesAction(): Promise<ApiResponse<MasterProfile[]>> {
  const { userId } = await auth();
  if (!userId) {
    return { data: null, error: "Unauthorized. Please sign in again." };
  }

  try {
    const list = await readAllProfiles(userId);
    return { data: list, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load profiles list.";
    return { data: null, error: message };
  }
}

/** Creates a new Master Profile under the user's account */
export async function createProfileAction(
  name: string
): Promise<ApiResponse<MasterProfile>> {
  const { userId } = await auth();
  if (!userId) {
    return { data: null, error: "Unauthorized. Please sign in again." };
  }

  const cleanName = name.trim();
  if (!cleanName) {
    return { data: null, error: "Profile name is required." };
  }

  try {
    const newProfile = await createNewProfile(userId, cleanName);
    return { data: newProfile, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create new profile.";
    return { data: null, error: message };
  }
}

/** Switches the default active profile for the authenticated user and returns its details */
export async function selectProfileAction(
  profileId: string
): Promise<ApiResponse<MasterProfile>> {
  const { userId } = await auth();
  if (!userId) {
    return { data: null, error: "Unauthorized. Please sign in again." };
  }

  try {
    await setDefaultProfile(userId, profileId);
    const updatedProfile = await readProfile(userId, profileId);
    return { data: updatedProfile, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to switch profiles.";
    return { data: null, error: message };
  }
}
