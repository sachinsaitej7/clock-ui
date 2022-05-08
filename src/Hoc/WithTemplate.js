import React from "react";
import Template from "../Pages/Template";

export default function withTemplate(props) {
  return <Template>{props.children}</Template>;
}
