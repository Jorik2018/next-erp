import {
  NextRequest,
  NextResponse,
} from "next/server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

import { getAppwrite } from "@/lib/appwrite/server";
import { APPWRITE } from "@/lib/constants/appwrite";

type PatientData = Record<
  string,
  FormDataEntryValue | unknown
>;

/**
 * POST /api/patient
 *
 * Creates a patient and optionally uploads
 * an identification document.
 */
export async function POST(
  req: NextRequest
) {
  try {
    const {
      storage,
      tablesDB,
      endpoint,
      projectId,
    } = await getAppwrite();

    const contentType =
      req.headers.get("content-type") ?? "";

    let patientData: PatientData = {};
    let identificationDocumentId:
      | string
      | null = null;

    // ============================================================
    // Multipart FormData
    // ============================================================

    if (
      contentType.includes(
        "multipart/form-data"
      )
    ) {
      const formData = await req.formData();

      const blobFile =
        formData.get("blobFile");

      const fileName =
        formData.get("fileName");

      if (
        blobFile instanceof Blob &&
        typeof fileName === "string" &&
        fileName.length > 0
      ) {
        const inputFile =
          InputFile.fromBuffer(
            Buffer.from(
              await blobFile.arrayBuffer()
            ),
            fileName
          );

        const uploadedFile =
          await storage.createFile({
            bucketId:
              APPWRITE.BUCKETS
                .PATIENT_DOCUMENTS,

            fileId: ID.unique(),

            file: inputFile,
          });

        identificationDocumentId =
          uploadedFile.$id;
      }

      patientData =
        Object.fromEntries(
          formData.entries()
        );

      delete patientData.blobFile;
      delete patientData.fileName;
    }

    // ============================================================
    // JSON
    // ============================================================

    else if (
      contentType.includes(
        "application/json"
      )
    ) {
      patientData =
        (await req.json()) as PatientData;
    }

    // ============================================================
    // Unsupported content type
    // ============================================================

    else {
      return NextResponse.json(
        {
          error:
            "Unsupported content-type. Use application/json or multipart/form-data.",
        },
        {
          status: 415,
        }
      );
    }

    // ============================================================
    // Identification document URL
    // ============================================================

    const identificationDocumentUrl =
      identificationDocumentId
        ? buildDocumentUrl({
            endpoint,
            projectId,
            fileId:
              identificationDocumentId,
          })
        : null;

    // ============================================================
    // Create patient
    // ============================================================

    const newPatient =
      await tablesDB.createRow({
        databaseId:
          APPWRITE.DATABASE_ID,

        tableId:
          APPWRITE.TABLES.PATIENTS,

        rowId: ID.unique(),

        data: {
          ...patientData,

          identificationDocumentId,

          identificationDocumentUrl,
        },
      });

    return NextResponse.json(
      newPatient,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Error creating patient:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Error creating patient",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * GET /api/patient?userId=xxx
 *
 * Returns the patient associated with
 * the supplied application user.
 */
export async function GET(
  req: NextRequest
) {
  try {
    const userId =
      req.nextUrl.searchParams.get(
        "userId"
      );

    if (!userId) {
      return NextResponse.json(
        {
          error:
            "userId is required",
        },
        {
          status: 400,
        }
      );
    }

    const { tablesDB } =
      await getAppwrite();

    const patients =
      await tablesDB.listRows({
        databaseId:
          APPWRITE.DATABASE_ID,

        tableId:
          APPWRITE.TABLES.PATIENTS,

        queries: [
          Query.equal(
            "userId",
            [userId]
          ),
        ],
      });

    return NextResponse.json(
      patients.rows[0] ?? null
    );
  } catch (error) {
    console.error(
      "Error getting patient:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Error getting patient",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * Creates the Appwrite file view URL.
 */
function buildDocumentUrl({
  endpoint,
  projectId,
  fileId,
}: {
  endpoint: string;
  projectId: string;
  fileId: string;
}) {
  const bucketId =
    APPWRITE.BUCKETS.PATIENT_DOCUMENTS;

  return (
    `${endpoint}/storage/buckets/` +
    `${bucketId}/files/` +
    `${fileId}/view` +
    `?project=${encodeURIComponent(projectId)}`
  );
}