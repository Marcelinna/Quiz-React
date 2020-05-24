import React from "react";

const RadioQuestion = ({ question, getRadioAnswer, radioChecked }) => {
  return (
    <>
      <div className="question-text">{question.question}</div>
      <div className="radio-question">
        <div className="radio-question__answer">
          <input
            className="radio-question__input"
            type="radio"
            value={question.answer[0].a}
            id="a"
            checked={radioChecked === question.answer[0].a}
            onChange={getRadioAnswer}
          />
          <label className="radio-question__label" htmlFor="a">
            {question.answer[0].a}
          </label>
        </div>
        <div className="radio-question__answer">
          <input
            className="radio-question__input"
            type="radio"
            value={question.answer[1].b}
            id="b"
            checked={radioChecked === question.answer[1].b}
            onChange={getRadioAnswer}
          />
          <label className="radio-question__label" htmlFor="b">
            {question.answer[1].b}
          </label>
        </div>
      </div>
    </>
  );
};

export default RadioQuestion;
