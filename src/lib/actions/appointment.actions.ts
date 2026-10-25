"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { APPWRITE } from "@/lib/constants/appwrite";
import { getAppwrite } from "@/lib/appwrite/server";
import { formatDateTime, parseStringify } from "@/lib/utils";
import type { Appointment } from "@/types/appwrite.types";

export const createAppointment = async (
  appointment: CreateAppointmentParams,
) => {
  try {
    const { tablesDB, databaseId } = await getAppwrite();

    const newAppointment = await tablesDB.createRow({
      databaseId,

      tableId: APPWRITE.TABLES.APPOINTMENTS,

      rowId: ID.unique(),

      data: appointment,
    });

    revalidatePath("/admin");

    return parseStringify(
      newAppointment,
    );
  } catch (error) {
    console.error(
      "An error occurred while creating a new appointment:",
      error,
    );

    throw error;
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const { tablesDB, databaseId } = await getAppwrite();

    const appointments = await tablesDB.listRows({
      databaseId,

      tableId: APPWRITE.TABLES.APPOINTMENTS,

      queries: [
        Query.orderDesc("schedule"),

        // Trae también el Patient relacionado
        Query.select([
          "*",
          "patient.*",
        ]),
      ],
    });

    const documents = appointments.rows as unknown as Appointment[];

    const scheduledCount = documents.filter(
      (appointment) =>
        appointment.status ===
          "scheduled",
    ).length;

    const pendingCount = documents.filter(
      (appointment) =>
        appointment.status ===
          "pending",
    ).length;

    const cancelledCount = documents.filter(
      (appointment) =>
        appointment.status ===
          "cancelled",
    ).length;

    return parseStringify({
      totalCount: documents.length,

      scheduledCount,
      pendingCount,
      cancelledCount,

      documents,
    });
  } catch (error) {
    console.error(
      "Unable to retrieve appointments:",
      error,
    );

    throw error;
  }
};

export const sendSMSNotification = async (
  userId: string,
  content: string,
) => {
  try {
    const { messaging } = await getAppwrite();
    const message = await messaging.createSMS({
      messageId: ID.unique(),
      content,
      users: [userId],
    });

    return parseStringify(message);
  } catch (error) {
    console.error(
      "An error occurred while sending SMS:",
      error,
    );

    throw error;
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const { tablesDB, databaseId } = await getAppwrite();

    // 1. Actualizar la cita
    const updatedAppointment = await tablesDB.updateRow({
      databaseId,

      tableId: APPWRITE.TABLES.APPOINTMENTS,

      rowId: appointmentId,

      data: appointment,
    });

    // 2. SMS es un efecto secundario.
    // Si falla, NO debe fallar la actualización.
    const schedule = appointment.schedule;

    if (schedule) {
      const formattedDate = formatDateTime(schedule).dateTime;

      const smsMessage = type === "schedule"
        ? `Greetings from CarePulse. Your appointment is confirmed for ${formattedDate} with Dr. ${appointment.primaryPhysician}.`
        : `We regret to inform that your appointment for ${formattedDate} is cancelled. Reason: ${
          appointment.cancellationReason ??
            "Not specified"
        }.`;

      try {
        await sendSMSNotification(
          userId,
          smsMessage,
        );
      } catch (smsError) {
        console.warn(
          "Appointment updated successfully, but SMS notification failed:",
          smsError,
        );
      }
    }

    // 3. Refrescar admin
    revalidatePath("/admin");

    // Podemos refrescar también las citas
    // del paciente actual.
    revalidatePath(
      `/patients/${userId}/appointments`,
    );

    return parseStringify(
      updatedAppointment,
    );
  } catch (error) {
    console.error(
      "An error occurred while updating an appointment:",
      error,
    );

    throw error;
  }
};

export const getAppointment = async (
  appointmentId: string,
) => {
  try {
    const { tablesDB, databaseId } = await getAppwrite();

    const appointment = await tablesDB.getRow({
      databaseId,

      tableId: APPWRITE.TABLES.APPOINTMENTS,

      rowId: appointmentId,
    });

    return parseStringify(
      appointment,
    );
  } catch (error) {
    console.error(
      "An error occurred while retrieving the appointment:",
      error,
    );

    throw error;
  }
};

export const getAppointmentsByUser = async (
  userId: string,
) => {
  try {
    const { tablesDB, databaseId } = await getAppwrite();

    const appointments = await tablesDB.listRows({
      databaseId,

      tableId: APPWRITE.TABLES.APPOINTMENTS,

      queries: [
        Query.equal(
          "userId",
          [userId],
        ),
        Query.orderDesc("schedule"),
      ],
    });

    return parseStringify(
      appointments.rows,
    );
  } catch (error) {
    console.error(
      "Unable to retrieve user appointments:",
      error,
    );

    throw error;
  }
};

export const getAllAppointments = async () => {
  try {
    const { tablesDB, databaseId } = await getAppwrite();

    const appointments = await tablesDB.listRows({
      databaseId,

      tableId: APPWRITE.TABLES.APPOINTMENTS,

      queries: [
        Query.orderDesc(
          "schedule",
        ),
      ],
    });

    return parseStringify(
      appointments.rows,
    );
  } catch (error) {
    console.error(
      "Unable to retrieve appointments:",
      error,
    );

    throw error;
  }
};
