import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";

export const CollectionGrid = styled(InfiniteScroll)`
  display: grid;
  overflow: hidden !important;
  grid-template-columns: 1fr 1fr;
  align-content: center;
  gap: ${(props) => props.theme.space[3]};
  justify-items: center;
  @media (min-width: 330px) {
    gap: ${(props) => props.theme.space[6]} ${(props) => props.theme.space[3]};
  }

  @media (min-width: 430px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const CollectionGridSkeleton = () => (
  <>
    <Skeleton title={null} paragraph={{ rows: 2 }} className="my-4" active />
    <div className="grid grid-cols-2 gap-2.5 justify-between my-2">
      <Skeleton.Image active style={{ width: "100%", height: 232 }} />
      <Skeleton.Image active style={{ width: "100%", height: 232 }} />
      <Skeleton.Image active style={{ width: "100%", height: 232 }} />
      <Skeleton.Image active style={{ width: "100%", height: 232 }} />
    </div>
  </>
);

export const CollectionGrid3ColSkeleton = () => (
  <>
    <div className="grid grid-cols-3 gap-1 justify-between my-1">
      <Skeleton.Image active style={{ width: "100%", height: 170 }} />
      <Skeleton.Image active style={{ width: "100%", height: 170 }} />
      <Skeleton.Image active style={{ width: "100%", height: 170 }} />
      <Skeleton.Image active style={{ width: "100%", height: 170 }} />
      <Skeleton.Image active style={{ width: "100%", height: 170 }} />
      <Skeleton.Image active style={{ width: "100%", height: 170 }} />
    </div>
  </>
);

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
