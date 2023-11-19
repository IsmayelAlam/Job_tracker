import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  DashboardLayout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Register,
} from "./page";
import { registerAction } from "./action/register";

const route = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
      },
    ],
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={route} />;
}

export default App;
