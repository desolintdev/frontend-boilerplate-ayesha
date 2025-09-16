import {LoaderIcon} from '@/shared/components/icons';
import {Button} from '@/shared/components/ui/button';
import {PrimaryButtonProps} from '@/shared/interfaces/buttons';

export default function PrimaryButton({
  buttonText,
  disabled = false,
  loading = false,
  onClick,
  styles,
}: PrimaryButtonProps) {
  return (
    <Button className={styles} disabled={loading || disabled} onClick={onClick}>
      {!loading ? buttonText : <LoaderIcon className='loader-icon' />}
    </Button>
  );
}
