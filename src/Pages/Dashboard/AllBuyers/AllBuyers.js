import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const AllBuyers = () => {
  const { logOut } = useContext(AuthContext);
  const [deletingBuyer, setDeletingBuyer] = useState(null);

  const url = `http://localhost:5000/users?type=buyer`;

  //   fetching reported users
  const {
    data: buyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", "buyer"],
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
    setDeletingBuyer(null);
  };

  // delete a product
  const handleDeleteBuyer = (buyer) => {
    fetch(`http://localhost:5000/users/${buyer?._id}`, {
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

  // convert a buyer (general user) to admin
  const handleMakeAdmin = (buyer) => {
    fetch(`http://localhost:5000/users/admin/${buyer._id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make Admin Successful");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (buyers?.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-3xl font-bold text-accent text-center my-8 glass p-5 rounded-2xl">No Buyer Registered</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-accent text-center my-8 ">All Buyers</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, i) => (
              <tr key={buyer._id}>
                <th>{i + 1}</th>
                <td>{buyer.name}</td>
                <td>{buyer.email}</td>
                <td>
                  <button onClick={() => handleMakeAdmin(buyer)} className="btn btn-info btn-xs">
                    Make Admin
                  </button>
                </td>

                <td>
                  <label onClick={() => setDeletingBuyer(buyer)} htmlFor="confirmation-modal" className="btn btn-error btn-xs">
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingBuyer && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingBuyer.name}, it cannot be undone`}
          successAction={handleDeleteBuyer}
          successButtonName="Delete"
          modalData={deletingBuyer}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default AllBuyers;
