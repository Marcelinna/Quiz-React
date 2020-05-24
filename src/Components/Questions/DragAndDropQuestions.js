import React from "react";

const DragAndDropQuestion = ({
  question,
  dragDrop,
  dragOver,
  dragStart,
  touchMove
}) => {
  return (
    <>
      <div className="question-text">{question.question}</div>

      <div className="draganddrop-question">
        <div
          className="draganddrop-questions__user-answer-container"
          onDragOver={dragOver}
          onDrop={dragDrop}
        ></div>

        <div
          className="draganddrop-questions__answer-container"
          onDragOver={dragOver}
          onDrop={dragDrop}
        >
          <div
            className="draganddrop-questions__answer"
            id="a"
            data-value={question.answer[0].a}
            draggable="true"
            onTouchMove={touchMove}
            onDragStart={dragStart}
          >
            {question.answer[0].a}
          </div>

          <div
            className="draganddrop-questions__answer"
            id="b"
            data-value={question.answer[1].b}
            draggable="true"
            onTouchMove={touchMove}
            onDragStart={dragStart}
          >
            {question.answer[1].b}
          </div>

          <div
            className="draganddrop-questions__answer"
            id="c"
            data-value={question.answer[2].c}
            draggable="true"
            onTouchMove={touchMove}
            onDragStart={dragStart}
          >
            {question.answer[2].c}
          </div>
        </div>
        <span className="draganddrop-question__message">
          przeciągnij prawidłową odpowiedź
        </span>
      </div>
    </>
  );
};

export default DragAndDropQuestion;
