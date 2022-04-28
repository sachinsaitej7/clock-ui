import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.scss";

class QA extends Component {
  constructor(props) {
    super(props);
    this.state = { answerVisible: false };
  }
  render() {
    const { Question, Answer } = this.props;
    return (
      <div className="array">
        <div className="singleComp">
          <div className="question">
            <div className="qsn">
              <text
                className={this.state.answerVisible ? "clicked" : "notclicked"}
              >
                {Question}
              </text>
            </div>
            <div className="btn" onClick={this.showAnswer}>
              {this.state.answerVisible ? <div>&#8211;</div> : <div>+</div>}
            </div>
          </div>
          {this.state.answerVisible ? (
            <pre className="answer">{Answer}</pre>
          ) : null}
        </div>
      </div>
    );
  }
  showAnswer = () => {
    this.setState((prevState) => ({
      answerVisible: !prevState.answerVisible,
    }));
  };
}
QA.propTypes = {
  Question: PropTypes.string.isRequired,
  Answer: PropTypes.string.isRequired,
};
export default QA;
