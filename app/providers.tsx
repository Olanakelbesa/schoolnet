"use client";

import { SessionProvider } from "next-auth/react";
import ReduxProvider from "./Provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </SessionProvider>
  );
}
