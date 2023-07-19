"use client";

import { ReduxProvider } from "./redux,provider";
import { ThemeRegistry } from "./mui-provider/theme.provider";
import { AuthProvider } from "./auth.provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeRegistry>
        <ReduxProvider>{children}</ReduxProvider>
      </ThemeRegistry>
    </AuthProvider>
  );
};
