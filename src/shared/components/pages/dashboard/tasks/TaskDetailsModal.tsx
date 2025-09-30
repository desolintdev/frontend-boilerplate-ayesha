'use client';

import {useMemo} from 'react';

import TaskCard from '@/shared/components/common/cards/TaskCard';
import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';
import {GeneralModal} from '@/shared/components/common/modals';
import {TaskDetailsModalProps} from '@/shared/interfaces/common';
import {taskQueries} from '@/shared/reactQuery';

export default function TaskDetailsModal({
  taskId,
  isOpen,
  setIsOpen,
}: TaskDetailsModalProps) {
  const {useFetchTaskById} = taskQueries();
  const {data, isLoading} = useFetchTaskById({id: taskId});

  const task = data?.tasks;

  const content = useMemo(() => {
    if (isLoading) return [<GlobalLoader key='loader' />];

    if (!task) return [<p key='no-data'>No task details available</p>];

    return [<TaskCard key='task-card' task={task} />];
  }, [isLoading, task]);

  return (
    <GeneralModal
      title='Task Details'
      content={content}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      buttons={[]} // no footer buttons for now
      width='max-w-5xl w-full'
    />
  );
}
