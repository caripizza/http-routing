const peopleRoutes = require('./routes/people');
const puppyRoutes = require('./routes/puppies');
const catRoutes = require('./routes/cats');
const { parse } = require('url');
const notFoundRoute = require('../lib/routes/notFound');

module.exports = (req, res) => {
  const url = parse(req.url, true);

  res.throwErrOrObj = (err, obj) => {
    err ? res.statusCode = 400 && res.end(JSON.stringify(err))
      : res.end(JSON.stringify(obj));
  };

  res.setHeader('Content-Type', 'application/json');

  if(url.pathname === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <html>
        <body>
          <p>Welcome to Cari's HTTP Routing app!</p>
          <a href="/people">View people</a><br>
          <a href="/puppies">View puppies</a><br>
          <a href="/cats">View cats</a><br>
        </body>
      </html>
    `);
  } else if(url.pathname.includes('/people')) {
    return peopleRoutes(req, res);
  } else if(url.pathname.includes('/puppies')) {
    return puppyRoutes(req, res);
  } else if(url.pathname.includes('/cats')) {
    return catRoutes(req, res);
  } else {
    notFoundRoute(req, res);
  }

};
