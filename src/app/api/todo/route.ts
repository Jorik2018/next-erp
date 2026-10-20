// src/app/api/todo/route.ts

import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

import { getMongoClient } from "@/lib/mongodb";

const DATABASE_NAME = "learnspace";
const COLLECTION_NAME = "todos";

export async function GET() {
  try {
    const client = await getMongoClient();

    const db = client.db(DATABASE_NAME);

    const todos = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({
        createdAt: -1,
      })
      .toArray();

    return NextResponse.json(todos);
  } catch (error) {
    console.error(
      "Error retrieving todos:",
      error
    );

    return NextResponse.json(
      {
        message: "Unable to retrieve todos",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (
      typeof body.title !== "string" ||
      !body.title.trim()
    ) {
      return NextResponse.json(
        {
          message: "title is required",
        },
        {
          status: 400,
        }
      );
    }

    const client = await getMongoClient();

    const db = client.db(DATABASE_NAME);

    const todo = {
      title: body.title.trim(),
      completed: false,
      createdAt: new Date(),
    };

    const result = await db
      .collection(COLLECTION_NAME)
      .insertOne(todo);

    return NextResponse.json(
      {
        _id: result.insertedId,
        ...todo,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Error creating todo:",
      error
    );

    return NextResponse.json(
      {
        message: "Unable to create todo",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    if (
      typeof body._id !== "string" ||
      !ObjectId.isValid(body._id)
    ) {
      return NextResponse.json(
        {
          message:
            "A valid _id is required",
        },
        {
          status: 400,
        }
      );
    }

    const client = await getMongoClient();

    const db = client.db(DATABASE_NAME);

    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        {
          _id: new ObjectId(body._id),
        },
        {
          $set: {
            completed: Boolean(
              body.completed
            ),
            updatedAt: new Date(),
          },
        }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          message: "Todo not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Error updating todo:",
      error
    );

    return NextResponse.json(
      {
        message: "Unable to update todo",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } =
      new URL(req.url);

    const id =
      searchParams.get("id");

    if (
      !id ||
      !ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          message:
            "A valid id is required",
        },
        {
          status: 400,
        }
      );
    }

    const client = await getMongoClient();

    const db = client.db(DATABASE_NAME);

    const result = await db
      .collection(COLLECTION_NAME)
      .deleteOne({
        _id: new ObjectId(id),
      });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          message: "Todo not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Error deleting todo:",
      error
    );

    return NextResponse.json(
      {
        message: "Unable to delete todo",
      },
      {
        status: 500,
      }
    );
  }
}