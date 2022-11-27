import React from "react";
import { useLoaderData } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";

const Products = () => {
  const products = useLoaderData();
  if (!products) {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      <h2>Products: {products?.length} </h2>
    </div>
  );
};

export default Products;
