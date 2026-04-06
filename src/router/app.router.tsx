import { createBrowserRouter, type RouteObject } from "react-router-dom";
import QuranPage from "../components/QuranPage";
import SuratDetail from "../components/SuratDetail";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <QuranPage />,
  },
  {
    path: "/surat/:id",
    element: <SuratDetail />,
  },
];

const appRouter = createBrowserRouter(routes);

export default appRouter;
