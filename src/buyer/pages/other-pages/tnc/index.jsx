import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import DocumentViewer from "../../../components/DocumentViewer";
import { Collapse } from "antd";

const { Panel } = Collapse;

const StatePathMap = {
  1: "./ClockTnC.pdf",
  2: "./ClockPrivacyPolicy.pdf",
  3: "./ReturnRefund&Shipping.pdf",
  4: "./ContactInformation.pdf",
};

const Container = styled.div`
  width: 100%;
  min-height: 500px;
  padding: ${(props) => props.theme.space[5]};
`;

const renderDocumentViewer = (path) => {
  return <DocumentViewer path={path} />;
};

const TnCPages = () => {
  const theme = useTheme();
  const [activeKey, setActiveKey] = useState("1");
  const [searchParams] = useSearchParams();
  const tabNumber = searchParams.get("tab");

  useEffect(() => {
    tabNumber && setActiveKey(tabNumber);
  }, [tabNumber]);

  return (
    <Container>
      <Collapse
        defaultActiveKey={[activeKey]}
        activeKey={[activeKey]}
        onChange={(key) => setActiveKey(key)}
        style={{ borderRadius: theme.borderRadius[2] }}
        destroyInactivePanel={true}
        accordion={true}
      >
        <Panel header="Terms & Conditions" key="1">
          {renderDocumentViewer(StatePathMap["1"])}
        </Panel>
        <Panel header="Privacy Policy" key="2">
          {renderDocumentViewer(StatePathMap["2"])}
        </Panel>
        <Panel header="Return & Refund" key="3">
          {renderDocumentViewer(StatePathMap["3"])}
        </Panel>
        <Panel header="Contact Information" key="4">
          {renderDocumentViewer(StatePathMap["4"])}
        </Panel>
      </Collapse>
    </Container>
  );
};

TnCPages.propTypes = {};

export default TnCPages;
