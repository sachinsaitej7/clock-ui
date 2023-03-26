import styled from "styled-components";
import { Button, Input, Tag, Card } from "antd";

export const PageContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 120px);
  font-family: ${(props) => props.theme.fonts.primary};
  background-color: ${(props) => props.theme.bg.white};
  padding: ${(props) => props.theme.space[0] + " " + props.theme.space[5]};
`;

export const StyledButton = styled(Button)`
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[4]}`};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 42px;
  span {
    font-size: ${(props) => props.theme.fontSizes[3]};
    line-height: 120%;
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
`;

export const StyledInput = styled(Input)`
  width: 100%;
  border: 1px solid rgba(41, 41, 41, 0.32);
  height: 40px;
  border-radius: ${(props) =>
    props.borderRadius || props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[4]} ${props.theme.space[5]}`};
  :placeholder-shown {
    font-size: ${(props) => props.theme.fontSizes[1]};
    line-height: 16px;
  }
`;

export const StyledStickyContainer = styled.div`
  width: 100%;
  overflow: hidden;
  max-width: 768px;
  position: fixed;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bg.default};
  padding: ${(props) => `${props.theme.space[5]}`};
  box-shadow: 0px -2px 12px rgba(0, 0, 0, 0.08);
  bottom: 50px;
  left: 50%;
  margin-left: -50%;
  z-index: 100;

  @media (min-width: 769px) {
    left: -10%;
    margin-left: 20%;
  }

  @media (min-width: 1025px) {
    left: -50%;
    margin-left: 50%;
  }
`;

export const StyledStickyFloater = styled.div`
  width: 45px;
  height: 45px;
  overflow: hidden;
  position: fixed;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bg.default};
  padding: ${(props) => `${props.theme.space[0]}`};
  box-shadow: 0px -2px 12px rgba(0, 0, 0, 0.08);
  bottom: ${(props) => props.theme.space[9]};
  right: ${(props) => props.theme.space[4]};
  z-index: 100;
  border-radius: 50%;

  @media (min-width: 769px) {
    left: -10%;
    margin-left: 20%;
  }

  @media (min-width: 1025px) {
    left: -50%;
    margin-left: 50%;
  }
`;

export const ProfileNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  img {
    width: 56px;
    height: 56px;
    border-radius: ${(props) => props.theme.borderRadius[2]};
  }
`;

export const StyledCard = styled(Card)`
  width: 100%;
  margin-top: ${(props) => props.theme.space[7]};
  border: 1px solid rgba(41, 41, 41, 0.24);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  .ant-card-head,
  .ant-card-body {
    padding: ${(props) => props.theme.space[5]};
  }
  .ant-card-head-title {
    font-size: ${(props) => props.theme.fontSizes[3]};
    font-weight: ${(props) => props.theme.fontWeights.semibold};
    padding: ${(props) => props.theme.space[0]};
  }
  .ant-card-body .ant-typography {
    opacity: 0.8;
    color: ${(props) => props.theme.text.dark};
  }
`;

export const StyledTag = styled(Tag)`
  margin: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[2] + " " + props.theme.space[3]};
  border-radius: ${(props) => props.theme.borderRadius[3]};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-size: ${(props) => props.theme.fontSizes[2]};
  line-height: 14px;
`;
