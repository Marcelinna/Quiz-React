import React from "react";
import RadioQuestion from "../Questions/RadioQuestions";

const Questions = ({ question, getRadioAnswer, radioChecked }) => {
  return (
    <>
      <div className="questions-wrapper">
        <RadioQuestion
          question={question}
          getRadioAnswer={getRadioAnswer}
          radioChecked={radioChecked}
        />
      </div>
    </>
  );
};

export default Questions;