const faker = require("faker");
const fs = require("fs");
// set su dung tieng viet
faker.locale = "vi";

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categories = [];
  Array.from(new Array(n)).forEach(() => {
    const name = faker.commerce.department();
    const category = {
      id: faker.datatype.uuid(),
      name,
      slug: faker.helpers.slugify(name),
      image: faker.image.image(),
      created_at: Date.now(),
      created_update: Date.now(),
    };
    categories.push(category);
  });
  return categories;
};
const randomProductList = (categorylist, numberProduct) => {
  if (numberProduct <= 0) return [];
  const products = [];

  for (const category of categorylist) {
    Array.from(new Array(numberProduct)).forEach(() => {
      const name = faker.commerce.productName();
      const product = {
        categoryId: category.id,
        id: faker.datatype.uuid(),
        name,
        slug: faker.helpers.slugify(name),
        sku: [
          { size: "sm", color: "red", price: "1234567", quantity: "17" },
          { size: "md", color: "red", price: "1234567", quantity: "17" },
          { size: "sm", color: "blue", price: "2345122", quantity: "28" },
          { size: "md", color: "blue", price: "6323121", quantity: "34" },
          { size: "sm", color: "white", price: "4143151", quantity: "53" },
          { size: "md", color: "white", price: "9384736", quantity: "42" },
        ],
        shortDescription: faker.lorem.words(50),
        description: faker.lorem.words(50),
        image: faker.image.image(),
        created_at: Date.now(),
        created_update: Date.now(),
      };
      products.push(product);
    });
  }

  return products;
};
(() => {
  const categories = randomCategoryList(4);
  const products = randomProductList(categories, 4);

  const db = {
    categories: categories,
    products: products,
    users: [
      {
        email: "admin@gmail.com",
        password: "admin",
        id: 1,
      },
    ],
    orders: [],
  };

  fs.writeFile("./src/model/db.json", JSON.stringify(db), () => {
    console.log("ok");
  });
})();
