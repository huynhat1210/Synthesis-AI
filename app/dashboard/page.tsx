/**
 * @file app/dashboard/page.tsx
 * @description Main Dashboard Server Component.
 *              Retrieves Clerk's authenticated userId and pre-fetches the database values.
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { readPitches, readProfile, readAllProfiles } from "@/lib/storage";
import { DashboardClient } from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View and generate context-aware pitches from your Master Profile.",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const [pitches, profile, allProfiles] = await Promise.all([
    readPitches(userId),
    readProfile(userId),
    readAllProfiles(userId),
  ]);
  const hasApiKey = !!process.env.GEMINI_API_KEY;

  return (
    <DashboardClient
      initialPitches={pitches}
      profile={profile}
      initialProfiles={allProfiles}
      hasApiKey={hasApiKey}
    />
  );
}
