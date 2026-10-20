"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

import { APPWRITE } from "@/constants/appwrite";
import { getAppwrite } from "@/lib/appwrite/server";
import { parseStringify } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                              Create Appwrite User                          */
/* -------------------------------------------------------------------------- */

export const createUser = async (
  user: CreateUserParams
) => {
  const { users } = await getAppwrite();

  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newUser);
  } catch (error: unknown) {
    if (
      isAppwriteConflictError(error)
    ) {
      const existingUsers =
        await users.list({
          queries: [
            Query.equal(
              "email",
              [user.email]
            ),
          ],
        });

      return parseStringify(
        existingUsers.users[0]
      );
    }

    console.error(
      "An error occurred while creating a new user:",
      error
    );

    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                                  Get User                                  */
/* -------------------------------------------------------------------------- */

export const getUser = async (
  userId: string
) => {
  try {
    const { users } =
      await getAppwrite();

    const user =
      await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );

    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                              Register Patient                              */
/* -------------------------------------------------------------------------- */

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    const {
      storage,
      tablesDB,
      endpoint,
      projectId,
    } = await getAppwrite();

    let identificationDocumentId:
      | string
      | null = null;

    if (identificationDocument) {
      const blobFile =
        identificationDocument.get(
          "blobFile"
        );

      const fileName =
        identificationDocument.get(
          "fileName"
        );

      if (
        blobFile instanceof Blob &&
        typeof fileName === "string"
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
    }

    const identificationDocumentUrl =
      identificationDocumentId
        ? buildDocumentUrl({
            endpoint,
            projectId,
            fileId:
              identificationDocumentId,
          })
        : null;

    const newPatient =
      await tablesDB.createRow({
        databaseId:
          APPWRITE.DATABASE_ID,

        tableId:
          APPWRITE.TABLES.PATIENTS,

        rowId: ID.unique(),

        data: {
          ...patient,

          identificationDocumentId,

          identificationDocumentUrl,
        },
      });

    return parseStringify(
      newPatient
    );
  } catch (error) {
    console.error(
      "An error occurred while creating a new patient:",
      error
    );

    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                                Get Patient                                 */
/* -------------------------------------------------------------------------- */

export const getPatient = async (
  userId: string
) => {
  try {
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

    return parseStringify(
      patients.rows[0] ?? null
    );
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );

    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

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

function isAppwriteConflictError(
  error: unknown
): error is { code: number } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown })
      .code === 409
  );
}