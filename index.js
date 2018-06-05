import micro from "micro";
import React from "react";
import ReactDOMServer from "react-dom/server";

const Page1 = () => (
  <div>
    <h1>Page 1</h1>
  </div>
);
const Page2 = () => (
  <div>
    <h1>Page 2</h1>
  </div>
);

const Home = () => (
  <div>
    <h1>Home</h1>
    <h2>
      <a href="/1">go to Page 1</a>
    </h2>
    <h2>
      <a href="/2">go to Page 2</a>
    </h2>
    <h2>
      <a href="/3">go to Page 3</a>
    </h2>
  </div>
);

const PageTemplate = ({ children, title }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />

      <title>{title}</title>
      <meta name="description" content="basic react ssr sample" />
      <meta name="author" content="Kalle Ott" />
    </head>

    <body>{children}</body>
  </html>
);

const server = micro(async (req, res) => {
  if (req.url === "/") {
    return ReactDOMServer.renderToString(
      <PageTemplate title="home">
        <Home />
      </PageTemplate>
    );
  } else if (req.url === "/1") {
    return ReactDOMServer.renderToString(
      <PageTemplate title="One">
        <Page1 />
      </PageTemplate>
    );
  } else if (req.url === "/2") {
    return ReactDOMServer.renderToString(
      <PageTemplate title="Two">
        <Page2 />
      </PageTemplate>
    );
  }

  res.statusCode = 404;

  return ReactDOMServer.renderToString(
    <PageTemplate title="Not Found">
      <h1>Oh no, much shame</h1>
    </PageTemplate>
  );
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(
    `litening on port ${PORT}, goto http://localhost:${PORT} to view the result`
  );
});
