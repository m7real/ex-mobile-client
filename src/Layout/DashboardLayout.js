import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { MdOutlineSell, MdOutlineOutlinedFlag, MdAddCircleOutline } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import Spinner from "../components/Spinner/Spinner";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const [isSeller, isSellerLoading] = useSeller(user?.email);

  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile h-auto">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content min-h-screen  border-l border-yellow-700">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 lg:bg-inherit text-base-content  shadow-lg">
            {/* <!-- Sidebar content here --> */}

            {/* This will navigate to the dashboard root and will show relevant components conditionally there */}
            <li>
              <Link className="font-semibold" to="/dashboard">
                {isAdminLoading || isSellerLoading ? (
                  <Spinner small={true}></Spinner>
                ) : isAdmin ? (
                  <>
                    <MdOutlineSell className="text-xl"></MdOutlineSell>
                    All Sellers
                  </>
                ) : isSeller ? (
                  <>
                    <MdOutlineSell className="text-xl"></MdOutlineSell>
                    My Products
                  </>
                ) : (
                  <>
                    <TiShoppingCart className="text-xl"></TiShoppingCart>
                    My Orders
                  </>
                )}
              </Link>
            </li>

            {isAdmin && (
              <>
                <li>
                  <Link className="font-semibold" to="/dashboard/allbuyers">
                    <FaUsers className="text-xl"></FaUsers>
                    All Buyers
                  </Link>
                </li>
                <li>
                  <Link className="font-semibold" to="/dashboard/reporteditems">
                    <MdOutlineOutlinedFlag className="text-xl"></MdOutlineOutlinedFlag>
                    Reported Items
                  </Link>
                </li>
              </>
            )}
            {isSeller && (
              <li>
                <Link className="font-semibold" to="/dashboard/addproduct">
                  <MdAddCircleOutline className="text-xl"></MdAddCircleOutline>
                  Add A Product
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
