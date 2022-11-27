import React from "react";

const Stat = () => {
  return (
    <section className="flex justify-center my-10 py-6 shadow-xl border border-primary rounded-3xl">
      <div className="stats stats-vertical lg:stats-horizontal ">
        <div className="stat">
          <div className="stat-title">Products</div>
          <div className="stat-value text-primary">31K</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Buyers</div>
          <div className="stat-value text-primary">4,200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Sellers</div>
          <div className="stat-value text-primary">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </section>
  );
};

export default Stat;
