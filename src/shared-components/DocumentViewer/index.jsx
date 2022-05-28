import React, { useState } from "react";
import styled from "styled-components";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

export default function DocumentViewer({ path }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <Container>
      <div className="doc-content">
        <Document
          file={path}
          onLoadSuccess={onDocumentLoadSuccess}
          options={{
            cMapUrl: "cmaps/",
            cMapPacked: true,
            standardFontDataUrl: "standard_fonts/",
          }}
        >
          {numPages ? (
            Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                width={window.innerWidth - 50}
                pageNumber={index + 1}
              />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </Document>
      </div>
      <div className="doc-footer">
        <p>Total {numPages} pages</p>
      </div>
    </Container>
  );
}
