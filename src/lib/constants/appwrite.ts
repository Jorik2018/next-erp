export const APPWRITE = {
  DATABASE_ID: process.env.APPWRITE_DATABASE_ID!,

  TABLES: {
    PATIENTS: "patients",
    DOCTORS: "doctors",
    APPOINTMENTS: "appointments",
  },

  BUCKETS: {
    PATIENT_DOCUMENTS:
      "patient-documents",
  },
} as const;