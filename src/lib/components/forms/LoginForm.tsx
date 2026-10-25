// src/lib/components/forms/LoginForm.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { authService } from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    try {
      const user = await authService.login(
        email,
        password
      );

      router.push(
        `/patients/${user.id}/new-appointment`
      );
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">
        Patient login
      </h1>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      <button type="submit">
        Sign in
      </button>
    </form>
  );
}