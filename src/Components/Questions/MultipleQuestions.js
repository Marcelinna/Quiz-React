import React from "react";

const MultipleQuestion = ({ question, multipleChecked, getMultipleAnswer }) => {
  return (
    <>
      <div className="question-text">{question.question}</div>
      <div className="multiple-question">
        {question.answer.map((answ) => (
          <div className="multiple-question__answer" key={Object.keys(answ)[0]}>
            <input
              className="multiple-question__input"
              type="checkbox"
              id={Object.keys(answ)[0]}
              name={Object.keys(answ)[0]}
              value={Object.values(answ)[0]}
              checked={multipleChecked[Object.keys(answ)[0]]}
              onChange={getMultipleAnswer}
            />

            <label className="multiple-question__label" htmlFor={Object.keys(answ)[0]}>
              {Object.values(answ)[0]}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default MultipleQuestion;

