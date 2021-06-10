const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();

const queryString = require('query-string');
const router = jsonServer.router('./src/model/db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.created_at = Date.now();
        req.body.updated_at = Date.now();
    } else if (req.method === 'PATCH' || req.method === 'PUT') {
        req.body.updated_at = Date.now();
    }

    // Continue to JSON Server router
    next();
});

// Custom output for LIST with pagination
router.render = (req, res) => {
    // Check GET with pagination
    // If yes, custom output
    const headers = res.getHeaders();
    // console.log(headers)
    const totalCountHeader = headers['x-total-count'];
    if (req.method === 'GET' && totalCountHeader) {
        // console.log(req.query);
        const queryParams = queryString.parse(req._parsedUrl.query);

        const result = {
            data: res.locals.data,
            pagination: {
                _page: Number.parseInt(queryParams._page) || 1,
                _limit: Number.parseInt(queryParams._limit) || 10,
                _totalRows: Number.parseInt(totalCountHeader),
            }
        };

        return res.jsonp(result);
    }

    // Otherwise, keep default behavior
    res.jsonp(res.locals.data);
};
// // /!\ Bind the router db to the app
server.db = router.db
//
// // Use default router
// // server.use('/api', router);
server.use(auth)
server.use(router);
//
// // Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('JSON Server is running');
});




// /!\ Bind the router db to the app

// You must apply the auth middleware before the router
