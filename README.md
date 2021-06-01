## Cài đặt taildwindcss

    - Cài các package npm sau:
        npm install -D tailwindcss@latest postcss@latest autoprefixer@latest tailwindcss-cli@latest
    - tạo file postcss.config.js
        module.exports = {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        }
        }
    - npx tailwindcss init

    - tạo file tailwind.css (tên file tùy chọn) và thêm: @tailwind base;
    @tailwind components;
    @tailwind utilities;

    - Trong file tailwind.config.js
    module.exports = {
        purge: [
            './src/**/*.html',
            './src/**/*.js',
        ],
        mode: "jit",
        darkMode: false, // or 'media' or 'class'
        theme: {
        extend: {},
        },
        variants: {},
        plugins: [],
    }
    - Vào phần script trong file package.json thêm:    "build-css": "NODE_ENV=development postcss tailwind.css -o path/.../styles.css -w"
    ( dùng postcss để build ra file style.css, lấy đường dẫn của file tailwind.css để build tới đường dẫn chứa phần css mình muốn)

    - cuối cùng chạy: npm run build-css rồi kiểm tra nó đã build ra file css đúng như đường dẫn trên chưa
