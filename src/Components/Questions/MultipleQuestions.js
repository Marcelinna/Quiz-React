import React from "react";

const MultipleQuestion = ({ question, multipleChecked, getMultipleAnswer }) => {
  return (
    <>
      <div className="question-text">{question.question}</div>
      <div className="multiple-question">
        <input
          className="multiple-question__input"
          type="checkbox"
          name="a"
          value={question.answer[0].a}
          checked={multipleChecked.a}
          onChange={getMultipleAnswer}
        />

        <label className="multiple-question__label" htmlFor="a">{question.answer[0].a}</label>

        <input
          className="multiple-question__input"
          type="checkbox"
          name="b"
          value={question.answer[1].b}
          checked={multipleChecked.b}
          onChange={getMultipleAnswer}
        />
        <label className="multiple-question__label" htmlFor="b">{question.answer[1].b}</label>

        <input
          className="multiple-question__input"
          type="checkbox"
          name="c"
          value={question.answer[2].c}
          checked={multipleChecked.c}
          onChange={getMultipleAnswer}
        />

        <label className="multiple-question__label" htmlFor="c">{question.answer[2].c}</label>
      </div>
    </>
  );
};

export default MultipleQuestion;
