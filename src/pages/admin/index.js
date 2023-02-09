import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import config from "../../config/index.json";
import { Header } from "../../components/Header";

export default function Admin() {
  let isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
  const location = useLocation();
  const theme = useTheme();

  const mainContainerStyles = {
    backgroundColor: theme.body[theme.theme],
    color: theme.theme === "light" ? "#000" : "#fff",
  };

  if (location.pathname === "/admin/" || location.pathname === "/admin") {
    return <Navigate to={"/admin/configuration"} />;
  }
  if (isDev)
    return (
      <div
        className="flex flex-1 flex-col w-screen h-screen"
        style={mainContainerStyles}
      >
        <Header />
        <div className="flex max-w-7xl mx-auto w-full mt-2 overflow-hidden">
          <div className="w-52 overflow-auto">
            <div className="h-5"></div>
            <div>
              <h1 className="font-bold text-xl mb-4">DOC Maker</h1>
              <RenderRoutes
                routes={config.routes.filter((e) => e.environment === "dev")}
              />
            </div>
          </div>
          <div className="overflow-auto flex-1 flex overflow-auto my-10">
            <Outlet />
          </div>
        </div>
      </div>
    );

  return <Navigate to={"/"} />;
}

const RenderRoutes = ({ routes, path }) => {
  const location = useLocation();

  return routes.map((route) => {
    const returnElement = {
      path: route.key,
      name: route.name,
    };
    if (route.children) {
      return (
        <>
          <div className="text-lg pt-2">
            <a>{returnElement.name}</a>
          </div>
          <RenderRoutes path={returnElement.path} routes={route.children} />
        </>
      );
    }

    const isActive = location.pathname.includes(returnElement.path);
    const style = {
      opacity: isActive && 100,
      backgroundColor: isActive && "#e6e9ed",
      display: route?.invisible && "none",
    };

    return (
      <div
        className="m-2 p-2 rounded-lg hover:bg-[#0000000d] text-sm opacity-60 hover:opacity-100"
        style={style}
      >
        <Link to={`${path}/${returnElement.path}`}>{returnElement.name}</Link>
      </div>
    );
  });
};
