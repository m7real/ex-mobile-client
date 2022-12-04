import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { MdVerifiedUser, MdOutlineCreditCard } from "react-icons/md";
import Spinner from "../../../components/Spinner/Spinner";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const url = `http://localhost:5000/bookings?email=${user?.email}`;

  const { data: orders, isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: () =>
      fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (orders?.length < 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-3xl font-bold text-accent text-center my-8 glass p-5 rounded-2xl">You Have No Orders</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-accent text-center my-8">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, i) => (
              <tr key={order._id}>
                <th>{i + 1}</th>
                <td>
                  <img className="w-14 rounded-md" src={order?.productImage} alt="" />
                </td>
                <td>{order?.productName}</td>
                <td>$ {order?.price}</td>
                <td>
                  {order?.paid ? (
                    <span className="px-2 py-1 bg-lime-800 rounded-xl">
                      Paid <MdVerifiedUser className="text-info inline mx-1 mb-1"></MdVerifiedUser>
                    </span>
                  ) : (
                    <Link to="" className="btn btn-sm bg-amber-800">
                      Pay <MdOutlineCreditCard className=" inline ml-2"></MdOutlineCreditCard>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
