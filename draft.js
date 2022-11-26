const categories = [
  {
    name: "Samsung",
  },
  {
    name: "iPhone",
  },
  {
    name: "Oppo",
  },
];

const products = [
  {
    _id: 1,
    category_id: 1,
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
