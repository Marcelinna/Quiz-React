import React from "react";

const InputQuestion = ({ question, inputValue, getInputValue,formError }) => {

  
  return (
    <>
      <div className="question-text">{question.question}</div>
      <div className="input-question">
        <div className="input-question__answer">
        <input
          className="input-question__input"
          type="text"
          maxLength="20"
          onChange={getInputValue}
          value={inputValue}
        />
        </div>
         {formError !==""&&<span className="input-question__error">{formError}</span>}
      </div>
     
    </>
  );
};

export default InputQuestion;
