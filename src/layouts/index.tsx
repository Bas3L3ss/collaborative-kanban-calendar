import type { ReactNode } from "react";
import { TooltipProvider } from "@radix-ui/react-tooltip";

import { ThemeProvider } from "@/components/ui/theme-provider";

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
