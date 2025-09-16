"use client";

import useLocaleRouter from "@/shared/hooks/useLocaleRouter";
import useTranslation from "@/shared/hooks/useTranslation";
import { userMutations, userQueries } from "@/shared/reactQuery";
import { DASHBOARD_ROUTES } from "@/shared/utils/PATHS";

export default function DashboardContent() {
  const router = useLocaleRouter();
  const { t } = useTranslation();
  const { useSignOutMutation } = userMutations();
  const { useFetchLoginUserInfo } = userQueries();

  // const callBackFuncs = {
  //   onSuccess: () => {},
  //   onError: () => {},
  // };

  const { mutate: executeSignOutMutation } = useSignOutMutation();

  const { data: { user } = {}, isLoading, message } = useFetchLoginUserInfo(); // {params, callBackFuncs} can be passed both are optional

  return (
    <div>
      <p>{t("dashboard.message")}</p>

      {isLoading && <p>Loading user details...</p>}

      {message && <p>{message}</p>}

      {user && (
        <div>
          <h2>Welcome, {user.firstName}!</h2>
          <p>Email: {user.email}</p>
        </div>
      )}

      <button onClick={() => executeSignOutMutation({})}>Sign Out</button>

      <button onClick={() => router.push({ url: DASHBOARD_ROUTES.users.all })}>
        Go to Users Page
      </button>

      <button
        onClick={() =>
          router.push({ url: DASHBOARD_ROUTES.users.single({ id: 1 }) })
        }
      >
        Go to Single User Page
      </button>
    </div>
  );
}
