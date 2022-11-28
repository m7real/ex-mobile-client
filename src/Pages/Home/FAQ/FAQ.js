import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Accordion from "./Accoridion";

// container component for FAQ Accordion
const FAQ = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/faq")
      .then((res) => res.json())
      .then((data) => setFaqs(data));
  }, []);

  return (
    <div className="mx-10 my-14 md:my-20">
      <h2 className="text-xl md:text-4xl text-center mt-6 mb-10 md:mb-14">Frequently Asked Questions</h2>
      {faqs.map((faq) => (
        <Accordion key={faq._id} faq={faq}></Accordion>
      ))}
    </div>
  );
};

export default FAQ;
