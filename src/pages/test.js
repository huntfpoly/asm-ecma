// input
const product = [
  [{ name: "iphone11" }, { price: 1000 }, { color: "purple" }],
  [{ name: "iphone12" }, { price: 1200 }, { color: "gold" }],
];
// output
const product = [
  {
    name: "iphone11",
    price: 1000,
    color: "purple",
  },
  {
    name: "iphone12",
    price: 1200,
    color: "gold",
  },
];
// Không fix cứng như sau:
const product = [
  { ...product[0][0], ...product[0][1], ...product[0][2] },
  { ...product[1][0], ...product[1][1], ...product[1][2] },
];
