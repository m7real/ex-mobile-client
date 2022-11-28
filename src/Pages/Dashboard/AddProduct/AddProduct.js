import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm(); // prettier-ignore
  const { user } = useContext(AuthContext);

  //   key for imgBB
  const imgHostKey = process.env.REACT_APP_imgbb_key;

  const navigate = useNavigate();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/categories");
      const data = res.json();
      return data;
    },
  });

  const handleAddProduct = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
    // posting image to imgBB
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          console.log(imgData.data.url);
          const product = {
            name: data.name,
            resalePrice: data.resalePrice,
            originalPrice: data.originalPrice,
            sellerEmail: user?.email,
            sellerMobile: data.sellerMobile,
            sellerLocation: data.sellerLocation,
            description: data.description,
            condition: data.condition,
            purchasedYear: data.purchasedYear,
            categoryId: data.category,
            image: imgData.data.url,
            status: "available",
          };

          //   save product information to the database
          fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result.acknowledged) {
                toast.success(`${data.name} added Successfully`);
                // it will navigate to the MyProducts page as it is conditionally rendered in the dashboard root for seller
                navigate("/dashboard");
              }
            });
        }
      });
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <section className="flex justify-center items-center mb-12">
      <div className="w-96 p-7">
        <h2 className="text-4xl font-semibold text-center mt-10 mb-4">Add A Product</h2>
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <div className="form-control w-full max-w-xs">
            <label className="label mt-1">
              <span className="label-text">Name</span>
            </label>
            <input type="text" {...register("name", { required: "Name is required" })} className="input input-bordered w-full max-w-xs" />
            {errors.name && <p className="text-red-500 mt-2 text-sm">{errors.name?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label mt-1">
              <span className="label-text">Resale Price</span>
            </label>
            <input
              type="text"
              {...register("resalePrice", { required: "Resale Price is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.resalePrice && <p className="text-red-500 mt-2 text-sm">{errors.resalePrice?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label mt-1">
              <span className="label-text">Original Price</span>
            </label>
            <input
              type="text"
              {...register("originalPrice", { required: "Original Price is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.originalPrice && <p className="text-red-500 mt-2 text-sm">{errors.originalPrice?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label mt-1">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              {...register("sellerLocation", { required: "Location is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.sellerLocation && <p className="text-red-500 mt-2 text-sm">{errors.sellerLocation?.message}</p>}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label mt-1">
              <span className="label-text">Condition</span>
            </label>
            <select {...register("condition", { required: "Condition is required" })} className="select select-bordered w-full max-w-xs">
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
            {errors.condition && <p className="text-red-500 mt-2 text-sm">{errors.condition?.message}</p>}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label mt-1">
              <span className="label-text">Year of Purchase</span>
            </label>
            <input
              type="text"
              {...register("purchasedYear", { required: "Year of Purchase is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.purchasedYear && <p className="text-red-500 mt-2 text-sm">{errors.purchasedYear?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label mt-1">
              <span className="label-text">Mobile Number</span>
            </label>
            <input
              type="text"
              {...register("sellerMobile", { required: "Mobile Number is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.sellerMobile && <p className="text-red-500 mt-2 text-sm">{errors.sellerMobile?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label mt-1">
              <span className="label-text">Category</span>
            </label>
            <select {...register("category", { required: "Category is required" })} className="select select-bordered w-full max-w-xs">
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category?.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 mt-2 text-sm">{errors.category?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label mt-1">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="textarea textarea-bordered w-full max-w-xs"
            ></textarea>
            {errors.description && <p className="text-red-500 mt-2 text-sm">{errors.description?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label mt-1">
              <span className="label-text">Image</span>
            </label>
            <input type="file" {...register("image", { required: "Image is required" })} className="file-input file-input-bordered w-full max-w-xs" />
            {errors.image && <p className="text-red-500 mt-2 text-sm">{errors.image?.message}</p>}
          </div>

          <input className="btn btn-accent w-full mt-4" value="Add" type="submit" />
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
