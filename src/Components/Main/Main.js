import React, { useState, useEffect } from "react";
import Questions from "../Questions/index";
import Progress from "../Progress/Progress";
import Result from "../Result/Result";
import Timer from "../Timer/Timer";
import { questions } from "../../Data/questions";
import { steps } from "../../Data/steps";
import { backgroundImage } from "../../Data/images";

const Main = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [userAnswers, setUserAnswers] = useState([]);

  const [radioChecked, setRadioChecked] = useState(false);
  const [radioAnswer, setRadioAnswer] = useState({});

  const [inputValue, setInputValue] = useState("");
  const [inputAnswer, setInputAnswer] = useState({});
  const [formError, setFormError] = useState("");

  const [multipleChecked, setMultipleChecked] = useState({
    0: false,
    1: false,
    2: false,
  });
  const [multipleAnswer, setMultipleAnswer] = useState(false);

  const [dragAndDrop, setDragAndDrop] = useState(false);

  const [previousStep, setPreviousStep] = useState(steps);
  const [currentStep, setCurrentStep] = useState(steps);

  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const [timerStan, setTimerStan] = useState(0);
  const [intervalTimer, setIntervalTimer] = useState();

  const [google, setGoogle] = useState([]);

  const question = questions[currentQuestion];

  const background = {
    backgroundImage: `url("Images/${backgroundImage[currentQuestion]}.jpg")`,
  };

  //Radio Questions: get user answer

  const getRadioAnswer = (e) => {
    const radioCheckedAnswer = { id: question.id, answer: e.target.value };
    setRadioChecked(e.target.value);
    setRadioAnswer(radioCheckedAnswer);
  };

  //Input Questions: get user answer, block number, and special characters

  const getInputValue = (e) => {
    const formValid = /^[a-zęóąśłżźćń]*$/;

    const currentInputValue = e.target.value.toLowerCase();

    if (!formValid.test(currentInputValue)) {
      setFormError("odpowiedź nie może zawierać cyfr i znaków specjalnych");
    } else {
      setInputValue(currentInputValue);
      setFormError("");
      const inputValueAnswer = { id: question.id, answer: e.target.value };
      setInputAnswer(inputValueAnswer);
    }
  };

  // Multiple Questions:get user answer

  const getMultipleAnswer = (e) => {
    const { checked, name } = e.target;

    setMultipleChecked({
      ...multipleChecked,
      [name]: checked,
    });

    const multipleCheckedAnswer = document.querySelectorAll(
      "input[type='checkbox']:checked"
    );

    const multipleAnswerArray = [...multipleCheckedAnswer].map(
      (checked) => checked.value
    );
    const multipleAnswerObj = { id: question.id, answer: multipleAnswerArray };
    setMultipleAnswer(multipleAnswerObj);
  };

  //DragAndDrop Question:get user answer

  //allow pick only one answer
  const handleDropedAnswer = (answer) => {
    const correctAnswerContainer = document.querySelector(
      ".draganddrop-questions__user-answer-container"
    );

    if (correctAnswerContainer.childNodes.length === 0) {
      correctAnswerContainer.appendChild(answer);
    } else {
      const dropedAnswer = correctAnswerContainer.firstChild;
      const answerContainer = answer.parentElement;
      correctAnswerContainer.replaceChild(answer, dropedAnswer);
      answerContainer.appendChild(dropedAnswer);
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const touchMove = (e) => {
    e.preventDefault();
    const touchLocation = e.targetTouches[0];
    const touchanswer = e.targetTouches[0].target;
    touchanswer.style.left = touchLocation.pageX + "px";
    touchanswer.style.top = touchLocation.pageY + "px";

    handleDropedAnswer(touchanswer);

    const chosenAnswer = { id: question.id, answer: touchanswer.dataset.value };
    setDragAndDrop(chosenAnswer);
  };

  const dragStart = (e) => {
    e.dataTransfer.setData("answer_id", e.target.id);
  };

  const dragDrop = (e) => {
    e.preventDefault();
    const answer_id = e.dataTransfer.getData("answer_id");
    const dragAnswer = document.getElementById(answer_id);

    handleDropedAnswer(dragAnswer);

    const chosenAnswer = { id: question.id, answer: dragAnswer.dataset.value };
    setDragAndDrop(chosenAnswer);
  };
  //return answer to right container
  const resetDragAndDropAnswer = () => {
    const dragDropBoards = document.querySelector(
      ".draganddrop-questions__answer-container"
    );
    const dragDropAnswers = document.querySelectorAll(
      ".draganddrop-questions__answer"
    );

    for (const answer of dragDropAnswers) {
      dragDropBoards.append(answer);
    }
  };

  //change of question, push all answers to array

  const changeQuestion = () => {
    if (
      radioChecked ||
      inputValue.trim() !== "" ||
      JSON.stringify(multipleChecked) !==
        JSON.stringify({
          0: false,
          1: false,
          2: false,
        }) ||
      dragAndDrop
    ) {
      setCurrentQuestion(currentQuestion + 1);
      updateProgress();
      resetDragAndDropAnswer();

      const radioAnswers = [...userAnswers, radioAnswer];
      const inputAnswers = [...userAnswers, inputAnswer];
      const multipleAnswers = [...userAnswers, multipleAnswer];
      const dragAndDropAnswers = [...userAnswers, dragAndDrop];

      if (question.type === "radio") {
        setUserAnswers(radioAnswers);
      }
      if (question.type === "input") {
        setUserAnswers(inputAnswers);
      }
      if (question.type === "multiple") {
        setUserAnswers(multipleAnswers);
      }
      if (question.type === "draganddrop") {
        setUserAnswers(dragAndDropAnswers);
      }

      setRadioChecked(false);
      setInputValue("");
      setMultipleChecked({
        0: false,
        1: false,
        2: false,
      });
      setDragAndDrop(false);
    }
    if (currentQuestion === 10) {
      stopTimer();
    }
  };

  //Progress

  const updateProgress = () => {
    const stepPrevious = (steps[currentQuestion] = {
      ...steps[currentQuestion],
      completed: true,
      selected: true,
    });

    setPreviousStep(stepPrevious);

    if (currentQuestion < 10) {
      const stepCurrent = (steps[currentQuestion + 1] = {
        ...steps[currentQuestion + 1],
        completed: false,
        selected: true,
      });

      setCurrentStep(stepCurrent);
    }
  };

  const resetSteps = () => {
    steps.forEach(function (step) {
      if (step.step === 1) {
        step.completed = false;
        step.selected = true;
      } else {
        step.completed = false;
        step.selected = false;
      }
    });
  };

  //Result

  const questionsArrayCopy = JSON.parse(JSON.stringify(questions));
  const answersArrayCopy = JSON.parse(JSON.stringify(userAnswers));

  questionsArrayCopy.forEach((element) => {
    if (typeof element.correct_answer === "object") {
      element.correct_answer = JSON.stringify(element.correct_answer);
    }
  });

  answersArrayCopy.forEach((element) => {
    if (typeof element.answer === "object") {
      element.answer = JSON.stringify(element.answer);
    }
  });

  /////Correct result count

  const getResult = () => {
    let countResult = [];

    for (let i = 0; i < questionsArrayCopy.length; i++) {
      if (questionsArrayCopy[i].correct_answer === answersArrayCopy[i].answer) {
        countResult.push(questionsArrayCopy[i]);
      }
    }
    return countResult.length;
  };

  ///// Display user correct and wrong answers

  const returnResult = () => {
    return answersArrayCopy.map((answer) => {
      const question = questionsArrayCopy.find(
        (question) => question.id === answer.id
      );

      //correct_answer - from questions
      //answer - from user answers

      if (question.correct_answer === answer.answer) {
        return (
          <div key={question.id} className="result-marked-answer">
            <div className="question-text">{question.question}</div>
            <div className="result-marked-answer__correct-answer">
              {question.correct_answer.replace(/[^a-zęóąśłżźćń]/gi, " ")}
            </div>
          </div>
        );
      }

      if (question.correct_answer !== answer.answer) {
        return (
          <div key={question.id} className="result-marked-answer">
            <div className="question-text">{question.question}</div>
            <div className="result-marked-answer__correct-answer">
              {question.correct_answer.replace(/[^a-zęóąśłżźćń]/gi, " ")}
            </div>
            <div className="result-marked-answer__correct-wrong">
              {answer.answer.replace(/[^a-zęóąśłżźćń]/gi, " ")}
            </div>
          </div>
        );
      }
    });
  };

  const displayCorrectAnswer = () => {
    setShowCorrectAnswer(!showCorrectAnswer);
  };

  //Timer

  useEffect(() => {
    setIntervalTimer(
      setInterval(() => {
        startTimer();
      }, 1000)
    );

    return () => clearInterval(intervalTimer);
  }, [timerStan]);

  const stopTimer = () => {
    setInterval(clearInterval(intervalTimer));
  };

  let updatedS = time.s;
  let updatedM = time.m;
  let updatedH = time.h;

  const startTimer = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }

    updatedS++;
    setTime({ h: updatedH, m: updatedM, s: updatedS });
  };

  //Restart

  const setRestart = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setRadioAnswer({});
    setInputAnswer({});
    setMultipleAnswer(false);
    setDragAndDrop(false);
    resetSteps();
    setTime({ h: 0, m: 0, s: 0 });
    setTimerStan((prevState) => prevState + 1);
  };

  return (
    <>
      <div className="wrapper" style={background}>
        {questions && currentQuestion < questions.length ? (
          <>
            <div className="question">
              <div className="header">Quiz Geologiczny</div>
              <Progress steps={steps} />
              <Timer time={time} />
              <Questions
                {...{
                  question,
                  getRadioAnswer,
                  radioChecked,
                  inputValue,
                  getInputValue,
                  formError,
                  multipleChecked,
                  getMultipleAnswer,
                  dragDrop,
                  dragOver,
                  dragStart,
                  touchMove,
                }}
              />
              <button className="button" onClick={changeQuestion}>
                Dalej
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="summary">
              <button className="button button-restart" onClick={setRestart}>
                Spróbuj jeszcze raz
              </button>
              <Result getResult={getResult} questions={questions} />
              <div className="timer-result">
                <span className="timer-result__text"> Twój czas :</span>
                <Timer time={time} />
              </div>

              <button
                className="button button--checkanswer"
                onClick={displayCorrectAnswer}
              >
                Sprawdź odpowiedzi
              </button>
              {showCorrectAnswer ? returnResult() : null}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Main;
