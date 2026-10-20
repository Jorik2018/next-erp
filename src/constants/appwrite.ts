export const APPWRITE = {
  DATABASE_ID: "next-erp",

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