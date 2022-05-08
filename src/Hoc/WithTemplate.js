import React from "react";
import Template from "../pages/Template";

export default function withTemplate(props) {
  return <Template>{props.children}</Template>;
}
