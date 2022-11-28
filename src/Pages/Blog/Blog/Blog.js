import React from "react";
import { useLoaderData } from "react-router-dom";

import SingleBlogItem from "../SingleBlogItem/SingleBlogItem";

// this is the container component for the blogs

const Blog = () => {
  const blogs = useLoaderData();

  return (
    <div>
      <h2 className="text-4xl mx-auto mt-9 text-accent font-semibold glass rounded-xl px-6 py-3 w-fit">Featured Blog Posts</h2>
      {blogs.map((blog) => (
        <SingleBlogItem key={blog._id} blog={blog}></SingleBlogItem>
      ))}
    </div>
  );
};

export default Blog;
