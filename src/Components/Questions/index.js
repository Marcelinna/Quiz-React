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
  touchMove,
}) => {
  return (
    <>
      {question.type === "radio" ? (
        <RadioQuestion {...{ question, getRadioAnswer, radioChecked }} />
      ) : question.type === "input" ? (
        <InputQuestion
          {...{ question, inputValue, getInputValue, formError }}
        />
      ) : question.type === "multiple" ? (
        <MultipleQuestion
          {...{ question, getMultipleAnswer, multipleChecked }}
        />
      ) : (
        <DragAndDropQuestion
          {...{ question, dragDrop, dragStart, dragOver, touchMove }}
        />
      )}
    </>
  );
};

export default Questions;
