import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const BookingModal = ({ bookingItem, setBookingItem }) => {
  // bookingItem is just another name of product
  const { _id, name, resalePrice, sellerEmail, sellerMobile, categoryId, image } = bookingItem;
  const { user } = useContext(AuthContext);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const buyerName = form.buyerName.value;
    const buyerEmail = form.buyerEmail.value;
    const productName = form.productName.value;
    const price = form.price.value;
    const buyerPhone = form.buyerPhone.value;
    const buyerMeetingLocation = form.buyerMeetingLocation.value;

    const booking = {
      buyerName,
      buyerEmail,
      categoryId,
      productId: _id,
      productName,
      productImage: image,
      price,
      buyerPhone,
      buyerMeetingLocation,
      sellerEmail,
      sellerMobile,
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setBookingItem(null); // as we have rendered the modal depending on bookingItem, setting it null will close/hide the modal.
          toast.success("Booking Confirmed");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">Please provide your information</h3>
          <form onSubmit={handleBooking} className="grid grid-cols-1 gap-3 mt-10">
            {/*  */}

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                name="buyerName"
                type="text"
                defaultValue={user?.displayName}
                disabled
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input name="buyerEmail" type="email" defaultValue={user?.email} disabled placeholder="Email" className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input name="productName" type="text" defaultValue={name} disabled placeholder="Product Name" className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input name="price" type="text" defaultValue={resalePrice} disabled placeholder="Price" className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input name="buyerPhone" type="text" required placeholder="Your Phone Number" className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Meeting Location</span>
              </label>
              <input name="buyerMeetingLocation" type="text" required placeholder="Meeting Location" className="input input-bordered w-full" />
            </div>
            <br />
            <input className="btn btn-accent w-full" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
