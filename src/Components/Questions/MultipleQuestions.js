import React from "react";

const MultipleQuestion = ({ question, multipleChecked, getMultipleAnswer }) => {
  return (
    <>
      <div className="question-text">{question.question}</div>
      <div className="multiple-question">
        {question.answer.map((el, index) => (
          <div className="multiple-question__answer" key={index}>
            <label className="multiple-question__label">
              <input
                className="multiple-question__input"
                type="checkbox"
                value={el}
                name={index}
                checked={multipleChecked[index]}
                onChange={getMultipleAnswer}
              />
              {el}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default MultipleQuestion;

