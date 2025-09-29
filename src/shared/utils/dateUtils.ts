import {DateTime} from 'luxon';

import {DUE_DATE_COLORS} from '@/shared/constants/taskLabelColors';

// Function to get the current date and time
function getCurrentDateTime(): string {
  return DateTime.now().toISO();
}

// Function to format a date to a specific format
function formatDate({
  date,
  format = 'yyyy-MM-dd',
}: {
  date: string;
  format?: string;
}): string {
  return DateTime.fromISO(date).toFormat(format);
}
function isValidDate({date}: {date: string}): boolean {
  return DateTime.fromISO(date).isValid;
}

function getFullYear(): number {
  return DateTime.now().year;
}

const getFutureDate = ({days = 30, format = 'utcString'}): Date | string => {
  const futureDate = DateTime.now().plus({days});

  switch (format) {
    case 'jsDate':
      return futureDate.toJSDate();
    case 'iso':
      return futureDate.toISO()!;
    case 'utcString':
    default:
      return futureDate.toUTC().toHTTP();
  }
};

// calculateDueDate.ts
function calculateDueDate({dueDateString}: {dueDateString?: string}): {
  diff: number | null;
  isOverdue: boolean;
  isDueToday: boolean;
  formattedDate: string | null;
} {
  if (!dueDateString) {
    return {
      diff: null,
      isOverdue: false,
      isDueToday: false,
      formattedDate: null,
    };
  }

  const dueDate = DateTime.fromISO(dueDateString);
  if (!dueDate.isValid) {
    return {
      diff: null,
      isOverdue: false,
      isDueToday: false,
      formattedDate: null,
    };
  }

  const today = DateTime.now().startOf('day');
  const diff = dueDate.startOf('day').diff(today, 'days').days;
  const roundedDiff = Math.floor(diff);

  return {
    diff: roundedDiff,
    isOverdue: roundedDiff < 0,
    isDueToday: roundedDiff === 0,
    formattedDate: dueDate.toLocaleString(),
  };
}

function getDueDateMeta({dueDateString}: {dueDateString?: string}): {
  label: string;
  className: string;
} {
  const {diff, isOverdue, isDueToday, formattedDate} = calculateDueDate({
    dueDateString,
  });

  if (diff === null || !formattedDate) {
    return {label: 'No due date', className: DUE_DATE_COLORS.none};
  }

  if (isOverdue) {
    return {
      label: `${formattedDate} • ${Math.abs(diff)} days overdue`,
      className: DUE_DATE_COLORS.overdue,
    };
  }

  if (isDueToday) {
    return {
      label: `${formattedDate} • Due today`,
      className: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
    };
  }

  return {
    label: `${formattedDate} • ${diff} days left`,
    className: DUE_DATE_COLORS.upcoming,
  };
}

// Export the functions
export {
  getCurrentDateTime,
  formatDate,
  isValidDate,
  getFullYear,
  getFutureDate,
  getDueDateMeta,
};
