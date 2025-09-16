export const getAuthTokenCookieName = () => {
  const tokenKey = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || 'x-auth-token';
  const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || 'default-project';

  return `${tokenKey}-${projectName}`;
};
