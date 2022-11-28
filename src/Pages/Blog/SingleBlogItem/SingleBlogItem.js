import React from "react";

// single blog containing blog items

const SingleBlogItem = ({ blog }) => {
  const { question, answer } = blog;

  return (
    <div className="mt-6 p-10 shadow-xl rounded-xl">
      <h3 className="text-2xl mb-3">{question}</h3>
      <p> {answer}</p>
    </div>
  );
};

export default SingleBlogItem;
