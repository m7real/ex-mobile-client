import React, { useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import BookingModal from "../BookingModal/BookingModal";
import ProductCard from "./ProductCard";

const Products = () => {
  const products = useLoaderData();
  const [bookingItem, setBookingItem] = useState(null);

  const location = useLocation();
  const category = location.state;

  if (!products) {
    return <Spinner></Spinner>;
  }
  if (products?.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-3xl font-bold text-accent text-center my-10">No {category?.name} Smartphones Were Found </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h2 className="text-3xl font-bold text-accent text-center my-20 "> {category?.name} Smartphones </h2>
      <div className="grid grid-cols-1 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} setBookingItem={setBookingItem}></ProductCard>
        ))}
      </div>
      {bookingItem && <BookingModal bookingItem={bookingItem} setBookingItem={setBookingItem}></BookingModal>}
    </div>
  );
};

export default Products;
