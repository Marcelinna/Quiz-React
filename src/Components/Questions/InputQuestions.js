import React from "react";

const InputQuestion = ({ question, inputValue, getInputValue }) => {
  return (
    <>
      <div className="question-text">{question.question}</div>
      <div className="input-question">
        <input
          className="input-question__input"
          type="text"
          maxLength="20"
          onChange={getInputValue}
          value={inputValue}
        />
      </div>
    </>
  );
};

export default InputQuestion;
