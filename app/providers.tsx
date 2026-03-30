"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { store } from "@/stores/store";
import { AppToastContainer } from "@/components/common/app-toast";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <ReduxProvider store={store}>
      <NextThemesProvider {...themeProps}>
        {children}
        <AppToastContainer />
      </NextThemesProvider>
    </ReduxProvider>
  );
}
