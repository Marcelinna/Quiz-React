import React from "react";
import RadioQuestion from "../Questions/RadioQuestions";
import InputQuestion from "../Questions/InputQuestions";
import MultipleQuestion from "../Questions/MultipleQuestions";

const Questions = ({
  question,
  getRadioAnswer,
  radioChecked,
  inputValue,
  getInputValue,
  multipleChecked,
  getMultipleAnswer,
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
        ) : question.type === "input" ? (
          <InputQuestion
            question={question}
            inputValue={inputValue}
            getInputValue={getInputValue}
          />
        ) : question.type === "multiple" ? (
          <MultipleQuestion
            question={question}
            multipleChecked={multipleChecked}
            getMultipleAnswer={getMultipleAnswer}
          />
        ) : null}
      </div>
    </>
  );
};

export default Questions;
