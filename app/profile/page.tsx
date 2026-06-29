/**
 * @file app/profile/page.tsx
 * @description Profile editor is now embedded in the unified dashboard tab layout.
 *              Redirects to /dashboard.
 */
import { redirect } from "next/navigation";

export default function ProfileRedirect() {
  redirect("/dashboard");
}
