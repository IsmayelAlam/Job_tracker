import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DashboardLayout, HomeLayout, Landing, Login, Register } from "./page";

const route = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
  },
]);

function App() {
  return <RouterProvider router={route} />;
}

export default App;
