import { useEffect, useState } from "react";

// Checks if the user is Admin or not
const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`https://ex-mobile.vercel.app/users/admin/${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsAdmin(data.isAdmin);
          setIsAdminLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [email]);
  return { isAdmin, isAdminLoading };
};

export default useAdmin;
