import React from "react";

const MultipleQuestion = ({ question, multipleChecked, getMultipleAnswer }) => {
  return (
    <>
      <div className="question-text">{question.question}</div>
      <div className="multiple-question">
        <div className="multiple-question__answer">
          <input
            className="multiple-question__input"
            type="checkbox"
            name="a"
            id="a"
            value={question.answer[0].a}
            checked={multipleChecked.a}
            onChange={getMultipleAnswer}
          />

          <label className="multiple-question__label" htmlFor="a">
            {question.answer[0].a}
          </label>
        </div>

        <div className="multiple-question__answer">
          <input
            className="multiple-question__input"
            type="checkbox"
            name="b"
            id="b"
            value={question.answer[1].b}
            checked={multipleChecked.b}
            onChange={getMultipleAnswer}
          />
          <label className="multiple-question__label" htmlFor="b">
            {question.answer[1].b}
          </label>
        </div>

        <div className="multiple-question__answer">
          <input
            className="multiple-question__input"
            type="checkbox"
            name="c"
            id="c"
            value={question.answer[2].c}
            checked={multipleChecked.c}
            onChange={getMultipleAnswer}
          />

          <label className="multiple-question__label" htmlFor="c">
            {question.answer[2].c}
          </label>
        </div>
      </div>
    </>
  );
};

export default MultipleQuestion;
