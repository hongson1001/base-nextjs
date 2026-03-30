"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div className="w-full rounded-xl border border-default-200 bg-content1 p-6 shadow-sm">
      <div className="mb-6 flex flex-col items-center gap-2">
        <Logo size={48} />
        <h1 className="text-xl font-semibold">Sign In</h1>
        <p className="text-sm text-default-500">
          Enter your credentials to continue
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {apiError && (
          <div className="rounded-lg bg-danger-50 p-3 text-sm text-danger">
            {apiError}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            required
            autoComplete="email"
            className="rounded-lg border border-default-300 bg-default-100 px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
            id="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            required
            autoComplete="current-password"
            className="rounded-lg border border-default-300 bg-default-100 px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
            id="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="mt-2 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-sm text-default-500">
          Don&apos;t have an account?{" "}
          <Link className="text-primary hover:underline" href="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
