/**
 * @file lib/storage.ts
 * @description Server-side PostgreSQL data persistence layer using Prisma ORM.
 *              Updated to support multi-user and multi-profile operations keyed by Clerk's userId.
 *
 * ⚠️  SERVER-ONLY.
 */

import { prisma } from "./prisma";
import type { MasterProfile, SavedPitch } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// MASTER PROFILE
// ─────────────────────────────────────────────────────────────────────────────

/** Reads all profiles belonging to a Clerk user */
export async function readAllProfiles(userId: string): Promise<MasterProfile[]> {
  try {
    const profiles = await prisma.masterProfile.findMany({
      where: { userId },
      orderBy: { profileName: "asc" },
    });
    return profiles.map((p) => ({
      id: p.id,
      profileName: p.profileName,
      isDefault: p.isDefault,
      fullName: p.fullName,
      jobTitle: p.jobTitle,
      bio: p.bio,
      skills: p.skills,
      projects: [], // Projects are loaded on demand for the active profile
      plan: p.plan as "free" | "pro",
    }));
  } catch (err) {
    console.error(`[PostgreSQL] Error in readAllProfiles for user ${userId}:`, err);
    return [];
  }
}

/** Reads the master profile from PostgreSQL for a specific authenticated user.
 *  Creates a default profile if none exists. */
export async function readProfile(userId: string, profileId?: string): Promise<MasterProfile> {
  try {
    const profile = await prisma.masterProfile.findFirst({
      where: profileId ? { id: profileId, userId } : { userId, isDefault: true },
      include: { projects: true },
    });

    if (profile) {
      return {
        id: profile.id,
        profileName: profile.profileName,
        isDefault: profile.isDefault,
        fullName: profile.fullName,
        jobTitle: profile.jobTitle,
        bio: profile.bio,
        skills: profile.skills,
        plan: profile.plan as "free" | "pro",
        projects: profile.projects.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          image: p.image ?? undefined,
          outcome: p.outcome ?? undefined,
          year: p.year ?? undefined,
        })),
      };
    }

    // If profile not found, initialize a clean default profile record
    console.log(`[PostgreSQL] Initializing clean default profile for Clerk User: ${userId}`);
    const newProfile = await prisma.masterProfile.create({
      data: {
        userId,
        profileName: "Primary Profile",
        isDefault: true,
        fullName: "",
        jobTitle: "",
        bio: "",
        skills: [],
      },
    });

    return {
      id: newProfile.id,
      profileName: newProfile.profileName,
      isDefault: newProfile.isDefault,
      fullName: "",
      jobTitle: "",
      bio: "",
      skills: [],
      projects: [],
      plan: "free",
    };
  } catch (err) {
    console.error(`[PostgreSQL] Error in readProfile for user ${userId}:`, err);
    return {
      fullName: "",
      jobTitle: "",
      bio: "",
      skills: [],
      projects: [],
    };
  }
}

/** Creates a new Master Profile record */
export async function createNewProfile(userId: string, name: string): Promise<MasterProfile> {
  try {
    const profile = await prisma.masterProfile.create({
      data: {
        userId,
        profileName: name,
        fullName: "",
        jobTitle: "",
        bio: "",
        skills: [],
      },
    });
    return {
      id: profile.id,
      profileName: profile.profileName,
      isDefault: profile.isDefault,
      fullName: "",
      jobTitle: "",
      bio: "",
      skills: [],
      projects: [],
      plan: "free",
    };
  } catch (err) {
    console.error(`[PostgreSQL] Error in createNewProfile:`, err);
    throw new Error("Failed to create profile.");
  }
}

/** Sets a specific profile as the default active one for the user */
export async function setDefaultProfile(userId: string, profileId: string): Promise<void> {
  try {
    await prisma.$transaction([
      prisma.masterProfile.updateMany({
        where: { userId },
        data: { isDefault: false },
      }),
      prisma.masterProfile.update({
        where: { id: profileId, userId },
        data: { isDefault: true },
      }),
    ]);
  } catch (err) {
    console.error(`[PostgreSQL] Error setting default profile:`, err);
    throw new Error("Failed to set active profile.");
  }
}

/** Writes/updates the master profile and syncs its projects in the database. */
export async function writeProfile(userId: string, profile: MasterProfile): Promise<void> {
  try {
    const profileId = profile.id;
    await prisma.$transaction(async (tx) => {
      // 1. Upsert/Update the profile basic info
      const saved = await tx.masterProfile.upsert({
        where: profileId ? { id: profileId } : { id: "non-existent" },
        update: {
          fullName: profile.fullName,
          jobTitle: profile.jobTitle,
          bio: profile.bio,
          skills: profile.skills,
          profileName: profile.profileName || "Profile",
          plan: profile.plan || "free",
        },
        create: {
          userId,
          fullName: profile.fullName,
          jobTitle: profile.jobTitle,
          bio: profile.bio,
          skills: profile.skills,
          profileName: profile.profileName || "Profile",
          isDefault: profile.isDefault ?? false,
          plan: profile.plan || "free",
        },
      });

      const targetProfileId = saved.id;

      // 2. Delete all previous projects to sync with the current array
      await tx.project.deleteMany({
        where: { profileId: targetProfileId },
      });

      // 3. Create all projects from scratch
      if (profile.projects.length > 0) {
        await tx.project.createMany({
          data: profile.projects.map((p) => ({
            id: p.id && isNaN(Number(p.id)) && p.id.length > 5 ? p.id : undefined,
            title: p.title,
            description: p.description,
            image: p.image || null,
            outcome: p.outcome || null,
            year: p.year || null,
            profileId: targetProfileId,
          })),
        });
      }
    });
  } catch (err) {
    console.error(`[PostgreSQL] Error in writeProfile for user ${userId}:`, err);
    throw new Error("Failed to write Master Profile to database.");
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SAVED PITCHES
// ─────────────────────────────────────────────────────────────────────────────

/** Reads all saved pitches for a specific profile (or overall user) */
export async function readPitches(userId: string, profileId?: string): Promise<SavedPitch[]> {
  try {
    const pitches = await prisma.savedPitch.findMany({
      where: profileId ? { profileId } : { profile: { userId } },
      orderBy: { createdAt: "desc" },
    });

    return pitches.map((p) => ({
      id: p.id,
      createdAt: p.createdAt.toISOString(),
      date: p.date,
      starred: p.starred,
      note: p.note ?? undefined,
      context: p.context as any,
      pitch: p.pitch as any,
      profileSnap: p.profileSnap as any,
    }));
  } catch (err) {
    console.error(`[PostgreSQL] Error in readPitches for user ${userId}:`, err);
    return [];
  }
}

/** Appends a new saved pitch linked to a specific profile */
export async function appendPitch(userId: string, pitch: SavedPitch): Promise<void> {
  try {
    // Read the active profile to link this pitch to it
    const activeProfile = await prisma.masterProfile.findFirst({
      where: { userId, isDefault: true },
    });

    if (!activeProfile) {
      throw new Error("No active profile found to link pitch.");
    }

    await prisma.savedPitch.create({
      data: {
        id: pitch.id,
        createdAt: new Date(pitch.createdAt),
        date: pitch.date,
        starred: pitch.starred ?? false,
        note: pitch.note || null,
        context: pitch.context as any,
        pitch: pitch.pitch as any,
        profileSnap: pitch.profileSnap as any,
        profileId: activeProfile.id,
      },
    });
  } catch (err) {
    console.error(`[PostgreSQL] Error in appendPitch for user ${userId}:`, err);
    throw new Error("Failed to save pitch to database.");
  }
}

/** Deletes a saved pitch by ID for a specific user */
export async function deletePitchById(userId: string, id: string): Promise<boolean> {
  try {
    const deleted = await prisma.savedPitch.delete({
      where: {
        id,
        profile: { userId },
      },
    });
    return !!deleted;
  } catch (err) {
    console.error(`[PostgreSQL] Error in deletePitchById for user ${userId}:`, err);
    return false;
  }
}

/** Toggles the starred status of a pitch for a specific user */
export async function togglePitchStar(userId: string, id: string): Promise<SavedPitch | null> {
  try {
    const current = await prisma.savedPitch.findFirst({
      where: { id, profile: { userId } },
    });

    if (!current) return null;

    const updated = await prisma.savedPitch.update({
      where: { id },
      data: { starred: !current.starred },
    });

    return {
      id: updated.id,
      createdAt: updated.createdAt.toISOString(),
      date: updated.date,
      starred: updated.starred,
      note: updated.note ?? undefined,
      context: updated.context as any,
      pitch: updated.pitch as any,
      profileSnap: updated.profileSnap as any,
    };
  } catch (err) {
    console.error(`[PostgreSQL] Error in togglePitchStar for user ${userId}:`, err);
    return null;
  }
}

/** Reads a saved pitch by ID for public access. 
 * Includes the profile details to show creator info on the shared landing page. */
export async function readPitchPublic(id: string): Promise<(SavedPitch & { creatorProfile?: MasterProfile }) | null> {
  try {
    const p = await prisma.savedPitch.findUnique({
      where: { id },
      include: {
        profile: {
          include: {
            projects: true,
          },
        },
      },
    });

    if (!p) return null;

    const creatorProfile: MasterProfile | undefined = p.profile
      ? {
          id: p.profile.id,
          profileName: p.profile.profileName,
          isDefault: p.profile.isDefault,
          fullName: p.profile.fullName,
          jobTitle: p.profile.jobTitle,
          bio: p.profile.bio,
          skills: p.profile.skills,
          projects: p.profile.projects.map((proj) => ({
            id: proj.id,
            title: proj.title,
            description: proj.description,
            image: proj.image ?? undefined,
            outcome: proj.outcome ?? undefined,
            year: proj.year ?? undefined,
          })),
        }
      : undefined;

    return {
      id: p.id,
      createdAt: p.createdAt.toISOString(),
      date: p.date,
      starred: p.starred,
      note: p.note ?? undefined,
      context: p.context as any,
      pitch: p.pitch as any,
      profileSnap: p.profileSnap as any,
      creatorProfile,
    };
  } catch (err) {
    console.error(`[PostgreSQL] Error in readPitchPublic for id ${id}:`, err);
    return null;
  }
}
