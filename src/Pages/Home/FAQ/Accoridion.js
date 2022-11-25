import React from "react";

const Accordion = ({ faq }) => {
  // destructuring the FAQ data to show in the accordion
  const { question, answer } = faq;

  return (
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium ml-3">{question}</div>
      <div className="collapse-content">
        <p className="ml-3">{answer}</p>
      </div>
    </div>
  );
};

export default Accordion;
