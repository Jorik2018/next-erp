"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { authService } from "@/lib/auth";

export default function RegisterAccountForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    try {
      const user = await authService.register({
        name,
        email,
        password,
      });

      router.push(
        `/patients/${user.id}/register`
      );
    } catch (error) {
      console.error(error);
      setError("Could not create account");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">
        Create patient account
      </h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        required
      />

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
        minLength={8}
        required
      />

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      <button type="submit">
        Create account
      </button>
    </form>
  );
}