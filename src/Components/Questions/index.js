import React from "react";
import RadioQuestion from "../Questions/RadioQuestions";
import InputQuestion from "../Questions/InputQuestions";

const Questions = ({
  question,
  getRadioAnswer,
  radioChecked,
  inputValue,
  getInputValue,
}) => {
  return (
    <>
      <div className="questions-wrapper">
        {question.type === "radio" ? (
          <RadioQuestion
            question={question}
            getRadioAnswer={getRadioAnswer}
            radioChecked={radioChecked}
          />
        ) : (
          <InputQuestion
            question={question}
            inputValue={inputValue}
            getInputValue={getInputValue}
          />
        )}
      </div>
    </>
  );
};

export default Questions;