'use client';

import {usePathname} from 'next/navigation';

import Container from '@/shared/components/common/container';
import BreadCrumbs from '@/shared/components/common/headers/BreadCrumbs';
import LanguageSwitcher from '@/shared/components/common/LanguageSwitcher';
import {SidebarTrigger} from '@/shared/components/ui/sidebar';
import useTranslation from '@/shared/hooks/useTranslation';
import {SidebarRoute} from '@/shared/interfaces/utils';
import {SIDEBAR_ROUTES_LIST} from '@/shared/utils/PATHS';

const DashboardHeader = () => {
  const pathname = usePathname();
  const {ct} = useTranslation();

  const label = ct({constant: SIDEBAR_ROUTES_LIST}).find(
    (item: SidebarRoute) => item.path === pathname
  )?.label;

  return (
    <div className='flex-center w-full sticky top-0'>
      <Container>
        <div className='h-[75px] flex-between w-full px-4 bg-gray-100 shadow-md rounded-[8px] my-3'>
          <div className='flex-start gap-4'>
            <SidebarTrigger />
            <div className='flex flex-col'>
              <BreadCrumbs label={label} />
              <p className='font-bold'>{label}</p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </Container>
    </div>
  );
};

export default DashboardHeader;
