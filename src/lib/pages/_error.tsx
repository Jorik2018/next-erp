"use client";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  return (
    <div>
      <h2>Something went wrong</h2>

      <p>{error.message || "An unexpected error occurred."}</p>

      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}