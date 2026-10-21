"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";

import { APPWRITE } from "@/lib/constants/appwrite";
import { getAppwrite } from "@/lib/appwrite/server";
import {
  formatDateTime,
  parseStringify,
} from "@/lib/utils";
import type { Appointment } from "@/types/appwrite.types";

type AppointmentRow = Appointment & {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
};

/* -------------------------------------------------------------------------- */
/*                             Create Appointment                             */
/* -------------------------------------------------------------------------- */

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const { tablesDB } =
      await getAppwrite();

    const newAppointment =
      await tablesDB.createRow({
        databaseId:
          APPWRITE.DATABASE_ID,

        tableId:
          APPWRITE.TABLES.APPOINTMENTS,

        rowId: ID.unique(),

        data: appointment,
      });

    revalidatePath("/admin");

    return parseStringify(
      newAppointment
    );
  } catch (error) {
    console.error(
      "An error occurred while creating a new appointment:",
      error
    );

    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                         Get Recent Appointments                            */
/* -------------------------------------------------------------------------- */

export const getRecentAppointmentList =
  async () => {
    try {
      const { tablesDB } =
        await getAppwrite();

      const appointments =
        await tablesDB.listRows({
          databaseId:
            APPWRITE.DATABASE_ID,

          tableId:
            APPWRITE.TABLES.APPOINTMENTS,

          queries: [
            Query.orderDesc("$createdAt"),
          ],
        });

      /*
       * Appwrite's generic DefaultRow doesn't know
       * the application-specific Appointment schema.
       */
      const rows =
        appointments.rows as unknown as AppointmentRow[];

      const counts = rows.reduce(
        (acc, appointment) => {
          switch (appointment.status) {
            case "scheduled":
              acc.scheduledCount++;
              break;

            case "pending":
              acc.pendingCount++;
              break;

            case "cancelled":
              acc.cancelledCount++;
              break;
          }

          return acc;
        },
        {
          scheduledCount: 0,
          pendingCount: 0,
          cancelledCount: 0,
        }
      );

      return parseStringify({
        totalCount: appointments.total,

        ...counts,

        documents: rows,
      });
    } catch (error) {
      console.error(
        "An error occurred while retrieving recent appointments:",
        error
      );

      throw error;
    }
  };

/* -------------------------------------------------------------------------- */
/*                            SMS Notification                                */
/* -------------------------------------------------------------------------- */

export const sendSMSNotification =
  async (
    userId: string,
    content: string
  ) => {
    try {
      const { messaging } =
        await getAppwrite();

      const message =
        await messaging.createSms(
          ID.unique(),
          content,
          [],
          [userId]
        );

      return parseStringify(message);
    } catch (error) {
      console.error(
        "An error occurred while sending SMS:",
        error
      );

      throw error;
    }
  };

/* -------------------------------------------------------------------------- */
/*                            Update Appointment                              */
/* -------------------------------------------------------------------------- */

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const { tablesDB } =
      await getAppwrite();

    const updatedAppointment =
      await tablesDB.updateRow({
        databaseId:
          APPWRITE.DATABASE_ID,

        tableId:
          APPWRITE.TABLES.APPOINTMENTS,

        rowId: appointmentId,

        data: appointment,
      });

    const schedule =
      appointment.schedule;

    if (schedule) {
      const formattedDate =
        formatDateTime(schedule).dateTime;

      const smsMessage =
        type === "schedule"
          ? `Greetings from CarePulse. Your appointment is confirmed for ${formattedDate} with Dr. ${appointment.primaryPhysician}.`
          : `We regret to inform that your appointment for ${formattedDate} is cancelled. Reason: ${appointment.cancellationReason ?? "Not specified"}.`;

      await sendSMSNotification(
        userId,
        smsMessage
      );
    }

    revalidatePath("/admin");

    return parseStringify(
      updatedAppointment
    );
  } catch (error) {
    console.error(
      "An error occurred while updating an appointment:",
      error
    );

    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                              Get Appointment                               */
/* -------------------------------------------------------------------------- */

export const getAppointment = async (
  appointmentId: string
) => {
  try {
    const { tablesDB } =
      await getAppwrite();

    const appointment =
      await tablesDB.getRow({
        databaseId:
          APPWRITE.DATABASE_ID,

        tableId:
          APPWRITE.TABLES.APPOINTMENTS,

        rowId: appointmentId,
      });

    return parseStringify(
      appointment
    );
  } catch (error) {
    console.error(
      "An error occurred while retrieving the appointment:",
      error
    );

    throw error;
  }
};