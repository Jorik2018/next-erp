// src/lib/constants/appwrite.ts

export const APPWRITE = {

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