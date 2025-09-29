// import {USERS} from '@/shared/constants/reactQueryConstants';
import DisplayUsers from '@/shared/components/pages/dashboard/users';
import {USERS} from '@/shared/constants/reactQueryConstants';
import ReactPrefetchQueryProvider from '@/shared/providers/ReactPrefetchQueryProvider';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default function UsersPage() {
  return (
    <ReactPrefetchQueryProvider queriesToFetch={[USERS.fetchAllUsersList]}>
      <DisplayUsers />
    </ReactPrefetchQueryProvider>
  );
}

export const metadata = async () => await generateMetadata({pageName: 'users'});
