import React from "react";
import { format } from "date-fns";
import useSeller from "../../../hooks/useSeller";
import Spinner from "../../../components/Spinner/Spinner";
import { MdVerified } from "react-icons/md";
import { MdOutlineOutlinedFlag } from "react-icons/md";
import toast from "react-hot-toast";

const ProductCard = ({ product, setBookingItem }) => {
  const {
    _id,
    name,
    resalePrice,
    originalPrice,
    sellerEmail,
    sellerMobile,
    sellerLocation,
    description,
    condition,
    purchasedYear,
    usedYears,
    image,
    posted,
  } = product;

  const { seller, isSellerLoading } = useSeller(sellerEmail);

  const handleReportToAdmin = (id) => {
    const updatedDoc = { info: "reported" };
    fetch(`https://ex-mobile.vercel.app/products/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(updatedDoc),
    })
      .then((res) => res.json())
      .then((data) => {
        // ignored modified count as it will prevent report successful toast for all other users if there is at least one user reports.
        if (data.acknowledged) {
          toast.success("Successfully Reported To Admin");
        }
      });
  };

  if (isSellerLoading) {
    return <Spinner small={true}></Spinner>;
  }

  //   destructuring after properly loading seller
  const { _id: sellerId, name: sellerName, verified } = seller;

  return (
    <div className="card lg:card-side bg-base-300 shadow-xl  py-6 px-7">
      <figure className="max-w-xs  pt-6 lg:pt-0 ">
        <img className="rounded-2xl  " src={image} alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="card-title mx-auto">{name}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
          <p className="flex items-center justify-start">
            <span className="text-primary mr-2">Seller : </span> {sellerName}{" "}
            {verified && <MdVerified className=" text-blue-600 ml-1 text-sm" title="Verified Seller"></MdVerified>}
          </p>
          <p>
            <span className="text-primary mr-1">Resale Price:</span> ${resalePrice}
          </p>
          <p>
            <span className="text-primary mr-1">Original Price:</span> ${originalPrice}
          </p>
          <p>
            <span className="text-primary mr-1">Location:</span> {sellerLocation}
          </p>
          <p>
            <span className="text-primary mr-1">Mobile:</span> {sellerMobile}
          </p>
          <p>
            <span className="text-primary mr-1">Purchased Year:</span> {purchasedYear}
          </p>
          <p>
            <span className="text-primary mr-1">Used For:</span> {usedYears} {usedYears > 1 ? "Years" : "Year"}
          </p>
          <p>
            <span className="text-primary mr-1">Condition:</span> {condition}
          </p>
          <p>
            <span className="text-primary mr-1">Posted On :</span> {format(posted, "PPpp")}
          </p>
        </div>
        <p className="lg:w-2/3">
          <span className="text-primary mr-1">Description:</span> {description}
        </p>
        <div className="card-actions items-center justify-between">
          <button onClick={() => handleReportToAdmin(_id)} className="btn btn-outline btn-xs text-red-700 normal-case">
            <MdOutlineOutlinedFlag className="mr-1"></MdOutlineOutlinedFlag> Report To Admin
          </button>
          <label htmlFor="booking-modal" onClick={() => setBookingItem(product)} className="btn btn-primary">
            Book Now
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
