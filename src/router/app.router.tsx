import { createBrowserRouter,  } from "react-router-dom";
import QuranPage from "../components/QuranPage";
import SuratDetail from "../components/SuratDetail";
import TafsirPage from "../components/TafsirPage";
import Doa from "../components/Doa";



const router = createBrowserRouter([ {
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
    path: "/Doa",
    element: <Doa />,
  },


  ]);

export default router;
