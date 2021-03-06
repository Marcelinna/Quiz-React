import React from "react";

const Result = ({ getResult, questions }) => {
  return (
    <div className="result-count">
      <span className="result-count__text">Twój Wynik:</span>
      {getResult()}/{questions.length}
    </div>
  );
};

export default Result;
