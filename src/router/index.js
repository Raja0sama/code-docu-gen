import React from "react";
import { createBrowserRouter, useLoaderData } from "react-router-dom";
import Home from "../pages/home";
import Documentation from "../pages/documentation";
import config from "../config/index.json";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Admin from "../pages/admin";
import Configuration from "../pages/admin/configuration";
import Markdowns from "../pages/admin/markdowns";
import MarkdownItem from "../pages/admin/markdowns/markdownItem";
import Pages from "../pages/admin/pages";

const Element = (props) => {
  const data = useLoaderData();
  return (
    <div className={"flex-1 flex my-10"}>
      <MarkdownPreview
        source={data}
        style={{ background: "transparent" }}
        className={"mix-blend-difference"}
      />
    </div>
  );
};

const Components = {
  DOCUMENTATION: Documentation,
  DOCUMENTATION_CONTAINER: Element,
  ADMIN: Admin,
  INDEX: Configuration,
  MARKDOWNS: Markdowns,
  MARKDOWN_ITEM: MarkdownItem,
  PAGES: Pages,
};
const generate_routes = (routes) => {
  return routes.map((route) => {
    const Component = Components[route.layout];
    const returnElement = {
      path: route.key,
      element: <Component redirect={[route.key, route?.redirect]} />,
    };

    if (route.children) {
      returnElement.children = generate_routes(route.children);
    }
    if (route.content) {
      returnElement.loader = ({ request }) =>
        fetch(route.content, {
          signal: request.signal,
        });
    }
    return returnElement;
  });
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: ({ request }) =>
      fetch(config.app.landingContent, {
        signal: request.signal,
      }),
  },
  ...generate_routes(config.routes),
]);
