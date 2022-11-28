import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Blog/Blog/Blog";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import ReportedItems from "../../Pages/Dashboard/ReportedItems/ReportedItems";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import NotFoundPage from "../../Pages/NotFoundPage/NotFoundPage";
import Products from "../../Pages/Products/Products/Products";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/category/:id",
        element: (
          <PrivateRoute>
            <Products></Products>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products?category=${params.id}`, {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }),
      },
      {
        path: "/blogs",
        element: <Blog></Blog>,
        loader: () => fetch("http://localhost:5000/blog"),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        // root route will show default elements for admin, seller & buyer conditionally
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allbuyers",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reporteditems",
        element: (
          <AdminRoute>
            <ReportedItems></ReportedItems>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reporteditems",
        element: (
          <AdminRoute>
            <ReportedItems></ReportedItems>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addproduct",
        element: (
          <SellerRoute>
            <AddProduct></AddProduct>
          </SellerRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>,
  },
]);

export default router;
