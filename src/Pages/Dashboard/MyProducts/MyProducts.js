import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdVerifiedUser } from "react-icons/md";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import Spinner from "../../../components/Spinner/Spinner";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const MyProducts = () => {
  const { user, logOut } = useContext(AuthContext);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const url = `http://localhost:5000/products?email=${user?.email}`;

  //   fetching products based on seller
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email],
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
    setDeletingProduct(null);
  };

  // delete a product
  const handleDeleteProduct = (product) => {
    fetch(`http://localhost:5000/products/${product?._id}`, {
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

  const handleAdvertise = (product) => {
    const updatedDoc = { product, info: "advertise" };
    fetch(`http://localhost:5000/products/${product._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(updatedDoc),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Successfully Advertised ");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (products?.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-3xl font-bold text-accent text-center my-8 glass p-5 rounded-2xl">No Products Were Added</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-accent text-center my-8 ">My Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Status</th>
              <th>Price</th>
              <th>Advertise</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>{product.name}</td>
                <td>{product.status}</td>
                <td>${product.resalePrice}</td>
                <td>
                  {product.advertised || product.status === "sold" || (
                    <button onClick={() => handleAdvertise(product)} className="btn btn-info btn-xs">
                      Advertise
                    </button>
                  )}
                  {product.advertised && (
                    <p>
                      <MdVerifiedUser className="text-info inline mx-1 mb-1"></MdVerifiedUser> Added
                    </p>
                  )}
                </td>
                <td>
                  <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-error btn-xs">
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingProduct && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingProduct.name}, it cannot be undone`}
          successAction={handleDeleteProduct}
          successButtonName="Delete"
          modalData={deletingProduct}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default MyProducts;
