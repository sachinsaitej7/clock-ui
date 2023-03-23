import React from "react";
import { useTheme } from "styled-components";
import { useSearchParams } from "react-router-dom";
import { Skeleton, Typography } from "antd";

import { formatCurrency } from "@buyer/utils";
import { useProduct } from "../hooks";

const { Text, Paragraph } = Typography;

const ProductDetails = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [product, loading] = useProduct(searchParams.get("id"));

  if (loading) return <Skeleton active className="my-4" />;
  if (!product) return null;

  return (
    <div>
      <div className="flex justify-between my-1">
        <p className="font-semibold">{product.brand.name}</p>
        {/* <Link
          to={`/brand-page/${product.brand.name}?id=${product.brand.id}`}
          style={{
            fontSize: theme.fontSizes[2],
            fontWeight: theme.fontWeights.semibold,
          }}
          className='text-primary'
        >
          Visit Store
        </Link> */}
      </div>
      <div className="my-1">
        <Paragraph
          ellipsis={{
            rows: 2,
            expandable: true,
            symbol: <Text className="text-primary text-xs">View more</Text>,
          }}
          style={{ color: theme.text.light, fontSize: theme.fontSizes[2] }}
        >
          <span className="uppercase text-base">{product.name}</span>
          <br />
          <span>{product.description}</span>
          <br />
          <span>{product.tags?.map((i) => `# ${i} `)}</span>
        </Paragraph>
      </div>
      <div style={{ color: theme.text.light }}>
        <span style={{ fontSize: theme.fontSizes[2] }}>MRP: </span>
        <span className="font-semibold text-black text-xl">
          {formatCurrency(product.price.currentPrice)}
        </span>
        <p style={{ fontSize: theme.fontSizes[0] }}>(Inclusive of all taxes)</p>
      </div>
    </div>
  );
};

export default ProductDetails;
