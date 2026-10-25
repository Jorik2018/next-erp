import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

const PatientFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Invalid phone number"
    ),

  birthDate: z.coerce.date(),

  gender: z.enum([
    "Male",
    "Female",
    "Other",
  ]),

  address: z
    .string()
    .min(5)
    .max(500),

  occupation: z
    .string()
    .min(2)
    .max(500),

  emergencyContactName: z
    .string()
    .min(2)
    .max(50),

  emergencyContactNumber: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Invalid phone number"
    ),

  primaryPhysician: z.string().min(2),

  insuranceProvider: z
    .string()
    .min(2)
    .max(50),

  insurancePolicyNumber: z
    .string()
    .min(2)
    .max(50),

  allergies: z.string(),
  currentMedication: z.string(),
  familyMedicalHistory: z.string(),
  pastMedicalHistory: z.string(),

  identificationType: z.string(),
  identificationNumber: z.string(),

  identificationDocument:
    z.custom<File[]>(),

  treatmentConsent: z.boolean(),
  disclosureConsent: z.boolean(),
  privacyConsent: z.boolean(),
});

export const PatientFormValidation = z.object(Object.fromEntries(
  Object.keys(PatientFormSchema.shape).map(
    (key) => [
      key,
      z.any().optional(),
    ]
  )
));

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
