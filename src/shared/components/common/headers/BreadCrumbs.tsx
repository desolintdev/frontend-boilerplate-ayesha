import Link from "next/link";

import HomeIcon from "@/shared/components/icons/homeIcon";
import { BreadCrumbsProps } from "@/shared/interfaces/layout";
import { DASHBOARD_ROOT } from "@/shared/utils/PATHS";

const BreadCrumbs = ({ label }: BreadCrumbsProps) => {
  return (
    <div className="flex-start gap-2">
      <Link href={DASHBOARD_ROOT}>
        <HomeIcon />
      </Link>
      <span className="text-sm">/</span>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default BreadCrumbs;
