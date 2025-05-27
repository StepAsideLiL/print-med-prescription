"use client";

import { store } from "@/lib/store";
import { cn } from "@workspace/design-system/lib/utils";

export default function Main({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { set } = store.SelectSection();

  return (
    <main className={cn(className)} onClick={() => set(null)}>
      {children}
    </main>
  );
}
