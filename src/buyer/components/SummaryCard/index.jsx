import React from "react";
import styled, { useTheme } from "styled-components";
import { getSummaryData, formatCurrency } from "@buyer/utils";

const Container = styled.div`
  width: 100%;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => props.theme.space[5]};
  h4 {
    font-size: ${(props) => props.theme.fontSizes[3]};
    line-height: 24px;
    margin-bottom: ${(props) => props.theme.space[7]};
  }
  .item {
    display: flex;
    align-items: start;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.space[5]};
    font-size: ${(props) => props.theme.fontSizes[2]};
    line-height: 18px;
  }
`;
const SummaryCard = ({ items }) => {
  const theme = useTheme();
  const { total, totalDiscount } = getSummaryData(items);
  return (
    <Container>
      <h4>Order Summary</h4>
      <div className="item">
        <p>Total Original Price </p>
        <p>{formatCurrency(total)}</p>{" "}
      </div>
      <div className="item">
        <p>Discount </p>
        <p>{formatCurrency(totalDiscount)}</p>{" "}
      </div>
      <div className="item">
        <p>Delivery</p>
        <p style={{ color: "#219653" }}>Free</p>
      </div>
      <div className="item" style={{ fontWeight: theme.fontWeights.bold }}>
        <div>
          <p>Final Price</p>
          <p
            style={{
              fontWeight: theme.fontWeights.normal,
              fontSize: theme.fontSizes[1],
              color: theme.text.light,
              marginTop: theme.space[2],
            }}
          >
            (inclusive of all taxes)
          </p>
        </div>
        <p>{formatCurrency(total)}</p>
      </div>
    </Container>
  );
};

export default SummaryCard;
