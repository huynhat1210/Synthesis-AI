/**
 * @file app/page.tsx
 * @description Root page — redirects to /dashboard immediately.
 */
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/dashboard");
}
