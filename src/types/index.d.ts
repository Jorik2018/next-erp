/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female" | "Other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name?: string;
  email?: string;
  phone?: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  birthDate?: Date;
  gender?: Gender;
  address?: string;
  occupation?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  primaryPhysician?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  allergies?: string | undefined;
  currentMedication?: string | undefined;
  familyMedicalHistory?: string | undefined;
  pastMedicalHistory?: string | undefined;
  identificationType?: string | undefined;
  identificationNumber?: string | undefined;
  identificationDocument?: FormData | undefined;
  privacyConsent?: boolean;
}

declare type CreateAppointmentParams = {
  userId: string;

  // Appwrite relationship -> Patients
  patient: string;

  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;

  note?: string;
};
declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};

interface ClassroomMember {
  _id: string
  fname: string
  profilePicture?: string
}

interface PostComment {
  message: string;
  creator: CommentCreator;
  subComments: SubComment[];
}

interface CommentCreator {
  _id: string;
  fname: string;
  profilePicture?: string | null;
}

interface SubComment {
  message: string;
  creator: CommentCreator;
}
