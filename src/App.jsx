import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  DashboardLayout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Register,
} from "./page";
import { loginAction, registerAction } from "./action";

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
        action: loginAction,
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
