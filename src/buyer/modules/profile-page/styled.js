import styled from "styled-components";
import { Button } from "antd";

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.space[5]};
  margin: ${(props) => props.theme.space[5]};
  margin-top: -20%;
  border-radius: ${(props) => props.theme.borderRadius[2]};
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 4px 16px rgba(41, 41, 41, 0.05);
  border: 1px solid rgba(41, 41, 41, 0.12);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.05);
  }

  h2 {
    font-weight: ${(props) => props.theme.fontWeights.semibold};
    margin: ${(props) => props.theme.space[2]} 0px;
  }

  img {
    width: 56px;
    height: 56px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: ${(props) => props.theme.borderRadius[2]};
    margin-bottom: ${(props) => props.theme.space[3]};
  }

  p {
    font-size: ${(props) => props.theme.fontSizes[0]};
    font-weight: ${(props) => props.theme.fontWeights.semibold};
    margin: ${(props) => props.theme.space[2]};
    opacity: 0.5;
  }

  .ant-divider-horizontal {
    margin: ${(props) => props.theme.space[3]} 0px;
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

export const StyledNameContainer = styled(ProfileNameContainer)`
  display: block;
  padding: ${(props) => props.theme.space[4]} ${(props) => props.theme.space[5]};
  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin-top: -${(props) => props.theme.space[9]};
    border: 2px solid ${(props) => props.theme.bg.primary};
  }
  p {
    font-size: ${(props) => props.theme.fontSizes[2]};
    color: ${(props) => props.theme.text.light};
    margin: ${(props) => props.theme.space[2]} 0px;
    span {
      color: ${(props) => props.theme.text.dark};
      font-weight: ${(props) => props.theme.fontWeights.semibold};
      display: inline-block;
      margin: 0px ${(props) => props.theme.space[1]};
    }
  }
  .name {
    h5 {
      margin: ${(props) => props.theme.space[4]} 0px;
    }
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const StyledButton = styled(Button)`
  padding: 0px ${(props) => props.theme.space[3]};
  box-shadow: none;
  span{
    font-size: ${(props) => props.theme.fontSizes[1]};
  }
`;
