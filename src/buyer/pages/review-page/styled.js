import styled from "styled-components";
import { Button } from "antd";

export const StyledButton = styled(Button)`
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[4]}`};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  height: 42px;

  span {
    font-size: ${(props) => props.theme.fontSizes[3]};
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
`;
