import React from "react";
import { Link } from "react-router-dom";
import cover from "../../assets/images/notFound.svg";

// this page will be shown on a 404 not found route

const NotFoundPage = () => {
  return (
    <div className="not-found text-center flex flex-col items-center justify-center min-h-screen">
      <img className="w-96" src={cover} alt="" />
      <h2 className="text-lg font-semibold mb-6">Looks Like The Page You Are Looking For Does Not Exist</h2>
      <Link className="btn btn-outline btn-wide font-bold" to="/">
        Return To Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
