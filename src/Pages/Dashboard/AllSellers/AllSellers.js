import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import { MdVerified } from "react-icons/md";

const AllSellers = () => {
  const { logOut } = useContext(AuthContext);
  const [deletingSeller, setDeletingSeller] = useState(null);

  const url = `https://ex-mobile.vercel.app/users?type=seller`;

  //   fetching reported users
  const {
    data: sellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", "seller"],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      if (res.status === 401 || res.status === 403) {
        toast.error(data.message);
        localStorage.removeItem("accessToken");
        return logOut();
      }
      return data;
    },
  });

  const closeModal = () => {
    setDeletingSeller(null);
  };

  // delete a product
  const handleDeleteSeller = (seller) => {
    fetch(`https://ex-mobile.vercel.app/users/${seller?._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Deleted Successfully");
          refetch();
        }
      })
      .catch((err) => console.error(err));
  };

  const handleVerifySeller = (seller) => {
    fetch(`https://ex-mobile.vercel.app/users/seller/${seller._id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Seller has been verified");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (sellers?.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-3xl font-bold text-accent text-center my-8 glass p-5 rounded-2xl">No Seller Registered</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-accent text-center my-8 ">All Sellers</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Verify</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, i) => (
              <tr key={seller._id}>
                <th>{i + 1}</th>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td className="">
                  {seller.verified ? (
                    <MdVerified className=" text-blue-600 mr-1 ml-5 text-lg" title="Verified Seller"></MdVerified>
                  ) : (
                    <button onClick={() => handleVerifySeller(seller)} className="btn btn-info btn-xs">
                      Verify
                    </button>
                  )}
                </td>

                <td>
                  <label onClick={() => setDeletingSeller(seller)} htmlFor="confirmation-modal" className="btn btn-error btn-xs">
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingSeller && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingSeller.name}, it cannot be undone`}
          successAction={handleDeleteSeller}
          successButtonName="Delete"
          modalData={deletingSeller}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default AllSellers;
