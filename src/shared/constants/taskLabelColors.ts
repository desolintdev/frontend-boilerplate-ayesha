// /shared/constants/taskLabelColors.ts

export const PRIORITY_COLORS: Record<string, string> = {
  HIGH: 'bg-red-100 text-red-700 border border-red-300',
  MEDIUM: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
  LOW: 'bg-blue-100 text-blue-700 border border-blue-300',
};

export const STATUS_COLORS: Record<string, string> = {
  todo: 'bg-gray-100 text-gray-700 border border-gray-300',
  'in-progress': 'bg-blue-100 text-blue-700 border border-blue-300',
  done: 'bg-green-100 text-green-700 border border-green-300',
};

export const DUE_DATE_COLORS = {
  none: 'bg-gray-200 text-gray-600',
  overdue: 'bg-red-100 text-red-700 border border-red-300',
  upcoming: 'bg-green-100 text-green-700 border border-green-300',
};

// Optional: common fallback for undefined cases
export const DEFAULT_LABEL_COLOR =
  'bg-gray-100 text-gray-700 border border-gray-300';
