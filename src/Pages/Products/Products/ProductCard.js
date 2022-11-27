import React from "react";

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
    categoryId,
    image,
    status,
    posted,
  } = product;

  return (
    <div className="card lg:card-side bg-base-100 shadow-2xl border border-accent">
      <figure>
        <img src={image} alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">New album is released!</h2>
        <p>Click the button to listen on Spotiwhy app.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

/* const p = {
  categoryId: "63816d8ce80b236a929df04e",
  condition: "good",
  description: "I want to buy new iPhone 15 pro max. For that I need a lot of money. I don't need this phone anymore. You can grab this chance.",
  image: "https://i.ibb.co/9pdBwS6/apple-iphone-13-pro.jpg",
  name: "iPhone 13 Pro",
  originalPrice: "68000",
  posted: 1669568642010,
  purchasedYear: "2020",
  resalePrice: "35000",
  sellerEmail: "shamim@exmobile.com",
  sellerLocation: "Dhaka",
  sellerMobile: "01515336587",
  status: "available",
  _id: "6383988250354e597250ad5a",
}; */
