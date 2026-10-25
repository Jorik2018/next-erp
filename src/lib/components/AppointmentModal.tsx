"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/dialog";
import { Appointment } from "@/types/appwrite.types";

import { AppointmentForm } from "./forms/AppointmentForm";
import { Button } from "../ui/button";

interface AppointmentModalProps {
  patient: string;
  userId: string;
  appointment?: Appointment;
  type: "schedule" | "cancel";
  title: string;
  description: string;
}

export const AppointmentModal = ({
  patient,
  userId,
  appointment,
  type,
  title,
  description,
}: AppointmentModalProps) => {
  const [open, setOpen] =
    useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className={
            type === "schedule"
              ? "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
              : "text-red-600 hover:bg-red-50 hover:text-red-700"
          }
        >
          {type === "schedule"
            ? "Schedule"
            : "Cancel"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>

          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5">
          <AppointmentForm
            userId={userId}
            patient={patient}
            type={type}
            appointment={appointment}
            setOpen={setOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};