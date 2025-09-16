import PrimaryButton from "@/shared/components/common/buttons/PrimaryButton";
import { DashboardIcon, SignOutIcon } from "@/shared/components/icons";
import Footer from "@/shared/components/layout/footer";
import { Separator } from "@/shared/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/shared/components/ui/sidebar";
import { userMutations } from "@/shared/reactQuery";

import NavRoutes from "./NavRoutes";

const AppSidebar = () => {
  const { useSignOutMutation } = userMutations();

  const { mutate: executeSignOutMutation } = useSignOutMutation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex-center py-3 gap-2">
          <DashboardIcon size={24} />
          <span className="text-[20px] font-bold">Sample Dashboard</span>
        </div>
      </SidebarHeader>

      {/* divider  */}
      <Separator className="mx-2 bg-[#585858] mb-2" />

      {/* routes  */}
      <SidebarContent>
        <NavRoutes />
      </SidebarContent>

      {/* footer  */}
      <SidebarFooter>
        <PrimaryButton
          styles="bg-linear-to-r from-sidebar-dark-blue to-sidebar-light-blue"
          buttonText={
            <>
              <SignOutIcon /> Logout
            </>
          }
          onClick={() => executeSignOutMutation({})}
        />
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
