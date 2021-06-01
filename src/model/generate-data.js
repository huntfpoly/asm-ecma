const faker = require('faker');
const fs = require("fs");
// set su dung tieng viet
faker.locale = 'vi';

const randomCategoryList = (n) => {
    if (n <= 0) return [];
    const categories = [];
    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
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
            const product = {
                categoryId: category.id,
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                description: faker.commerce.productDescription(),
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
    const products = randomProductList(categories, 5)

    const db = {
        categories: categories,
        products: products
    }

    fs.writeFile('./src/model/db.json', JSON.stringify(db), () => {
        console.log("ok")
    });
})();