const faker = require('faker');
const fs = require("fs");
// set su dung tieng viet
faker.locale = 'vi';

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
    })
    return categories;
}
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
                price: faker.commerce.price(),
                description: faker.lorem.words(50),
                image: faker.image.image(),
                created_at: Date.now(),
                created_update: Date.now(),
            };
            products.push(product);
        })
    }

    return products;
}
(() => {
    const categories = randomCategoryList(4)
    const products = randomProductList(categories, 4)

    const db = {
        categories: categories,
        products: products,
        users: [
            {
                "email": "admin@gmail.com",
                "password": "admin",
                "id": 1
            }
        ]
    }

    fs.writeFile('./src/model/db.json', JSON.stringify(db), () => {
        console.log("ok")
    });
})();