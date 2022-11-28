import React from "react";
import AdvertisedProducts from "../AdvertisedProducts/AdvertisedProducts";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import FAQ from "../FAQ/FAQ";
import Stat from "../Stat/Stat";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AdvertisedProducts></AdvertisedProducts>
      <Categories></Categories>
      <Stat></Stat>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
