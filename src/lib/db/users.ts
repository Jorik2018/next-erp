import type { User } from "@/lib/definitions";
import { getSql } from "./postgres";

export async function findUserByEmail(
  email: string
): Promise<User | undefined> {
  try {
    const sql = await getSql();

    const users = await sql<User[]>`
      SELECT
        id,
        name,
        email,
        password
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    return users[0];
  } catch (error) {
    console.error(
      "Failed to fetch user:",
      error
    );

    throw new Error("Failed to fetch user.");
  }
}