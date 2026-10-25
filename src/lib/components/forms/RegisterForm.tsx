// src/components/forms/RegisterFormtsx

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { registerPatient } from "@/lib/actions/patient.actions";
import { Form, FormControl } from "@/lib/components/ui/form";
import { Label } from "@/lib/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/lib/components/ui/radio-group";
import { SelectItem } from "@/lib/components/ui/select";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/lib/constants";
import { PatientFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";

import CustomFormField, {
  FormFieldType,
} from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";

type PatientFormInput =
  z.input<typeof PatientFormValidation>;

type PatientFormOutput =
  z.output<typeof PatientFormValidation>;

interface RegisterFormProps {
  user: User;
}

const SectionHeader = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => (
  <div className="flex items-start gap-4 border-b border-slate-100 pb-5">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-700">
      {number}
    </span>

    <div>
      <h2 className="text-lg font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-1 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  </div>
);

const RegisterForm = ({
  user,
}: RegisterFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] =
    useState(false);

  const form = useForm<
    PatientFormInput,
    unknown,
    PatientFormOutput
  >({
    resolver: zodResolver(
      PatientFormValidation
    ),

    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = async (
    values: PatientFormOutput
  ) => {
    setIsLoading(true);

    try {
      let formData: FormData | undefined;

      const identificationFile =
        values.identificationDocument?.[0];

      if (identificationFile) {
        formData = new FormData();

        formData.append(
          "blobFile",
          identificationFile
        );

        formData.append(
          "fileName",
          identificationFile.name
        );
      }

      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,

        birthDate: values.birthDate?new Date(
          values.birthDate
        ):undefined,

        gender: values.gender,
        address: values.address,
        occupation: values.occupation,

        emergencyContactName:
          values.emergencyContactName,

        emergencyContactNumber:
          values.emergencyContactNumber,

        primaryPhysician:
          values.primaryPhysician,

        insuranceProvider:
          values.insuranceProvider,

        insurancePolicyNumber:
          values.insurancePolicyNumber,

        allergies: values.allergies,

        currentMedication:
          values.currentMedication,

        familyMedicalHistory:
          values.familyMedicalHistory,

        pastMedicalHistory:
          values.pastMedicalHistory,

        identificationType:
          values.identificationType,

        identificationNumber:
          values.identificationNumber,

        identificationDocument:
          formData,

        privacyConsent:
          values.privacyConsent,
      };

      const newPatient =
        await registerPatient(patient);

      if (newPatient) {
        router.push(
          `/patients/${user.$id}/new-appointment`
        );
      }
    } catch (error) {
      console.error(
        "Unable to register patient:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-8"
      >
        {/* INTRODUCTION */}
        <header className="pb-2">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              New patient
            </span>

            <span className="text-sm text-slate-500">
              Registration
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Complete your patient profile
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            We need a few details before you can
            book your first appointment. This
            information helps us manage your care
            and contact you when necessary.
          </p>

          {/* PROGRESS */}
          <div className="mt-8 grid grid-cols-4 gap-2">
            {[
              "Personal",
              "Medical",
              "Identity",
              "Consent",
            ].map((step, index) => (
              <div key={step}>
                <div className="h-1.5 rounded-full bg-emerald-500" />

                <p className="mt-2 hidden text-xs font-medium text-slate-600 sm:block">
                  {index + 1}. {step}
                </p>
              </div>
            ))}
          </div>
        </header>

        {/* PERSONAL */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <SectionHeader
            number="01"
            title="Personal information"
            description="Tell us how we can identify and contact you."
          />

          <div className="mt-8 space-y-6">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Full name"
              placeholder="John Doe"
            />

            <div className="grid gap-6 md:grid-cols-2">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email address"
                placeholder="john@example.com"
              />

              <CustomFormField
                fieldType={
                  FormFieldType.PHONE_INPUT
                }
                control={form.control}
                name="phone"
                label="Phone number"
                placeholder="+1 555 123 4567"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <CustomFormField
                fieldType={
                  FormFieldType.DATE_PICKER
                }
                control={form.control}
                name="birthDate"
                label="Date of birth"
              />

              <CustomFormField
                fieldType={
                  FormFieldType.SKELETON
                }
                control={form.control}
                name="gender"
                label="Gender"
                renderSkeleton={(field) => (
                  <FormControl>
                    <RadioGroup
                      className="flex min-h-11 flex-wrap items-center gap-5"
                      onValueChange={
                        field.onChange
                      }
                      value={
                        typeof field.value ===
                          "string"
                          ? field.value
                          : undefined
                      }
                    >
                      {GenderOptions.map(
                        (option) => (
                          <div
                            key={option}
                            className="flex items-center gap-2"
                          >
                            <RadioGroupItem
                              value={option}
                              id={option}
                            />

                            <Label
                              htmlFor={option}
                              className="cursor-pointer text-slate-700"
                            >
                              {option}
                            </Label>
                          </div>
                        )
                      )}
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <CustomFormField
                fieldType={
                  FormFieldType.INPUT
                }
                control={form.control}
                name="address"
                label="Address"
                placeholder="Street, city, state"
              />

              <CustomFormField
                fieldType={
                  FormFieldType.INPUT
                }
                control={form.control}
                name="occupation"
                label="Occupation"
                placeholder="Software Engineer"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <CustomFormField
                fieldType={
                  FormFieldType.INPUT
                }
                control={form.control}
                name="emergencyContactName"
                label="Emergency contact"
                placeholder="Contact name"
              />

              <CustomFormField
                fieldType={
                  FormFieldType.PHONE_INPUT
                }
                control={form.control}
                name="emergencyContactNumber"
                label="Emergency phone"
                placeholder="+1 555 123 4567"
              />
            </div>
          </div>
        </section>

        {/* MEDICAL */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <SectionHeader
            number="02"
            title="Medical information"
            description="Information that helps your healthcare provider prepare for your appointment."
          />

          <div className="mt-8 space-y-6">
            <CustomFormField
              fieldType={
                FormFieldType.SELECT
              }
              control={form.control}
              name="primaryPhysician"
              label="Primary care physician"
              placeholder="Select a physician"
            >
              {Doctors.map((doctor) => (
                <SelectItem
                  key={doctor.name}
                  value={doctor.name}
                >
                  {doctor.name}
                </SelectItem>
              ))}
            </CustomFormField>

            <div className="grid gap-6 md:grid-cols-2">
              <CustomFormField
                fieldType={
                  FormFieldType.INPUT
                }
                control={form.control}
                name="insuranceProvider"
                label="Insurance provider"
                placeholder="Insurance company"
              />

              <CustomFormField
                fieldType={
                  FormFieldType.INPUT
                }
                control={form.control}
                name="insurancePolicyNumber"
                label="Policy number"
                placeholder="ABC123456789"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <CustomFormField
                fieldType={
                  FormFieldType.TEXTAREA
                }
                control={form.control}
                name="allergies"
                label="Allergies"
                placeholder="List allergies, if any"
              />

              <CustomFormField
                fieldType={
                  FormFieldType.TEXTAREA
                }
                control={form.control}
                name="currentMedication"
                label="Current medications"
                placeholder="List current medications"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <CustomFormField
                fieldType={
                  FormFieldType.TEXTAREA
                }
                control={form.control}
                name="familyMedicalHistory"
                label="Family medical history"
                placeholder="Relevant family medical history"
              />

              <CustomFormField
                fieldType={
                  FormFieldType.TEXTAREA
                }
                control={form.control}
                name="pastMedicalHistory"
                label="Past medical history"
                placeholder="Previous conditions or procedures"
              />
            </div>
          </div>
        </section>

        {/* IDENTIFICATION */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <SectionHeader
            number="03"
            title="Identity verification"
            description="Provide identification so your patient record can be verified."
          />

          <div className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <CustomFormField
                fieldType={
                  FormFieldType.SELECT
                }
                control={form.control}
                name="identificationType"
                label="Identification type"
                placeholder="Select identification type"
              >
                {IdentificationTypes.map(
                  (type) => (
                    <SelectItem
                      key={type}
                      value={type}
                    >
                      {type}
                    </SelectItem>
                  )
                )}
              </CustomFormField>

              <CustomFormField
                fieldType={
                  FormFieldType.INPUT
                }
                control={form.control}
                name="identificationNumber"
                label="Identification number"
                placeholder="123456789"
              />
            </div>

            <CustomFormField
              fieldType={
                FormFieldType.SKELETON
              }
              control={form.control}
              name="identificationDocument"
              label="Identification document"
              renderSkeleton={(field) => (
                <FormControl>
                  <FileUploader
                    files={field.value}
                    onChange={
                      field.onChange
                    }
                  />
                </FormControl>
              )}
            />
          </div>
        </section>

        {/* CONSENT */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <SectionHeader
            number="04"
            title="Consent and privacy"
            description="Please review and confirm the statements below before completing registration."
          />

          <div className="mt-8 space-y-5">
            <CustomFormField
              fieldType={
                FormFieldType.CHECKBOX
              }
              control={form.control}
              name="treatmentConsent"
              label="I consent to receive treatment for my health condition."
            />

            <CustomFormField
              fieldType={
                FormFieldType.CHECKBOX
              }
              control={form.control}
              name="disclosureConsent"
              label="I consent to the use and disclosure of my health information for treatment purposes."
            />

            <CustomFormField
              fieldType={
                FormFieldType.CHECKBOX
              }
              control={form.control}
              name="privacyConsent"
              label="I acknowledge that I have reviewed and agree to the privacy policy."
            />
          </div>
        </section>

        {/* SUBMIT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-slate-900">
                Ready to continue?
              </p>

              <p className="mt-1 text-sm text-slate-500">
                You can schedule your first
                appointment after registration.
              </p>
            </div>

            <div className="w-full md:w-64">
              <SubmitButton
                isLoading={isLoading}
              >
                Complete registration
              </SubmitButton>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;