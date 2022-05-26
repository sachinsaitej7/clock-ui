import React from "react";
import styled from "styled-components";

const Tag = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.32);
  border-radius: 2px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.active ? props.theme.text.white : props.theme.text.black};
  background-color: ${(props) =>
    props.active ? props.theme.bg.primary : props.theme.bg.default};
  font-size: ${(props) => props.theme.fontSizes[1]};
  font-weight: ${(props) => props.theme.fontWeights.normal};
`;

const VariantTag = ({ title, active, onClick = () => {} }) => {
  return (
    <Tag active={active} onClick={onClick}>
      {title}
    </Tag>
  );
};

export default VariantTag;
