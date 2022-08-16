import React from "react";
import styled, { useTheme } from "styled-components";

//images
import { ReactComponent as MinusIcon } from "../../assets/common/minus.svg";
import { ReactComponent as PlusIcon } from "../../assets/common/plus.svg";
import separator from "../../utils/numberWithCommas";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  .left-container {
    margin-right: ${(props) => props.theme.space[5]};
    display: flex;
    align-items: center;
    flex-direction: column;
    img {
      width: 104px;
      height: 141px;
      cursor: pointer;
    }
  }

  .right-container {
    margin-top: ${(props) => props.theme.space[2]};
    h3 {
      font-size: ${(props) => props.theme.fontSizes[3]};
      line-height: 24px;
      letter-spacing: 0.01612em;
    }
    .price {
      font-size: ${(props) => props.theme.fontSizes[3]};
      font-weight: ${(props) => props.theme.fontWeights.semibold};
      line-height: 24px;
      margin-bottom: ${(props) => props.theme.space[4]};
    }
    .variant {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 195px;
      p {
        font-weight: ${(props) => props.theme.fontWeights.medium};
        margin-bottom: ${(props) => props.theme.space[4]};
        margin-right: ${(props) => props.theme.space[4]};
        span {
          font-weight: ${(props) => props.theme.fontWeights.normal};
        }
      }
    }
  }
`;

const Counter = styled.div`
  display: flex;
  border-radius: ${(props) => props.theme.borderRadius[1]};
  padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[3]}`};
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.5);
  width: 90px;
  margin-top: ${(props) => props.theme.space[4]};

  svg {
    cursor: pointer;
  }
`;

const ProductCardReview = ({
  thumbnail,
  nonEditable,
  removeItem = () => {},
  changeQuantity = () => {},
  onClick = () => {},
  ...rest
}) => {
  const theme = useTheme();
  const item = { ...rest, thumbnail };
  return (
    <Container>
      <div className="left-container">
        <img src={thumbnail} alt="product" onClick={onClick}></img>
        {!nonEditable && (
          <Counter>
            <MinusIcon onClick={() => changeQuantity(item, false)} />
            <p>{item.quantity}</p>
            <PlusIcon onClick={() => changeQuantity(item, true)} />
          </Counter>
        )}
      </div>
      <div className="right-container">
        <h3>{item.name}</h3>
        {!nonEditable ? (
          <p
            style={{
              color: "green",
              fontSize: theme.fontSizes[1],
              lineHeight: "18px",
              marginBottom: theme.space[3],
            }}
          >
            In Stock
          </p>
        ) : (
          <p>Sold by : {item.brand.name}</p>
        )}
        <p className="price">Rs. {separator(item.price)}</p>
        <div className="variant">
          <p>
            Colour:{" "}
            <span>{item.selectedColorVariant?.variant_name || "NA"}</span>,
          </p>
          <p>
            Size: <span>{item.selectedSizeVariant?.variant_name || "NA"}</span>
          </p>
        </div>
        {!nonEditable && (
          <p
            style={{
              color: "#DE5D5D",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => removeItem(item)}
          >
            Delete
          </p>
        )}
      </div>
    </Container>
  );
};

export default ProductCardReview;
