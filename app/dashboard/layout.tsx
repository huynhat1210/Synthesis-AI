/**
 * @file app/dashboard/layout.tsx
 * @description Simple layout wrapper to allow DashboardClient to manage
 *              the sidebar, topbar, and tab state in a unified client space.
 */
import { readProfile } from "@/lib/storage";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      {children}
    </div>
  );
}
