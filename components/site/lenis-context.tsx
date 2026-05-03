"use client";

import type Lenis from "lenis";
import { createContext, useContext } from "react";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

export const LenisProvider = LenisContext.Provider;
