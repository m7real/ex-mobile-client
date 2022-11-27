import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);

  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 lg:bg-inherit text-base-content shadow-lg border-r border-yellow-700">
            {/* <!-- Sidebar content here --> */}

            {isAdmin ? (
              <>
                <li>
                  <Link className="font-semibold" to="/dashboard/allsellers">
                    All Sellers
                  </Link>
                </li>
                <li>
                  <Link className="font-semibold" to="/dashboard/allbuyers">
                    All Buyers
                  </Link>
                </li>
                <li>
                  <Link className="font-semibold" to="/dashboard/reporteditems">
                    Reported Items
                  </Link>
                </li>
              </>
            ) : isSeller ? (
              <>
                <li>
                  <Link className="font-semibold" to="/dashboard/addproduct">
                    Add A Product
                  </Link>
                </li>
                <li>
                  <Link className="font-semibold" to="/dashboard/myproducts">
                    My Products
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link className="font-semibold" to="/dashboard">
                  My Orders
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
