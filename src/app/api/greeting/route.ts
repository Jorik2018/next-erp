// src/app/api/greeting/route.ts
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const name = searchParams.get('name')

  if (!name) {
    return NextResponse.json(
      { message: 'name is required' },
      { status: 400 },
    )
  }

  return NextResponse.json({
    message: `hello ${name}`,
  })
}