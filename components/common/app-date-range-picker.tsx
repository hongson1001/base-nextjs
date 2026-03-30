"use client";

import { type ComponentPropsWithRef } from "react";
import {
  DateRangePicker,
  DateRangePickerTrigger,
  DateRangePickerTriggerIndicator,
  DateRangePickerRangeSeparator,
  DateRangePickerPopover,
  RangeCalendar,
  RangeCalendarHeader,
  RangeCalendarHeading,
  RangeCalendarNavButton,
  RangeCalendarGrid,
  RangeCalendarGridHeader,
  RangeCalendarHeaderCell,
  RangeCalendarGridBody,
  RangeCalendarCell,
} from "@heroui/react";
import { DateField, Label } from "react-aria-components";

export interface AppDateRangePickerProps
  extends ComponentPropsWithRef<typeof DateRangePicker> {
  label?: string;
  error?: string;
}

export function AppDateRangePicker({
  label,
  error,
  ...props
}: AppDateRangePickerProps) {
  return (
    <DateRangePicker isInvalid={!!error} {...props}>
      {label && (
        <Label className="text-sm font-medium text-default-700">{label}</Label>
      )}
      <DateRangePickerTrigger>
        <DateField slot="start" />
        <DateRangePickerRangeSeparator />
        <DateField slot="end" />
        <DateRangePickerTriggerIndicator />
      </DateRangePickerTrigger>
      <DateRangePickerPopover>
        <RangeCalendar>
          <RangeCalendarHeader>
            <RangeCalendarNavButton slot="previous" />
            <RangeCalendarHeading />
            <RangeCalendarNavButton slot="next" />
          </RangeCalendarHeader>
          <RangeCalendarGrid>
            <RangeCalendarGridHeader>
              {(day) => (
                <RangeCalendarHeaderCell>{day}</RangeCalendarHeaderCell>
              )}
            </RangeCalendarGridHeader>
            <RangeCalendarGridBody>
              {(date) => <RangeCalendarCell date={date} />}
            </RangeCalendarGridBody>
          </RangeCalendarGrid>
        </RangeCalendar>
      </DateRangePickerPopover>
      {error && <p className="text-xs text-danger mt-1">{error}</p>}
    </DateRangePicker>
  );
}
