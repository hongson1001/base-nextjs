import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

interface ApiErrorData {
  message?: string;
  code?: string;
  errors?: Array<{ field: string; message: string }>;
  [key: string]: unknown;
}

type RtkError = FetchBaseQueryError | SerializedError | undefined;

/**
 * Type guard: checks whether the error is an RTK Query FetchBaseQueryError.
 */
export function isApiError(error: unknown): error is FetchBaseQueryError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in error
  );
}

/**
 * Parses an RTK Query error into a structured object with status, code, and message.
 */
export function parseApiError(error: RtkError): {
  status: number | string;
  code: string;
  message: string;
  fieldErrors?: Array<{ field: string; message: string }>;
} {
  if (!error) {
    return { status: 0, code: "UNKNOWN", message: "An unknown error occurred" };
  }

  if (isApiError(error)) {
    const data = error.data as ApiErrorData | undefined;

    return {
      status: error.status,
      code: data?.code ?? "API_ERROR",
      message: data?.message ?? "An error occurred",
      fieldErrors: data?.errors,
    };
  }

  // SerializedError (e.g. network failure, thrown in middleware)
  const serialized = error as SerializedError;

  return {
    status: "FETCH_ERROR",
    code: serialized.code ?? "SERIALIZED_ERROR",
    message: serialized.message ?? "An error occurred",
  };
}

/**
 * Returns a single human-readable error message from an RTK Query error.
 */
export function getErrorMessage(error: RtkError): string {
  return parseApiError(error).message;
}
