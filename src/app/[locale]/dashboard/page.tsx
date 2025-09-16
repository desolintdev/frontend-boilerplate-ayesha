import DashboardContent from "@/shared/components/pages/dashboard";
import { USERS } from "@/shared/constants/reactQueryConstants";
import ReactPrefetchQueryProvider from "@/shared/providers/ReactPrefetchQueryProvider";
import { generateMetadata } from "@/shared/utils/metadataUtils";

export default function Dashboard() {
  return (
    <ReactPrefetchQueryProvider queriesToFetch={[USERS.fetchLoginUserInfo]}>
      <DashboardContent />
    </ReactPrefetchQueryProvider>
  );
}

export const metadata = async () =>
  await generateMetadata({ pageName: "dashboard" });
