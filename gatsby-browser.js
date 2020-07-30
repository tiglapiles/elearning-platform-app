import React from "react";
import { navigate } from "gatsby";
import { isMobile } from "react-device-detect";
import urlParse from "url-parse";
import prevHref from "./src/services/prevHref";

// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
  const RedirPath = ["/", "search", "watch"];

  if (RedirPath.includes(location.pathname) && isMobile) {
    // location.pathname === "/watch/" &&
    //   navigate(`/phoneplayvid=${urlParse(location.href, true).query.vid}`);
    // location.pathname === "/" && navigate("/phone");
    // location.pathname === "/search/" && navigate("/phonesearch");
  }

  if (prevLocation) {
    prevHref.set(prevLocation.href);
  }
};
