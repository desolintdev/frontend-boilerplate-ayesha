import {AuthFormContainerProps} from '@/shared/interfaces/common';

const AuthFormContainer = ({
  children,
  handleSubmit,
  heading,
  formStyles = '',
}: AuthFormContainerProps) => {
  return (
    <div className='max-w-[700px] w-full'>
      <form
        className={`flex flex-col gap-[15px] ${formStyles}`}
        onSubmit={handleSubmit}
      >
        <h1 className='text-[36px] font-bold'>{heading}</h1>
        {children}
      </form>
    </div>
  );
};

export default AuthFormContainer;
