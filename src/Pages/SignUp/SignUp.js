import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useToken from "../../hooks/useToken";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm(); // prettier-ignore
  const { createUser, updateUserProfile, signInWithGoogle, loading, setLoading } = useContext(AuthContext);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();

  // will navigate after getting jwt token
  if (token) {
    navigate("/");
  }

  const handleSignUp = (data) => {
    setSignUpError("");
    setSignUpLoading(true);
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Sign Up Successful");
        const userInfo = {
          displayName: data.name,
        };
        updateUserProfile(userInfo)
          .then(() => {
            saveUser(data.name, data.email, data.role);
          })
          .catch((err) => {
            console.error(err);
            setSignUpLoading(false);
          });
      })
      .catch((error) => {
        console.error(error);
        setSignUpError(error.message);
        setSignUpLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // save user in the database
  const saveUser = (name, email, role = "buyer") => {
    const user = { name, email, role };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setCreatedUserEmail(email);
        }
      })
      .catch((err) => {
        console.error(err);
        setSignUpLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    setSignUpLoading(true);
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        saveUser(user.displayName, user.email);
      })
      .catch((error) => {
        console.error(error);
        setSignUpError(error.message);
        setSignUpLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading || signUpLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="mt-5 mb-8 flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-2xl text-center font-bold">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" {...register("name", { required: "Name is required" })} className="input input-bordered w-full max-w-xs" />
            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" {...register("email", { required: "Email is required" })} className="input input-bordered w-full max-w-xs" />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be 6 characters long" },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Buyer / Seller</span>
            </label>
            <select {...register("role", { required: "This field is required" })} className="select select-bordered w-full max-w-xs">
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-2">{errors.role.message}</p>}
          </div>
          <input className="btn btn-accent w-full mt-4 mb-2" value="Sign Up" type="submit" />
          {signUpError && <p className="text-red-500  my-1 text-center">{signUpError}</p>}
        </form>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link className="text-secondary" to="/login">
            Login Here
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          <FcGoogle className="mr-3 text-lg"></FcGoogle> CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SignUp;
