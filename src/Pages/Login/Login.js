import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useToken from "../../hooks/useToken";
import { FcGoogle } from "react-icons/fc";
import Spinner from "../../components/Spinner/Spinner";

const Login = () => {
  const { register, formState: { errors }, handleSubmit, } = useForm(); // prettier-ignore
  const { logIn, loading, setLoading, signInWithGoogle } = useContext(AuthContext);
  const [logInLoading, setLogInLoading] = useState(false);
  const [logInError, setLogInError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  const handleLogin = (data) => {
    setLogInLoading(true);
    console.log(data);
    setLogInError("");
    logIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginUserEmail(data.email);
      })
      .catch((error) => {
        console.error(error);
        setLogInError(error.message);
        setLogInLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // save google sign in user in the database
  const saveUser = (name, email, role = "buyer") => {
    const user = { name, email, role };
    fetch("https://ex-mobile.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setLoginUserEmail(email);
        }
      })
      .catch((err) => {
        console.error(err);
        setLogInLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    setLogInLoading(true);
    console.log();
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        saveUser(user.displayName, user.email);
      })
      .catch((error) => {
        console.error(error);
        setLogInError(error.message);
        setLogInLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading || logInLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="mt-5 mb-8 flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-2xl text-center font-bold">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" {...register("email", { required: "Email address is required" })} className="input input-bordered w-full max-w-xs" />
            {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be 6 characters or longer" },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && <p className="text-red-600 text-sm mt-2">{errors.password?.message}</p>}
            <label className="label">
              <span className="label-text">Forgot Password?</span>
            </label>
          </div>
          <input className="btn btn-accent w-full mt-3 mb-2" value="Login" type="submit" />
          <div>{logInError && <p className="text-red-500  my-1 text-center">{logInError}</p>}</div>
        </form>
        <p className="text-center text-sm">
          New to Ex Mobile?{" "}
          <Link className="text-secondary" to="/signup">
            Create New Account
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

export default Login;
