import {DashboardIcon, UsersIcon, TasksIcon} from '@/shared/components/icons';
import {SidebarRoute, SiteMapLink} from '@/shared/interfaces/utils';

const path = ({root, path}: {root: string; path: string}): string =>
  `${root}${path}`;

export const removeFirstSlash = ({path}: {path: string}): string => {
  const [_, ...rest] = path.split('/');

  return rest.join('/');
};

export const ROOT_ROUTE = '/';

export const AUTH_ROOT = '/auth';

export const DASHBOARD_ROOT = '/dashboard';

export const AUTH_ROUTES = {
  login: path({root: AUTH_ROOT, path: '/login'}),
  register: path({root: AUTH_ROOT, path: '/register'}),
  reset: path({root: AUTH_ROOT, path: '/reset'}),
  unverifiedLoginAttempt: path({
    root: AUTH_ROOT,
    path: '/unverified-login-attempt',
  }),
  verify: path({root: AUTH_ROOT, path: '/verify'}),
  forgotPassword: path({root: AUTH_ROOT, path: '/forgot-password'}),
  registerVerifyRequest: path({root: AUTH_ROOT, path: '/link-sent/verify'}),
  resetPasswordRequest: path({root: AUTH_ROOT, path: '/link-sent/reset'}),
};

export const DASHBOARD_ROUTES = {
  home: path({root: DASHBOARD_ROOT, path: '/'}),
  users: {
    all: path({root: DASHBOARD_ROOT, path: '/users'}),
    single: ({id}: {id: string | number}): string =>
      path({root: DASHBOARD_ROOT, path: `/users/${id}`}),
  },
  tasks: {
    all: path({root: DASHBOARD_ROOT, path: '/tasks'}),
    single: ({id}: {id: string | number}): string =>
      path({root: DASHBOARD_ROOT, path: `/tasks/${id}`}),
  },
};

export const SIDEBAR_ROUTES = ({
  t,
}: {
  t: (key: string) => string;
}): {[key: string]: SidebarRoute} => ({
  dashboard: {
    value: 'dashboard',
    label: t('navigationRoutes.dashboard'),
    path: DASHBOARD_ROOT,
    icon: DashboardIcon,
  },
  users: {
    value: 'users',
    label: t('navigationRoutes.users'),
    path: DASHBOARD_ROUTES.users.all,
    icon: UsersIcon,
  },
  tasks: {
    value: 'tasks',
    label: t('navigationRoutes.tasks'),
    path: DASHBOARD_ROUTES.tasks.all,
    icon: TasksIcon,
  },
});

export const SIDEBAR_ROUTES_LIST = ({
  t,
}: {
  t: (key: any) => any;
}): SidebarRoute[] => Object.values(SIDEBAR_ROUTES({t}));

export const SITE_MAP_LINKS: {[key: string]: SiteMapLink} = {
  home: {
    url: ROOT_ROUTE,
    priority: 1,
    changeFrequency: 'daily',
    lastModified: new Date(),
  },
  login: {
    url: AUTH_ROUTES.login,
    priority: 0.8,
    changeFrequency: 'daily',
    lastModified: new Date(),
  },
  register: {
    url: AUTH_ROUTES.register,
    priority: 0.8,
    changeFrequency: 'daily',
    lastModified: new Date(),
  },
};
