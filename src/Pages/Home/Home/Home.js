import React from "react";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import FAQ from "../FAQ/FAQ";
import Stat from "../Stat/Stat";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
      <Stat></Stat>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
