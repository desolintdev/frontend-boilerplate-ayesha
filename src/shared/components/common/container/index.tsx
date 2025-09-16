import {NodeChildrenProps} from '@/shared/interfaces/common';

export default function Container({children}: NodeChildrenProps) {
  return <div className='w-full max-w-[1440px] px-5 md:px-10'>{children}</div>;
}
