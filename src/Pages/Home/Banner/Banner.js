import React from "react";
import cover from "../../../assets/images/cover.jpg";

const Banner = () => {
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={cover} className="lg:w-1/2 rounded-lg" alt="" />
        <div className="lg:w-1/2">
          <h1 className="text-5xl font-bold ">
            SELL YOUR <br /> SMARTPHONE <br /> FOR QUICK CASH
          </h1>
          <p className="py-6">
            Are you looking for a place where you can buy or sell used mobile phone? Congratulations!! You are at the right place.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
