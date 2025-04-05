'use client';

import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { cn } from '@/lib/utils';

export interface CalendarProps {
  className?: string;
  mode?: 'single' | 'multiple' | 'range';
  selected?: Date | Date[] | { from: Date; to?: Date };
  onSelect?: (date: Date | undefined) => void;
}

export function Calendar({
  className,
  mode = 'single',
  selected,
  onSelect,
}: CalendarProps) {
  return (
    <DayPicker
      mode={mode}
      selected={selected}
      onSelect={onSelect}
      className={cn('rounded-md border bg-white p-3 shadow', className)}
    />
  );
}
