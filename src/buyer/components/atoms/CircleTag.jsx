import React from "react";
import styled from "styled-components";

const Tag = styled.div`
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  padding: ${(props) => props.theme.space[4]};
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.active ? props.theme.text.white : props.theme.text.primary};
  background-color: ${(props) =>
    props.active ? props.theme.bg.primary : props.theme.bg.default};
  font-size: ${(props) => props.theme.fontSizes[1]};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  line-height: 18px;
`;

const CircleTag = ({ title, active, onClick = () => {}, style = {} }) => {
  return (
    <Tag active={active} onClick={onClick} style={style}>
      {title}
    </Tag>
  );
};

export default CircleTag;
