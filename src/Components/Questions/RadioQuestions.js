import React from "react";

const RadioQuestion = ({ question, getRadioAnswer, radioChecked }) => {
  return (
    <>
      <div className="question-text">{question.question}</div>
      <div className="radio-question">
        {question.answer.map((answ) => (
          <div className="radio-question__answer" key={Object.keys(answ)[0]}>
            <input
              className="radio-question__input"
              type="radio"
              id={Object.keys(answ)[0]}
              value={Object.values(answ)[0]}
              name={Object.keys(answ)[0]}
              checked={radioChecked === Object.values(answ)[0]}
              onChange={getRadioAnswer}
            />
            <label
              className="radio-question__label"
              htmlFor={Object.keys(answ)[0]}
            >
              {Object.values(answ)[0]}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default RadioQuestion;