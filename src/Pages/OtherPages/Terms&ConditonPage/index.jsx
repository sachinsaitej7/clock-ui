import React, { Component } from "react";
import { useState } from "react";
import { Document, Page } from "react-pdf";

import "./style.scss";
const [numPages, setNumPages] = useState(null);
const [pageNumber] = useState(1);

class TermsandConditionsPage extends Component {
  onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  render() {
    return (
      <div>
        <Document
          file="./myfile.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}

export default TermsandConditionsPage;
