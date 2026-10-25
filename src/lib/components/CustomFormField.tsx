"use client";

import Image from "next/image";
import PhoneInput from "react-phone-number-input";

import type { E164Number } from "libphonenumber-js/core";
import type {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import { Checkbox } from "@/lib/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import { Input } from "@/lib/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { Textarea } from "@/lib/components/ui/textarea";
import { withBasePath } from "../base-path";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface CustomProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;

  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;

  renderSkeleton?: (
    field: ControllerRenderProps<
      TFieldValues,
      TName
    >
  ) => React.ReactNode;

  fieldType: FormFieldType;
}

interface RenderInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  field: ControllerRenderProps<
    TFieldValues,
    TName
  >;

  props: CustomProps<
    TFieldValues,
    TName
  >;
}
const RenderInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  field,
  props,
}: RenderInputProps<TFieldValues, TName>) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt ?? "icon"}
              className="ml-2"
            />
          )}

          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              value={field.value ?? ""}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            value={field.value ?? ""}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={
              field.value as
              | E164Number
              | undefined
            }
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
            />

            <label
              htmlFor={props.name}
              className="checkbox-label"
            >
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src={withBasePath("/assets/icons/calendar.svg")}
            height={24}
            width={24}
            alt="Calendar"
            className="ml-2"
          />

          <FormControl>
            <Input
              type={
                props.showTimeSelect
                  ? "datetime-local"
                  : "date"
              }
              value={
                field.value
                  ? new Date(field.value)
                    .toISOString()
                    .slice(
                      0,
                      props.showTimeSelect
                        ? 16
                        : 10
                    )
                  : ""
              }
              onChange={(event) =>
                field.onChange(
                  event.target.value
                    ? new Date(
                      event.target.value
                    )
                    : undefined
                )
              }
              className="shad-input border-0"
              disabled={props.disabled}
            />
          </FormControl>
        </div>
      );

      case FormFieldType.SELECT:
  return (
    <Select
      onValueChange={field.onChange}
      value={
        typeof field.value === "string"
          ? field.value
          : ""
      }
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue
            placeholder={props.placeholder}
          />
        </SelectTrigger>
      </FormControl>

      <SelectContent>
        {props.children}
      </SelectContent>
    </Select>
  );
    case FormFieldType.SKELETON:
      return props.renderSkeleton
        ? props.renderSkeleton(field)
        : null;

    default:
      return null;
  }
};
const CustomFormField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: CustomProps<TFieldValues, TName>
) => {
  const {
    control,
    name,
    label,
    fieldType,
  } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX &&
            label && (
              <FormLabel className="shad-input-label">
                {label}
              </FormLabel>
            )}

          <RenderInput
            field={field}
            props={props}
          />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;