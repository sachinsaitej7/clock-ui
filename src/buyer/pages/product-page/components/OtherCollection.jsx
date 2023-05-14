import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { Skeleton } from "antd";

import { useProduct, useProductsByBrand } from "../hooks";

const OtherCollection = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [product, loading] = useProduct(id);
  const [products, loadingProducts] = useProductsByBrand(product?.brand?.id);

  if (loading || loadingProducts)
    return (
      <>
        <Skeleton
          active
          className='my-4'
          paragraph={{ rows: 1 }}
          title={null}
        />
        <div className='grid grid-cols-3 gap-1 overflow-x-auto'>
          <Skeleton.Image
            active
            // style={{ width: 104, height: 136 }}
            className='rounded h-40 w-full object-cover'
          />
          <Skeleton.Image
            active
            // style={{ width: 104, height: 136 }}
            className='rounded h-40 w-full object-cover'
          />
          <Skeleton.Image
            active
            // style={{ width: 104, height: 136 }}
            className='rounded h-40 w-full object-cover'
          />
        </div>
      </>
    );

  if (!product?.brand || !products) return null;

  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <p>Other products from {product.brand.name}</p>
        <Link
          to={`/brand-page/${product.brand.name}?id=${product.brand.id}`}
          style={{
            color: theme.text.primary,
            fontSize: theme.fontSizes[1],
            fontWeight: theme.fontWeights.semibold,
          }}
        >
          Visit Store
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2 overflow-x-auto">
        {products
          .filter((i) => i.id !== id)
          .slice(0, 3)
          .map((i) => (
            <Link to={`/product-page/${i.name}?id=${i.id}`} key={i.id}>
              <img
                src={i.thumbnail}
                alt={i.name}
                className="rounded h-36 w-full object-cover"
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default OtherCollection;
