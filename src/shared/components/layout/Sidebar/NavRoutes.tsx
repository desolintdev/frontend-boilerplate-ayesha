import Link from "next/link";
import { usePathname } from "next/navigation";

import useTranslation from "@/shared/hooks/useTranslation";
import { SidebarRoute } from "@/shared/interfaces/utils";
import { SIDEBAR_ROUTES_LIST } from "@/shared/utils/PATHS";

const NavRoutes = () => {
  const { ct } = useTranslation();
  const sidebarRoutes = ct({ constant: SIDEBAR_ROUTES_LIST });
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-1 p-2">
      {sidebarRoutes.map((route: SidebarRoute) => (
        <li
          className={`${
            pathname === route.path
              ? "bg-linear-to-r from-sidebar-dark-blue to-sidebar-light-blue"
              : ""
          } rounded-[4px] hover:bg-[#5D5D61] transition-all`}
          key={route.value}
        >
          <Link href={route.path} className="px-2 flex flex-start gap-3 py-3">
            <route.icon size={20} /> {route.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavRoutes;
