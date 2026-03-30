"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Separator,
} from "@heroui/react";

import { AppInput } from "@/components/common/app-input";
import { AppButton } from "@/components/common/app-button";
import { useLoginMutation } from "@/stores/api/auth-api";
import { Logo } from "@/components/icons";

export default function LoginPage() {
  const router = useRouter();
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const apiError =
    error && "data" in error
      ? ((error.data as { message?: string })?.message ?? "Login failed")
      : error
        ? "An unexpected error occurred"
        : null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
      router.push("/");
    } catch {
      // Error is handled via RTK Query error state
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center gap-2 pb-0 pt-6">
        <Logo size={48} />
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to continue</CardDescription>
      </CardHeader>
      <Separator className="my-4" />
      <CardContent className="px-6 pb-6">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {apiError && (
            <div className="rounded-lg bg-danger-50 p-3 text-sm text-danger">
              {apiError}
            </div>
          )}

          <AppInput
            isRequired
            autoComplete="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AppInput
            isRequired
            autoComplete="current-password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <AppButton
            className="mt-2"
            isLoading={isLoading}
            type="submit"
            variant="primary"
          >
            Sign In
          </AppButton>

          <p className="text-center text-sm text-default-500">
            Don&apos;t have an account?{" "}
            <Link className="text-primary hover:underline" href="/register">
              Register
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
