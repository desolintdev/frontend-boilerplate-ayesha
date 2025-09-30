'use client';

import {useState} from 'react';

import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import TaskCard from '@/shared/components/common/cards/TaskCard';
import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';
import SortSelects from '@/shared/components/common/SortSelects';
import {Input} from '@/shared/components/ui/input';
import {LIST_TYPES} from '@/shared/constants/general';
import useClientSideFilteredLists from '@/shared/hooks/listFilters/useClientSideFilteredLists';
import useTranslation from '@/shared/hooks/useTranslation';
import {Task} from '@/shared/interfaces/tasks';
import {taskQueries} from '@/shared/reactQuery';
import {OnChangeEvent} from '@/shared/types/common';

import TaskDetailsModal from './TaskDetailsModal';

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

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = ({id}: {id: string}) => {
    setSelectedTaskId(id);
    setIsModalOpen(true);
  };

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
          return (
            <TaskCard
              key={task._id}
              task={task}
              onClick={() => handleCardClick({id: task._id})}
              truncateDescription // list view should truncate
            />
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
      {isModalOpen && selectedTaskId && (
        <TaskDetailsModal
          taskId={selectedTaskId}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}

      {renderContent()}
      <div className='mt-8'>{PaginationComponent}</div>
    </div>
  );
}
