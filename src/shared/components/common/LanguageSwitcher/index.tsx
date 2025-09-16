'use client';

import {useTranslation} from 'react-i18next';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  setLanguageCookieInBrowser,
  getCurrentLanguage,
  getLanguageOptions,
} from '@/shared/utils/localUtils';

const LanguageSwitcher = () => {
  const {i18n} = useTranslation();
  const currentLocale: string = i18n.language;

  //eslint-disable-next-line local-rules/enforce-single-object-param
  const handleChangeLocale = (selectedValue: string): void => {
    if (!selectedValue) return;

    setLanguageCookieInBrowser({language: selectedValue});

    i18n.changeLanguage(selectedValue).then(() => {
      window.location.reload();
    });
  };

  const languageOptions = getLanguageOptions();
  const currentLanguage = getCurrentLanguage({currentLocale});

  return (
    <Select value={currentLanguage?.value} onValueChange={handleChangeLocale}>
      <SelectTrigger className='w-fit border-none bg-transparent shadow-none hover:bg-transparent focus:ring-0'>
        <SelectValue>
          {currentLanguage && (
            <div className='flex items-center gap-2'>
              <span
                className={`fi fi-${currentLanguage.flag}`}
                style={{width: '24px', borderRadius: '4px'}}
                aria-hidden='true'
              />
              <span>{currentLanguage.label}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className='flex items-center gap-2'>
              <span
                className={`fi fi-${option.flag}`}
                style={{width: '24px', borderRadius: '4px'}}
                aria-hidden='true'
              />
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
