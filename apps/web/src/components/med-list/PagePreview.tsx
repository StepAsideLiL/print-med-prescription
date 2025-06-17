"use client";

import { pageSizesMap } from "@/lib/constants";
import { store } from "@/lib/store";

export default function PagePreview({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { get } = store.CurrentPageSize();

  const style: React.CSSProperties = {
    width: `${pageSizesMap[get].width}px`,
    height: `${pageSizesMap[get].height}px`,
  };

  return (
    <div className="bg-background mx-auto border" style={style}>
      {children}
    </div>
  );
}
