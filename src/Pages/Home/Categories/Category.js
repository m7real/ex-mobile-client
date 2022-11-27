import React from "react";
import { useNavigate } from "react-router-dom";

const Category = ({ category }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/category/${category._id}`);
  };

  return (
    <div onClick={handleNavigate} className="card w-96 bg-base-300 shadow-xl hover:cursor-pointer hover:-my-5 transition-all border border-accent">
      <div className="card-body justify-center items-center">
        <h2 className="text-2xl font-bold font-serif text-accent">{category.name}</h2>
      </div>
    </div>
  );
};

export default Category;
