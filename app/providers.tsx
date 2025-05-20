"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ProfileProvider } from "@/contexts/profile-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ProfileProvider>{children}</ProfileProvider>
    </Provider>
  );
}