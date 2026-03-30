"use client";

import { type ComponentPropsWithRef } from "react";
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerTriggerIndicator,
  DatePickerPopover,
  Calendar,
  CalendarHeader,
  CalendarHeading,
  CalendarNavButton,
  CalendarGrid,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarGridBody,
  CalendarCell,
} from "@heroui/react";
import { DateField, Label } from "react-aria-components";

export interface AppDatePickerProps
  extends ComponentPropsWithRef<typeof DatePicker> {
  label?: string;
  error?: string;
}

export function AppDatePicker({ label, error, ...props }: AppDatePickerProps) {
  return (
    <DatePicker isInvalid={!!error} {...props}>
      {label && (
        <Label className="text-sm font-medium text-default-700">{label}</Label>
      )}
      <DatePickerTrigger>
        <DateField />
        <DatePickerTriggerIndicator />
      </DatePickerTrigger>
      <DatePickerPopover>
        <Calendar>
          <CalendarHeader>
            <CalendarNavButton slot="previous" />
            <CalendarHeading />
            <CalendarNavButton slot="next" />
          </CalendarHeader>
          <CalendarGrid>
            <CalendarGridHeader>
              {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
            </CalendarGridHeader>
            <CalendarGridBody>
              {(date) => <CalendarCell date={date} />}
            </CalendarGridBody>
          </CalendarGrid>
        </Calendar>
      </DatePickerPopover>
      {error && <p className="text-xs text-danger mt-1">{error}</p>}
    </DatePicker>
  );
}
