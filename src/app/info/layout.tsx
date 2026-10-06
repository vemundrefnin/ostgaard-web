import type { ReactNode } from "react";

/**
 * Public, shareable info pages owned by Østgaard (/info/*). No login — these
 * links are meant to be sent to DJs, photographers and other vendors, so the
 * content stays under Østgaard's control (and PostHog shows whether the link
 * was actually opened). Server-rendered static content with the brand frame.
 */
export default function InfoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Østgaard
          </p>
        </div>
      </header>
      <main className="mx-auto w-full max-w-2xl px-4 py-10">{children}</main>
    </div>
  );
}
