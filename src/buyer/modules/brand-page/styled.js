import styled from "styled-components";

export const BrandCard = styled.div`
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
