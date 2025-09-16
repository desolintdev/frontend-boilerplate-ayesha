import Container from '@/shared/components/common/container';
import SidebarLayout from '@/shared/components/layout/Sidebar';
import {NodeChildrenProps} from '@/shared/interfaces/common';

const DashboardLayout = ({children}: NodeChildrenProps) => {
  return (
    <SidebarLayout>
      <div className='flex justify-center w-full'>
        <Container>{children}</Container>
      </div>
    </SidebarLayout>
  );
};

export default DashboardLayout;
