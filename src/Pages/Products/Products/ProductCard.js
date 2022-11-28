import React from "react";
import { format } from "date-fns";
import useSeller from "../../../hooks/useSeller";
import Spinner from "../../../components/Spinner/Spinner";
import { MdVerified } from "react-icons/md";

const ProductCard = ({ product }) => {
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
    categoryId,
    image,
    status,
    posted,
  } = product;

  const { seller, isSellerLoading } = useSeller(sellerEmail);

  if (isSellerLoading) {
    return <Spinner small={true}></Spinner>;
  }

  //   destructuring after properly loading seller
  const { _id: sellerId, name: sellerName, verified } = seller;

  return (
    <div className="card lg:card-side bg-base-300 shadow-xl  py-6 px-7">
      <figure className="min-w-fit ">
        <img className="rounded-2xl" src={image} alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="card-title mx-auto">{name}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
          <p className="flex items-center justify-start">
            <span className="text-primary mr-2">Seller : </span> {sellerName}{" "}
            {verified && <MdVerified className=" text-blue-700 ml-1 text-sm" title="Verified Seller"></MdVerified>}
          </p>
          <p>
            <span className="text-primary mr-1">Posted On :</span> {format(posted, "PPpp")}
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
        </div>
        <p className="lg:w-2/3">
          <span className="text-primary mr-1">Description:</span> {description}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
