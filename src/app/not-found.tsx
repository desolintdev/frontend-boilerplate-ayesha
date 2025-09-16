import { redirect } from "next/navigation";

import { ROOT_ROUTE } from "@/shared/utils/PATHS";

const NotFound = () => redirect(ROOT_ROUTE);

export default NotFound;
