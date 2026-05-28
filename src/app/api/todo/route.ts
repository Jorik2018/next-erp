// src/app/api/todo/route.ts
import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  const client = await clientPromise
  const db = client.db('learnspace')

  const todos = await db
    .collection('todos')
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  return NextResponse.json(todos)
}

export async function POST(req: Request) {
  const body = await req.json()

  if (!body.title) {
    return NextResponse.json(
      { message: 'title is required' },
      { status: 400 },
    )
  }

  const client = await clientPromise
  const db = client.db('learnspace')

  const todo = {
    title: body.title,
    completed: false,
    createdAt: new Date(),
  }

  const result = await db.collection('todos').insertOne(todo)

  return NextResponse.json({
    _id: result.insertedId,
    ...todo,
  })
}

export async function PATCH(req: Request) {
  const body = await req.json()

  if (!body._id) {
    return NextResponse.json(
      { message: '_id is required' },
      { status: 400 },
    )
  }

  const client = await clientPromise
  const db = client.db('learnspace')

  await db.collection('todos').updateOne(
    { _id: new ObjectId(body._id) },
    {
      $set: {
        completed: Boolean(body.completed),
        updatedAt: new Date(),
      },
    },
  )

  return NextResponse.json({ success: true })
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { message: 'id is required' },
      { status: 400 },
    )
  }

  const client = await clientPromise
  const db = client.db('learnspace')

  await db.collection('todos').deleteOne({
    _id: new ObjectId(id),
  })

  return NextResponse.json({ success: true })
}