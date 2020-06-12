import React from "react";

const DragAndDropQuestion = ({
  question,
  dragDrop,
  dragOver,
  dragStart,
  touchMove,
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
          {question.answer.map((el, index) => (
            <div
              className="draganddrop-questions__answer"
              key={index}
              id={index}
              data-value={el}
              draggable="true"
              onTouchMove={touchMove}
              onDragStart={dragStart}
            >
              {el}
            </div>
          ))}
        </div>
        <span className="draganddrop-question__message">
          przeciągnij prawidłową odpowiedź
        </span>
      </div>
    </>
  );
};

export default DragAndDropQuestion;
