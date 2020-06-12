import React from "react";

const RadioQuestion = ({ question, getRadioAnswer, radioChecked }) => {
  return (
    <>
      <div className="question-text">{question.question}</div>
      <div className="radio-question">
        {question.answer.map((el, index) => (
          <div className="radio-question__answer" key={index}>
            <label className="radio-question__label">
              <input
                className="radio-question__input"
                type="radio"
                value={el}
                name={index}
                checked={radioChecked === el}
                onChange={getRadioAnswer}
              />
                {el}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default RadioQuestion;