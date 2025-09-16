import {Fragment} from 'react';

import {NuqsAdapter} from 'nuqs/adapters/next/app';
import {ToastContainer, Slide} from 'react-toastify';

import initializeTranslations from '@/i18n';
import {i18nConfig, i18nNamespaces} from '@/i18nConfig';
import AuthGuard from '@/shared/components/layout/guards/authGuard';
import SocketWrapper from '@/shared/components/layout/socketWrapper';
import SuspenseWrapper from '@/shared/components/layout/SuspenseWrapper';
import {RootLayoutProps} from '@/shared/interfaces/common';
import {
  GoogleMapProvider,
  ReduxProvider,
  TranslationsProvider,
  ReactQueryProvider,
} from '@/shared/providers';
import {generateMetadata} from '@/shared/utils/metadataUtils';
import 'react-toastify/dist/ReactToastify.css';
import '/node_modules/flag-icons/css/flag-icons.min.css';

export function generateStaticParams() {
  return i18nConfig.locales.map((locale: string) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: RootLayoutProps) {
  const {locale} = await params;
  const {resources} = await initializeTranslations({locale});

  return (
    <Fragment>
      <ReduxProvider>
        <GoogleMapProvider />
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <ReactQueryProvider>
            <AuthGuard>
              <NuqsAdapter>
                <SuspenseWrapper>
                  <SocketWrapper>{children}</SocketWrapper>
                </SuspenseWrapper>
              </NuqsAdapter>
            </AuthGuard>
          </ReactQueryProvider>
        </TranslationsProvider>
      </ReduxProvider>
      <ToastContainer
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        transition={Slide}
        theme='light'
        icon={false}
      />
    </Fragment>
  );
}

export const metadata = async () => await generateMetadata();
