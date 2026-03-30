"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@heroui/react";

import { useGetMeQuery } from "@/stores/api/auth-api";
import { useAppSelector } from "@/stores/hooks";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isLoading, isError } = useGetMeQuery(undefined, {
    skip: isAuthenticated,
  });

  useEffect(() => {
    if (!isLoading && (isError || !isAuthenticated)) {
      router.replace("/login");
    }
  }, [isLoading, isError, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
