import { RouterProvider } from "react-router-dom";
import RouterDesktop from "./router"

const AppRouter = () => {
  return (
    <>
      <RouterProvider router={RouterDesktop} />
    </>
  )
};

export default AppRouter;