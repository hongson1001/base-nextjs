"use client";

import { Spinner } from "@heroui/react";

export default function AdminLoading() {
  return (
    <div className="flex h-full min-h-[400px] items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
