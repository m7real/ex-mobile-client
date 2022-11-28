import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Spinner from "../../../components/Spinner/Spinner";

const Stat = () => {
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const data = await axios.get("http://localhost:5000/stats");
      return data.data;
    },
  });

  if (isLoading) {
    return <Spinner small={true}></Spinner>;
  }

  return (
    <>
      <h2 className="text-3xl font-bold">Statistics</h2>
      <section className="flex justify-center my-10 py-6 shadow-xl border-b border-t border-accent rounded-3xl">
        <div className="stats stats-vertical lg:stats-horizontal ">
          <div className="stat">
            <div className="stat-title">Total Products</div>
            <div className="stat-value text-accent font-serif text-center">{stats.productsCount}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-accent font-serif text-center">{stats.usersCount}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Total Bookings</div>
            <div className="stat-value text-accent font-serif text-center">{stats.bookingsCount}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Stat;
