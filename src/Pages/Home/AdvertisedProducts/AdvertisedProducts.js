import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import axios from "axios";
import Spinner from "../../../components/Spinner/Spinner";
import SingleAdvertisedProduct from "./SingleAdvertisedProduct";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import BookingModal from "../../Products/BookingModal/BookingModal";

const AdvertisedProducts = () => {
  const { user, loading } = useContext(AuthContext);
  const [bookingItem, setBookingItem] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "advertised"],
    queryFn: async () => {
      const data = await axios.get("https://ex-mobile.vercel.app/products/advertised");
      return data.data;
    },
  });

  if (isLoading || loading) {
    return <Spinner small={true}></Spinner>;
  }

  //   will only render when there is at least one advertised product

  if (products?.length > 0) {
    return (
      <div>
        <h2 className="text-4xl font-bold">Advertised Items</h2>
        <div className="grid grid-cols-1 gap-8 mt-12 mb-36">
          {products.map((product) => (
            <SingleAdvertisedProduct key={product._id} product={product} setBookingItem={setBookingItem} user={user}></SingleAdvertisedProduct>
          ))}
        </div>
        {bookingItem && <BookingModal bookingItem={bookingItem} setBookingItem={setBookingItem}></BookingModal>}
      </div>
    );
  }
};

export default AdvertisedProducts;
