/**
 * @file app/sign-in/[[...sign-in]]/page.tsx
 * @description Beautifully styled Clerk sign-in page.
 */
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-container p-6">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <div className="text-center text-on-primary">
          <h1 className="text-2xl font-bold font-geist tracking-tight">Synthesis AI</h1>
          <p className="text-xs text-on-primary-container/80 mt-1 uppercase tracking-wider font-semibold">
            Context-Aware Pitch Generator
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-secondary text-on-secondary hover:bg-secondary/90 transition-colors text-xs uppercase font-bold tracking-wider",
              card: "border border-outline-variant bg-surface-container-lowest shadow-2xl rounded-2xl",
              headerTitle: "text-primary font-bold font-geist",
              headerSubtitle: "text-on-surface-variant",
              socialButtonsBlockButton: "border border-outline-variant hover:bg-surface-container-low transition-colors text-xs font-semibold text-primary",
              formFieldInput: "bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs text-primary focus:border-secondary outline-none",
              footerActionLink: "text-secondary hover:underline",
            },
          }}
        />
      </div>
    </div>
  );
}
