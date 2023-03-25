import React from "react";
import { useSearchParams } from "react-router-dom";
import { App } from "antd";

import { useProduct } from "../hooks";
import { ArrowUpTrayIcon } from "@assets/icons";
import { handleShare, getProductShareData } from "../utils";

const ShareIcon = () => {
  const { message } = App.useApp();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [product] = useProduct(id);

  const handleClick = async () => {
     getProductShareData(product).then((data) =>
       handleShare(data, (text) => {
         message.success(text);
       })
     );
  };

  if (!product) return null;

  return (
    <ArrowUpTrayIcon
      width="24px"
      className="cursor-pointer"
      onClick={handleClick}
    />
  );
};

export default ShareIcon;
