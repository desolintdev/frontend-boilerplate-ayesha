import translationUtilsValues from '@/shared/utils/translationsUtils';

export default async function ActionMessage({action}: {action: string}) {
  let message;
  const {t} = await translationUtilsValues();
  if (action === 'reset') {
    message = t('reset.message');
  } else if (action === 'verify') {
    message = t('verify.message');
  } else {
    message = t('general.emailLinkMessage');
  }

  return (
    <div className='max-w-[700px] w-full'>
      <div className='bg-primary text-white px-4 py-6 w-fit rounded-full'>
        {message}
      </div>
    </div>
  );
}
