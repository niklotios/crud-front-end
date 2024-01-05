import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Category from "../pages/Category";
import ProductPage from "../pages/ProductPage";

const Routes = () => {
  const { token } = useAuth();

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/showCategory",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/showCategory",
          element: <Category/>,
        },
        {
          path: "/showCategory/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/showCategory/logout",
          element: <Logout/>,
        },
        {
          path: "/showCategory/showProducts/:categoryName",
          element:<ProductPage/>
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Login/>,
    },
    // {
    //   path: "/login",
    //   element: <div>Login</div>,
    // },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;