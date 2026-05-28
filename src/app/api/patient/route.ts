// app/api/patient/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  tablesDB,
} from "@/lib/appwrite.config";

// POST /api/patient
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let patientData: any = {};
    let file;

    // =========================
    // MULTIPART FORM DATA
    // =========================
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      const blobFile = formData.get("blobFile") as Blob | null;
      const fileName = formData.get("fileName") as string | null;

      if (blobFile && fileName) {
        const inputFile = InputFile.fromBuffer(
          Buffer.from(await blobFile.arrayBuffer()),
          fileName
        );

        file = await storage.createFile({
          bucketId: BUCKET_ID!,
          fileId: ID.unique(),
          file: inputFile,
        });
      }

      patientData = Object.fromEntries(formData.entries());

      delete patientData.blobFile;
      delete patientData.fileName;
    }

    // =========================
    // JSON
    // =========================
    else if (contentType.includes("application/json")) {
      patientData = await req.json();
    }

    // =========================
    // INVALID CONTENT TYPE
    // =========================
    else {
      return NextResponse.json(
        {
          error:
            "Unsupported content-type. Use application/json or multipart/form-data",
        },
        {
          status: 415,
        }
      );
    }

    // =========================
    // CREATE PATIENT
    // =========================
    const newPatient = await tablesDB.createRow({
      databaseId: DATABASE_ID!,
      tableId: PATIENT_COLLECTION_ID!,
      rowId: ID.unique(),
      data: {
        identificationDocumentId: file?.$id ?? null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
        ...patientData,
      },
    });

    return NextResponse.json(newPatient, {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating patient:", error);

    return NextResponse.json(
      {
        error: "Error creating patient",
      },
      {
        status: 500,
      }
    );
  }
}
// GET /api/patient?userId=xxx
export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const patients = await tablesDB.listRows({
      databaseId: DATABASE_ID!,
      tableId: PATIENT_COLLECTION_ID!,
      queries: [Query.equal("userId", [userId])],
    });

    return NextResponse.json(patients.rows[0] ?? null);
  } catch (error) {
    console.error("Error getting patient:", error);

    return NextResponse.json(
      { error: "Error getting patient" },
      { status: 500 }
    );
  }
}