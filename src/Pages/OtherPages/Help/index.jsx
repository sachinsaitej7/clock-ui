import React, { Component } from "react";
import "./style.scss";
import QA from "../../../components/QA/index";
const QaPair = [
  {
    Question: "How do I place a order in different stores?",
    Answer: `Nulla sed purus augue, eu euismod tellus. Nam mattis eros nec mi sagittis sagittis. Vestibulum suscipit cursus bibendum. Integer at justo eget sem auctor auctor eget vitae arcu. Nam tempor malesuada porttitor. Nulla quis dignissim ipsum. Aliquam pulvinar iaculis justo, sit amet interdum sem hendrerit vitae. Vivamus vel erat tortor. Nulla facilisi. In nulla quam, lacinia eu aliquam ac, aliquam in nisl. Vivamus et sapien ante. Suspendisse potenti. Fusce in tellus est, ac consequat lacus. Nulla risus massa, commodo in imperdiet ut, ornare in leo. Duis pellentesque sagittis lorem, sed mollis lorem venenatis id.

      1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      2. Maecenas ullamcorper est et massa mattis condimentum.
      3. Vestibulum sed massa vel ipsum imperdiet malesuada id tempus nisl.
      4. Etiam nec massa et lectus faucibus ornare congue in nunc.
      5. Mauris eget diam magna, in blandit turpis.
      
      In cursus faucibus tortor eu vestibulum. Ut eget turpis ac justo porta varius. Donec vel felis ante, ac vehicula ipsum. Quisque sed diam metus. Quisque eget leo sit amet erat varius rutrum vitae dapibus lectus. Vivamus et sapien ante. Suspendisse potenti. Fusce in tellus est, ac consequat lacus. Nulla risus massa, commodo in imperdiet ut, ornare in leo. Duis pellentesque sagittis lorem, sed mollis lorem venenatis id.`,
  },
  {
    Question: "How do I place a order in different stores?",
    Answer:
      "Nulla sed purus augue eu euismod tellus. Nam mattis eros nec mi sagittis sagittis. Vestibulum suscipit cursus bibendum. Integer at justo eget sem auctor auctor eget vitae arcu. Nam tempor malesuada porttitor. Nulla quis dignissim ipsum. Aliquam pulvinar iaculis justo, sit amet interdum sem hendrerit vitae. Vivamus vel erat tortor. Nulla facilisi. In nulla quam, lacinia eu aliquam ac, aliquam in nisl. Vivamus et sapien ante. Suspendisse potenti. Fusce in tellus est, ac consequat lacus. Nulla risus massa, commodo in imperdiet ut, ornare in leo. Duis pellentesque sagittis lorem, sed mollis lorem venenatis id. 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit Nulla sed purus augue eu euismod tellus. Nam mattis eros nec mi sagittis sagittis. Vestibulum suscipit cursus bibendum. Integer at justo eget sem auctor auctor eget vitae arcu. Nam tempor malesuada porttitor. Nulla quis dignissim ipsum. Aliquam pulvinar iaculis justo, sit amet interdum sem hendrerit vitae. Vivamus vel erat tortor. Nulla facilisi. In nulla quam, lacinia eu aliquam ac, aliquam in nisl. Vivamus et sapien ante. Suspendisse potenti. Fusce in tellus est, ac consequat lacus. Nulla risus massa, commodo in imperdiet ut, ornare in leo. Duis pellentesque sagittis lorem, sed mollis lorem venenatis id. 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    Question: "How do I place a order in different stores?",
    Answer: "Answer",
  },
  {
    Question: "How do I place a order in different stores?",
    Answer: "Answer",
  },
  {
    Question: "How do I place a order in different stores?",
    Answer: "Answer",
  },
  {
    Question: "How do I place a order in different stores?",
    Answer: "Answer",
  },
  {
    Question: "How do I place a order in different stores?",
    Answer: "Answer",
  },
];
class Help extends Component {
  render() {
    return (
      <div>
        <h1>Are you looking for help?</h1>
        <h4>
          Our most frequently asked questions (FAQ) are listed below. If you
          cannot find an answer here, please contact us.
        </h4>
        {QaPair.map((Data, index) => (
          <QA key={index} Question={Data.Question} Answer={Data.Answer} />
        ))}
        <div className="bottom">Still have a question?</div>
        <div className="desctext">
          In case of an unanswered question in our FAQ section, you can always
          contact us.
          <br /> We will respond to you very soon!
        </div>
        <div className="contactUsBtn">
          <div className="btnText">Contact US</div>
        </div>
      </div>
    );
  }
}

export default Help;
