import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AddJob,
  AllJobs,
  DashboardLayout,
  EditJob,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
} from "./page";
import {
  addJobsAction,
  deleteJobAction,
  editJobAction,
  editProfileAction,
  loginAction,
  registerAction,
} from "./action";
import { allJobsLoader, dashboardLoader, editJobLoader } from "./loader";

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
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobsAction,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "stats",
            element: <Stats />,
          },

          {
            path: "profile",
            element: <Profile />,
            action: editProfileAction,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          { path: "delete-job/:id", action: deleteJobAction },
        ],
      },
    ],
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={route} />;
}

export default App;
