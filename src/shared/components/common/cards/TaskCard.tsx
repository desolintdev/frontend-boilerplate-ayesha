'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/cards';
import {
  DEFAULT_LABEL_COLOR,
  PRIORITY_COLORS,
  STATUS_COLORS,
  DUE_DATE_COLORS,
} from '@/shared/constants/taskLabelColors';
import {TaskCardProps} from '@/shared/interfaces/common';
import {getDueDateMeta} from '@/shared/utils/dateUtils';

export default function TaskCard({
  task,
  onClick,
  truncateDescription = false,
}: TaskCardProps) {
  const {label: dueLabel, className: dueClass} = getDueDateMeta({
    dueDateString: task.dueDate,
  });

  return (
    <Card
      className={`rounded-xl shadow-sm border hover:shadow-md transition-shadow ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className='text-base font-semibold'>
          {task.title || 'No Title'}
        </CardTitle>
        <CardDescription className='flex gap-2 flex-wrap'>
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${
              PRIORITY_COLORS[task.priority?.toUpperCase()] ||
              DEFAULT_LABEL_COLOR
            }`}
          >
            {task.priority?.toUpperCase() || 'NO PRIORITY'}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${
              STATUS_COLORS[task.status] || DEFAULT_LABEL_COLOR
            }`}
          >
            {task.status || 'UNKNOWN STATUS'}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p
          className={`text-sm text-gray-700 ${
            truncateDescription ? 'line-clamp-3' : ''
          }`}
        >
          {task.description || 'No description provided'}
        </p>
        <p
          className={`mt-3 inline-block px-2 py-0.5 rounded-full text-xs ${
            dueClass || DUE_DATE_COLORS.none
          }`}
        >
          Due: {dueLabel || 'No due date'}
        </p>
      </CardContent>
      <CardFooter className='flex justify-between text-xs text-gray-500'>
        <span>
          Creator: {task.creatorId?.firstName || 'Unknown'}{' '}
          {task.creatorId?.lastName || ''}
        </span>
        <span>
          Assignee: {task.assignedTo?.firstName || 'Unassigned'}{' '}
          {task.assignedTo?.lastName || ''}
        </span>
      </CardFooter>
    </Card>
  );
}
