import { createBrowserRouter, type RouteObject } from "react-router-dom";
import QuranPage from "../components/QuranPage";
import SuratDetail from "../components/SuratDetail";
import TafsirPage from "../components/TafsirPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <QuranPage />,
  },
  {
    path: "/surat/:id",
    element: <SuratDetail />,
  },
  {
    path: "/tafsir/:id/:ayatId",
    element: <TafsirPage />,
  },
  {
    path: "/tafsir/:id",
    element: <TafsirPage />,
  },
];

const appRouter = createBrowserRouter(routes);

export default appRouter;
