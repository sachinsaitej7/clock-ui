import React from "react";
import styled from "styled-components";
import { Tabs } from "antd";

import { OrderSummary, Shipping, Payment } from "./components";
import { SummaryProvider, useSummaryContext } from "./store/SummaryProvider";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px ${(props) => props.theme.space[5]};
  overflow-x: hidden;
`;

const TabHeader = ({ name, id }) => {
  return (
    <div className="w-full flex justify-center items-center text-black px-2 py-2">
      <p className="w-[18px] h-[18px] text-xs p-0.5 text-center	bg-black text-white rounded-full mr-1">
        {id}
      </p>
      <span className="text-xs">{name}</span>
    </div>
  );
};

const items = [
  {
    key: "1",
    label: <TabHeader name="Summary" id="1" />,
    children: <OrderSummary />,
  },
  {
    key: "2",
    label: <TabHeader name="Shipping" id="2" />,
    children: <Shipping />,
  },
  {
    key: "3",
    label: <TabHeader name="Payment" id="3" />,
    children: <Payment />,
  },
];

const ReviewContainer = () => {
  const { activeTab, setActiveTab,  } = useSummaryContext();

  const handleTabClick = (key) => {
    if (key === "3")
      return;
    setActiveTab(key);
  };

  return (
    <Container>
      <Tabs
        size='small'
        centered
        tabBarGutter={36}
        className='w-full'
        items={items}
        onTabClick={handleTabClick}
        activeKey={activeTab}
      />
    </Container>
  );
};

const ReviewPage = () => (
  <SummaryProvider>
    <ReviewContainer />
  </SummaryProvider>
);

export default ReviewPage;
