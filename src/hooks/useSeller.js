import { useEffect, useState } from "react";

// Checks if the user is Seller or not & also returns seller info
const useSeller = (email) => {
  const [isSeller, setIsSeller] = useState(false);
  const [seller, setSeller] = useState(null);
  const [isSellerLoading, setIsSellerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`https://ex-mobile.vercel.app/users/seller/${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsSeller(data.isSeller);
          if (data.isSeller) {
            setSeller(data.seller);
          }
          setIsSellerLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [email]);
  return { isSeller, isSellerLoading, seller };
};

export default useSeller;
