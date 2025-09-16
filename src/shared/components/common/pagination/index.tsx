import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import useTranslation from '@/shared/hooks/useTranslation';
import {PaginationComponentProps} from '@/shared/interfaces/hooks';

const Pagination = ({
  handleNextPage,
  handlePreviousPage,
  currentPage,
  totalPages,
}: PaginationComponentProps) => {
  const {t} = useTranslation();

  return (
    <div className='flex items-center gap-3'>
      <PrimaryButton
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        buttonText={t('commonContent.previous')}
      />
      <span className='mx-[10px]'>
        Page {currentPage} of {totalPages || 1}
      </span>
      <PrimaryButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        buttonText={t('commonContent.next')}
      />
    </div>
  );
};

export default Pagination;
