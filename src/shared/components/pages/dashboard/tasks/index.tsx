'use client';

import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';
import SortSelects from '@/shared/components/common/SortSelects';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/cards';
import {Input} from '@/shared/components/ui/input';
import {LIST_TYPES} from '@/shared/constants/general';
import {
  DEFAULT_LABEL_COLOR,
  PRIORITY_COLORS,
  STATUS_COLORS,
} from '@/shared/constants/taskLabelColors';
import useClientSideFilteredLists from '@/shared/hooks/listFilters/useClientSideFilteredLists';
import useTranslation from '@/shared/hooks/useTranslation';
import {Task} from '@/shared/interfaces/tasks';
import {taskQueries} from '@/shared/reactQuery';
import {OnChangeEvent} from '@/shared/types/common';

export default function TasksContent() {
  const {t} = useTranslation();

  const {useFetchAllTasksList} = taskQueries();
  const {data, isLoading} = useFetchAllTasksList() || {};

  const tasks = data?.tasks || [];

  const {filteredData, PaginationComponent, filters, setFilters, resetFilters} =
    useClientSideFilteredLists({
      list: tasks || [],
      listType: LIST_TYPES.tasks, // you’ll need to define this in LIST_TYPES
    });

  const renderContent = () => {
    if (isLoading) {
      return <GlobalLoader />;
    }

    if (!filteredData?.length) {
      return <p className='text-center py-6 text-gray-400'>No tasks found</p>;
    }

    return (
      <div className='grid gap-4 '>
        {filteredData.map((task: Task) => {
          const dueDate = task.dueDate ? new Date(task.dueDate) : null;
          const today = new Date();

          let dueLabel = 'No due date';
          let dueClass = 'bg-gray-200 text-gray-600';

          if (dueDate) {
            const diff = Math.ceil(
              (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
            );
            if (diff < 0) {
              dueLabel = `${dueDate.toLocaleDateString()} • ${Math.abs(diff)} days overdue`;
              dueClass = 'bg-red-100 text-red-700 border border-red-300';
            } else {
              dueLabel = `${dueDate.toLocaleDateString()} • ${diff} days left`;
              dueClass = 'bg-green-100 text-green-700 border border-green-300';
            }
          }

          return (
            <Card
              key={task._id}
              className='rounded-xl shadow-sm border hover:shadow-md transition-shadow'
            >
              <CardHeader>
                <CardTitle className='text-base font-semibold'>
                  {task.title}
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
                    {task.status}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-gray-700 line-clamp-3'>
                  {task.description}
                </p>
                <p
                  className={`mt-3 inline-block px-2 py-0.5 rounded-full text-xs ${dueClass}`}
                >
                  Due: {dueLabel}
                </p>
              </CardContent>
              <CardFooter className='flex justify-between text-xs text-gray-500'>
                <span>
                  Creator: {task.creatorId?.firstName}{' '}
                  {task.creatorId?.lastName}
                </span>
                <span>
                  Assignee: {task.assignedTo?.firstName}{' '}
                  {task.assignedTo?.lastName}
                </span>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className='p-8 max-w-[800px] mx-auto'>
      <div className='mb-6 flex gap-4 flex-wrap items-center'>
        <Input
          placeholder='Search tasks...'
          value={filters.search}
          onChange={(e: OnChangeEvent) => setFilters({search: e.target.value})}
        />
        <SortSelects
          sortValue={filters.sortOptions}
          sortConfig={LIST_TYPES.tasks.sort}
          setSortField={(item) => setFilters({sort: {sortBy: item}})}
          setDirection={(item) => setFilters({sort: {sortDir: item}})}
        />
        <PrimaryButton
          onClick={resetFilters}
          buttonText={t('commonContent.reset')}
        />
      </div>

      {renderContent()}
      <div className='mt-8'>{PaginationComponent}</div>
    </div>
  );
}
