import {
  AppwriteException,
  Client,
  TablesDB,
  RelationshipType,
  RelationMutate,
} from "node-appwrite";

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;

const TABLES = {
  PATIENTS: "patients",
  APPOINTMENTS: "appointments",
} as const;

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const tablesDB = new TablesDB(client);

async function tableExists(tableId: string) {
  try {
    await tablesDB.getTable({
      databaseId: DATABASE_ID,
      tableId,
    });

    return true;
  } catch (error) {
    if (
      error instanceof AppwriteException &&
      error.code === 404
    ) {
      return false;
    }

    throw error;
  }
}

/* -------------------------------------------------------------------------- */
/*                                Patients                                    */
/* -------------------------------------------------------------------------- */

async function createPatientsTable() {
  const exists = await tableExists(TABLES.PATIENTS);

  if (exists) {
    console.log(
      `✓ Patients already exists: ${TABLES.PATIENTS}`,
    );

    return;
  }

  await tablesDB.createTable({
    databaseId: DATABASE_ID,
    tableId: TABLES.PATIENTS,
    name: "Patients",

    columns: [
      {
        key: "userId",
        type: "varchar",
        size: 64,
        required: true,
      },
      {
        key: "authUserId",
        type: "varchar",
        size: 128,
        required: false,
      },
      {
        key: "name",
        type: "varchar",
        size: 128,
        required: true,
      },
      {
        key: "email",
        type: "email",
        required: true,
      },
      {
        key: "phone",
        type: "varchar",
        size: 32,
        required: true,
      },
      {
        key: "birthDate",
        type: "datetime",
        required: true,
      },
      {
        key: "gender",
        type: "varchar",
        size: 32,
        required: true,
      },
      {
        key: "address",
        type: "varchar",
        size: 255,
        required: true,
      },
      {
        key: "occupation",
        type: "varchar",
        size: 128,
        required: true,
      },
      {
        key: "emergencyContactName",
        type: "varchar",
        size: 128,
        required: true,
      },
      {
        key: "emergencyContactNumber",
        type: "varchar",
        size: 32,
        required: true,
      },
      {
        key: "primaryPhysician",
        type: "varchar",
        size: 128,
        required: true,
      },
      {
        key: "insuranceProvider",
        type: "varchar",
        size: 128,
        required: true,
      },
      {
        key: "insurancePolicyNumber",
        type: "varchar",
        size: 128,
        required: true,
      },
      {
        key: "allergies",
        type: "varchar",
        size: 2000,
        required: false,
      },
      {
        key: "currentMedication",
        type: "varchar",
        size: 2000,
        required: false,
      },
      {
        key: "familyMedicalHistory",
        type: "varchar",
        size: 4000,
        required: false,
      },
      {
        key: "pastMedicalHistory",
        type: "varchar",
        size: 4000,
        required: false,
      },
      {
        key: "identificationType",
        type: "varchar",
        size: 64,
        required: false,
      },
      {
        key: "identificationNumber",
        type: "varchar",
        size: 64,
        required: false,
      },
      {
        key: "identificationDocumentId",
        type: "varchar",
        size: 64,
        required: false,
      },
      {
        key: "privacyConsent",
        type: "boolean",
        required: true,
      },
    ],

    indexes: [
      {
        key: "idx_patient_user",
        type: "key",
        attributes: ["userId"],
      },
      {
        key: "idx_patient_email",
        type: "key",
        attributes: ["email"],
      },
    ],
  });

  console.log("✓ Patients created");
}

/* -------------------------------------------------------------------------- */
/*                              Appointments                                  */
/* -------------------------------------------------------------------------- */

async function createAppointmentsTable() {
  const exists = await tableExists(
    TABLES.APPOINTMENTS,
  );

  if (exists) {
    console.log(
      `✓ Appointments already exists: ${TABLES.APPOINTMENTS}`,
    );

    return;
  }

  await tablesDB.createTable({
    databaseId: DATABASE_ID,
    tableId: TABLES.APPOINTMENTS,
    name: "Appointments",

    columns: [

      {
        key: "userId",
        type: "varchar",
        size: 64,
        required: true,
      },
      {
        key: "schedule",
        type: "datetime",
        required: true,
      },
      {
        key: "status",
        type: "enum",
        elements: [
          "pending",
          "scheduled",
          "cancelled",
        ],
        required: true,
      },
      {
        key: "primaryPhysician",
        type: "varchar",
        size: 128,
        required: true,
      },
      {
        key: "reason",
        type: "varchar",
        size: 1000,
        required: true,
      },
      {
        key: "note",
        type: "varchar",
        size: 1000,
        required: false,
      },
      {
        key: "cancellationReason",
        type: "varchar",
        size: 1000,
        required: false,
      },
    ],

    indexes: [

      {
        key: "idx_appointment_user",
        type: "key",
        attributes: ["userId"],
      },
      {
        key: "idx_appointment_status",
        type: "key",
        attributes: ["status"],
      },
      {
        key: "idx_appointment_schedule",
        type: "key",
        attributes: ["schedule"],
      },
    ],
  });

  console.log("✓ Appointments created");
}

async function createPatientAppointmentsRelationship() {
  console.log(
    "Creating Patient -> Appointments relationship...",
  );

  try {
    await tablesDB.createRelationshipColumn({
      databaseId: DATABASE_ID,

      // Patient
      tableId: TABLES.PATIENTS,

      // Appointment
      relatedTableId: TABLES.APPOINTMENTS,

      // Patient 1 -> N Appointments
      type: RelationshipType.OneToMany,

      twoWay: true,

      // Patient.appointments
      key: "appointments",

      // Appointment.patient
      twoWayKey: "patient",

      onDelete: RelationMutate.Restrict,
    });

    console.log(
      "✓ Patient/Appointments relationship created",
    );
  } catch (error) {
    if (
      error instanceof AppwriteException &&
      error.code === 409
    ) {
      console.log(
        "✓ Patient/Appointments relationship already exists",
      );

      return;
    }

    throw error;
  }
}

async function main() {
  if (!DATABASE_ID) {
    throw new Error(
      "APPWRITE_DATABASE_ID is not defined",
    );
  }

  console.log("================================");
  console.log(" Appwrite schema setup");
  console.log("================================");
  console.log(`Database: ${DATABASE_ID}`);
  console.log();

  await createPatientsTable();
  await createAppointmentsTable();
  await createPatientAppointmentsRelationship();

  console.log();
  console.log("================================");
  console.log(" Schema ready");
  console.log("================================");

  const tables = await tablesDB.listTables({
    databaseId: DATABASE_ID,
  });

  for (const table of tables.tables) {
    console.log(
      `- ${table.name} (${table.$id})`,
    );
  }
}

main().catch((error) => {
  console.error("Appwrite setup failed:");
  console.error(error);

  process.exit(1);
});
