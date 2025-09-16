import {DateTime} from 'luxon';

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

// Export the functions
export {
  getCurrentDateTime,
  formatDate,
  isValidDate,
  getFullYear,
  getFutureDate,
};
