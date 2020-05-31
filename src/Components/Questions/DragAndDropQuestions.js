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
          {question.answer.map((answ) => (
            <div
              className="draganddrop-questions__answer"
              key={Object.keys(answ)[0]}
              id={Object.keys(answ)[0]}
              data-value={Object.values(answ)[0]}
              draggable="true"
              onTouchMove={touchMove}
              onDragStart={dragStart}
            >
              {Object.values(answ)[0]}
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
