"use client";

import { Suspense } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function ThemeToggleWrapper() {
  return (
    <Suspense fallback={null}>
      <ThemeToggle />
    </Suspense>
  );
}
