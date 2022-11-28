// admin@exmobile.com:123456a@3A

/* 
Client Side Repo: https://github.com/programming-hero-web-course-4/b612-used-products-resale-clients-side-m7real

Server Side Repo: https://github.com/programming-hero-web-course-4/b612-used-products-resale-server-side-m7real

Live Site: https://ex-mobile.web.app/

adminEmail: admin@exmobile.com

adminPassword: 123456a@3A

*/

/* 
On clicking the Book now button, a form in a modal will popup with the logged-in user name and email address, item name, and price(item name, price, and user information will not be editable) by default. You will give your phone number and meeting location, and lastly, there will be a submit button. After clicking the submit button, you will have to inform the buyer with a modal/toast that the item is booked.

*/

// const products = [
//   {
//     name: "Samsung",
//   },
//   {
//     name: "iPhone",
//   },
//   {
//     name: "Oppo",
//   },
// ];

const products = [
  {
    category_id: "63816d8ce80b236a929df04d",
    category: "Samsung",
    img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s22-plus-5g.jpg",
    name: "Galaxy S22+ 5G",
    location: "Dhaka",
    resale_price: 10000,
    original_price: 20000,
    condition: "good",
    mobile: "013111111",
    purchased_year: "2020",
    used_years: 2,
    description: "",
    posted: "1669394892243",
    seller_name: "Abul Hasan",
    verified_seller: true,
    status: "available",
    reported: false,
  },
];

const booking = {
  _id: 1,
  buyer_name: "Tanvir Ahmed",
  email: "tanvir@t.com",
  product_name: "Galaxy S22+ 5G",
  product_id: 1,
  price: 10000,
  phone: "01323222234",
  meeting_location: "Mirpur",
  paid: false,
};

const user = {
  _id: 1,
  name: "Tanvir Ahmed",
  email: "tanvir@t.com",
  role: "buyer",
  verified: false,
};
