import micro from "micro";
import React from "react";
import ReactDOMServer from "react-dom/server";

const server = micro(async (req, res) => {
  ReactDOMServer.renderToNodeStream(<h1>Hello world</h1>).pipe(res);
});

server.listen(3000);
