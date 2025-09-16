import Container from '@/shared/components/common/container';
import {NodeChildrenProps} from '@/shared/interfaces/common';

const AuthLayout = ({children}: NodeChildrenProps) => {
  return (
    <div className='min-h-screen flex-center w-full'>
      <Container>
        <div className='flex-center'>{children}</div>
      </Container>
    </div>
  );
};

export default AuthLayout;
