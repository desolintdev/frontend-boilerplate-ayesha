"use client";

import DashboardHeader from "@/shared/components/common/headers/DashboardHeader";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { NodeChildrenProps } from "@/shared/interfaces/common";

import AppSidebar from "./AppSidebar";

const SidebarLayout = ({ children }: NodeChildrenProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <DashboardHeader />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
