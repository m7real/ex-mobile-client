import React, { useContext } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useSeller from "../../../hooks/useSeller";
import AllSellers from "../AllSellers/AllSellers";
import MyOrders from "../MyOrders/MyOrders";
import MyProducts from "../MyProducts/MyProducts";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const { isAdmin, isAdminLoading } = useAdmin(user?.email);
  const { isSeller, isSellerLoading } = useSeller(user?.email);

  if (loading || isAdminLoading || isSellerLoading) {
    return <Spinner></Spinner>;
  }

  if (isAdmin) {
    return <AllSellers></AllSellers>;
  }

  if (isSeller) {
    return <MyProducts></MyProducts>;
  }
  return <MyOrders></MyOrders>;
};

export default Dashboard;
