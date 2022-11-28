import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Category from "./Category";
import Spinner from "../../../components/Spinner/Spinner";

const Categories = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await axios.get("https://ex-mobile.vercel.app/categories");
      return data.data;
    },
  });

  if (isLoading) {
    return <Spinner small={true}></Spinner>;
  }

  return (
    <div>
      <h2 className="text-4xl font-bold">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mb-36">
        {categories.map((category) => (
          <Category key={category._id} category={category}></Category>
        ))}
      </div>
    </div>
  );
};

export default Categories;
