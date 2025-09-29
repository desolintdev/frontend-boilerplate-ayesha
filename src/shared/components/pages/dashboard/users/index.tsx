'use client';

import {useSelector} from 'react-redux';

import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';
import SortSelects from '@/shared/components/common/SortSelects';
import {Input} from '@/shared/components/ui/input';
import {LIST_TYPES} from '@/shared/constants/general';
import useClientSideFilteredLists from '@/shared/hooks/listFilters/useClientSideFilteredLists';
import useTranslation from '@/shared/hooks/useTranslation';
import {userQueries} from '@/shared/reactQuery';
import {getUsersList} from '@/shared/redux/slices/users';
import {OnChangeEvent} from '@/shared/types/common';
import {User} from '@/shared/types/redux';

export default function DisplayUsers() {
  const {t} = useTranslation();

  const {useFetchAllUsersList} = userQueries();

  const {data, isLoading} = useFetchAllUsersList() || {};
  const Users = data?.Users || [];

  // use this list if fetch ALL user API is not working
  const list = Users;

  const {
    filteredData,
    PaginationComponent,
    filters,
    setFilters,
    resetFilters, //function to reset filters to initial state
  } = useClientSideFilteredLists({
    list: list || [], // array of data
    listType: LIST_TYPES.users,
  });

  // Not passing filter will keep the existing values, and will not reset them
  // Example usage:
  // setFilters({
  //   search: "john",
  //   sort: {
  //     sortBy: "email",
  //     sortDir: "desc"
  //   },
  //   page: {
  //     number: 2,
  //     limit: 10
  //   }
  // });

  // // You can also update individual sections:
  // setFilters({ search: "john" });
  // setFilters({ sort: { field: "email" } }); // Only updates the sort field
  // setFilters({ page: { limit: 20 } }); // Only updates the page limit

  const renderContent = () => {
    if (isLoading) {
      return <GlobalLoader />;
    }

    if (!filteredData?.length) {
      return <p className='text-center py-6 text-gray-400'>No users found</p>;
    }

    return (
      <ul className='list-none'>
        {filteredData?.map((user: User) => (
          <li
            key={user._id}
            className='p-4 border-b-[1px] border-b-[#e2e8f0] flex justify-between'
          >
            <strong className='text-[#1e293b]'>
              {user.name || `${user.firstName} ${user.lastName}`}
            </strong>
            <span className='text-[#64748b]'>{user.email}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='p-8 max-w-[800px] mx-auto'>
      <div className='mb-6 flex gap-4 flex-wrap items-center'>
        <Input
          placeholder='Search users...'
          value={filters.search}
          onChange={(e: OnChangeEvent) => setFilters({search: e.target.value})}
        />
        <SortSelects
          sortValue={filters.sortOptions}
          sortConfig={LIST_TYPES.users.sort}
          setSortField={(item) => setFilters({sort: {sortBy: item}})}
          setDirection={(item) => setFilters({sort: {sortDir: item}})}
        />
        <PrimaryButton
          onClick={resetFilters}
          buttonText={t('commonContent.reset')}
        />
      </div>

      {renderContent()}
      {PaginationComponent}
    </div>
  );
}
