import { AdminLayout } from "../layout";
import { LoginAdmin } from "../pages/Admin";

const routesAdmin = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: LoginAdmin,
    exact: true,
  },
];

export default routesAdmin;
