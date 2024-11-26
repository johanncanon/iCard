import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";
import { BasicLayout } from "../layout";
import { Error404 } from "../pages";

const routes = [
  ...routesAdmin,
  ...routesClient,
  {
    layout: BasicLayout,
    component: Error404,
  },
];

export default routes;
