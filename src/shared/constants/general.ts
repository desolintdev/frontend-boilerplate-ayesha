import {DASHBOARD_ROUTES} from '@/shared/utils/PATHS';
import translationUtilsValues from '@/shared/utils/translationsUtils';

import {FILTERS_CONFIG} from './reactQueryConstants';

export const BRANDING = async () => {
  const {t} = await translationUtilsValues();

  return {
    websiteName: t('mainPageTitle.appName'),
    websiteDescription: t('mainPageTitle.description'),
    logoPath: '/images/logo.svg',
    faviconPath: '/images/favicon.jpg',
  };
};

export const LIST_TYPES = {
  users: {
    value: 'users',
    search: {
      keys: ['name', 'email'],
    },
    sort: {
      options: {
        firstName: {
          label: 'First Name',
          value: 'firstName',
        },
        email: {
          label: 'Email',
          value: 'email',
        },
      },
      directions: {
        asc: 'asc',
        desc: 'desc',
      },
    },
    page: {
      number: FILTERS_CONFIG.number,
      limit: FILTERS_CONFIG.limit,
    },
    path: DASHBOARD_ROUTES.users.all,
  },

  tasks: {
    value: 'tasks',
    search: {
      keys: ['title', 'description', 'status', 'priority'],
    },
    sort: {
      options: {
        title: {
          label: 'Title',
          value: 'title',
        },
        status: {
          label: 'Status',
          value: 'status',
        },
        priority: {
          label: 'Priority',
          value: 'priority',
        },
        dueDate: {
          label: 'Due Date',
          value: 'dueDate',
        },
      },
      directions: {
        asc: 'asc',
        desc: 'desc',
      },
    },
    page: {
      number: FILTERS_CONFIG.number,
      limit: FILTERS_CONFIG.limit,
    },
    path: DASHBOARD_ROUTES.tasks.all,
  },
};
