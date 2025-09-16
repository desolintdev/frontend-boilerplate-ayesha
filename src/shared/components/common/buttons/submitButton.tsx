import {LoaderIcon} from '@/shared/components/icons';
import {Button} from '@/shared/components/ui/button';
import {SubmitButtonProps} from '@/shared/interfaces/buttons';

export default function SubmitButton({
  buttonText,
  loading = false,
}: SubmitButtonProps) {
  return (
    <Button type='submit' disabled={loading}>
      {!loading ? buttonText : <LoaderIcon className='loader-icon' />}
    </Button>
  );
}
