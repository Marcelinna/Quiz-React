import React from "react";
import RadioQuestion from "../Questions/RadioQuestions";
import InputQuestion from "../Questions/InputQuestions";
import MultipleQuestion from "../Questions/MultipleQuestions";
import DragAndDropQuestion from "../Questions/DragAndDropQuestions";

const Questions = ({
  question,
  getRadioAnswer,
  radioChecked,
  inputValue,
  getInputValue,
  formError,
  multipleChecked,
  getMultipleAnswer,
  dragDrop,
  dragStart,
  dragOver,
}) => {
  return (
    <>
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
          formError={formError}
        />
      ) : question.type === "multiple" ? (
        <MultipleQuestion
          question={question}
          multipleChecked={multipleChecked}
          getMultipleAnswer={getMultipleAnswer}
        />
      ) : (
        <DragAndDropQuestion
          question={question}
          dragDrop={dragDrop}
          dragStart={dragStart}
          dragOver={dragOver}
        />
      )}
    </>
  );
};

export default Questions;
