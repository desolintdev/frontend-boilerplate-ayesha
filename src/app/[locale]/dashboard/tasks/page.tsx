import TasksContent from '@/shared/components/pages/dashboard/tasks/TasksContent';
import {TASKS} from '@/shared/constants/reactQueryConstants';
import ReactPrefetchQueryProvider from '@/shared/providers/ReactPrefetchQueryProvider';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default function TasksPage() {
  return (
    <ReactPrefetchQueryProvider queriesToFetch={[TASKS.fetchAllTasksList]}>
      <TasksContent />
    </ReactPrefetchQueryProvider>
  );
}

export const metadata = async () => await generateMetadata({pageName: 'tasks'});
