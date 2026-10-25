import type { NextRequest } from "next/server";

import { handler } from "@/lib/api/graphql/next-handler";

export async function GET(
  request: NextRequest
): Promise<Response> {
  return handler(request);
}

export async function POST(
  request: NextRequest
): Promise<Response> {
  return handler(request);
}