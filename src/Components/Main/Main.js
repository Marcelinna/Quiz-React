import React, { useState, useEffect } from "react";
import Questions from "../Questions/index";
import Progress from "../Progress/Progress";
import Result from "../Result/Result";
import Timer from "../Timer/Timer";

const questions = [
  {
    id: 1,
    type: "radio",
    question: "Nazwa epoki geologicznej w której żyjemy?",
    answer: [{ a: "neogen" }, { b: "holocent" }],
    correct_answer: "holocent",
  },
  {
    id: 2,
    type: "radio",
    question: "Co to jest krasowienie?",
    answer: [
      { a: "rodzaj wietrzenia chemicznego" },
      { b: "rodzaj wietrzenia mechanicznego" },
    ],
    correct_answer: "Rodzaj wietrzenia chemicznego",
  },
  {
    id: 3,
    type: "radio",
    question: "Ruchy górotwórcze to inaczej",
    answer: [{ a: "orogeneza" }, { b: "sedymentacja" }],
    correct_answer: "orogeneza",
  },
  {
    id: 4,
    type: "radio",
    question: "Jaką cechę minerału określamy na podstawie skali Mohsa?",
    answer: [{ a: "połysk" }, { b: "twardość" }],
    correct_answer: "twardość",
  },
  {
    id: 5,
    type: "input",
    question: "Krapaty powstały podczas orogenezy .....",
    answer: [{ a: "alpejskiej" }],
    correct_answer: "alpejskiej",
  },
  {
    id: 6,
    type: "input",
    question:
      "Skały ..... powstały wskutek krystalizacji lub zakrzepnięcia magmy w głębi skorupy ziemskiej lub lawy na powierzchni Ziemi",
    answer: [{ a: "magmowe" }],
    correct_answer: "magmowe",
  },
  {
    id: 7,
    type: "multiple",
    question: "Pustyniami piaszczystymi są?",
    answer: [
      { a: "Sahara" },
      { b: "Gibsona" },
      { c: "Wielka Pustynia Wiktorii" },
    ],
    correct_answer: ["Sahara", "Wielka Pustynia Wiktorii"],
  },
  {
    id: 8,
    type: "multiple",
    question: "Do planet typu ziemskiego NIE należą?",
    answer: [{ a: "Mars" }, { b: "Jowisz" }, { c: "Neptun" }],
    correct_answer: ["Jowisz", "Neptun"],
  },
  {
    id: 9,
    type: "multiple",
    question: "Na terenie, których państw rozciaga się pustynia Gobi?",
    answer: [{ a: "Chiny" }, { b: "Kazachstan" }, { c: "Mongolia" }],
    correct_answer: ["Chiny", "Mongolia"],
  },
  {
    id: 10,
    type: "draganddrop",
    question: "Występujący w Polsce węgiel kamienny pochodzi z",
    answer: [{ a: "permu" }, { b: "trzeciorzędu" }, { c: "karbonu" }],
    correct_answer: "karbonu",
  },
  {
    id: 11,
    type: "draganddrop",
    question: "Węgiel brunatnu wydobywa się metodą",
    answer: [{ a: "głębinową" }, { b: "otworową" }, { c: "odkrywkową" }],
    correct_answer: "odkrywkową",
  },
];

const steps = [
  {
    step: 1,
    completed: false,
    selected: true,
  },
  { step: 2, completed: false, selected: false },
  { step: 3, completed: false, selected: false },
  { step: 4, completed: false, selected: false },
  { step: 5, completed: false, selected: false },
  { step: 6, completed: false, selected: false },
  { step: 7, completed: false, selected: false },
  { step: 8, completed: false, selected: false },
  { step: 9, completed: false, selected: false },
  { step: 10, completed: false, selected: false },
  { step: 11, completed: false, selected: false },
];

const backgroundImage = [
  "image-1",
  "image-2",
  "image-3",
  "image-4",
  "image-5",
  "image-6",
  "image-7",
  "image-8",
  "image-9",
  "image-10",
  "image-11",
];

const Main = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [userAnswers, setUserAnswers] = useState([]);

  const [radioChecked, setRadioChecked] = useState(false);
  const [radioAnswer, setRadioAnswer] = useState({});

  const [inputValue, setInputValue] = useState("");
  const [inputAnswer, setInputAnswer] = useState({});
  const [formError, setFormError] = useState("");

  const [multipleChecked, setMultipleChecked] = useState({
    a: false,
    b: false,
    c: false,
  });
  const [multipleAnswer, setMultipleAnswer] = useState(false);

  const [dragAndDrop, setDragAndDrop] = useState(false);

  const [previousStep, setPreviousStep] = useState(steps);
  const [currentStep, setCurrentStep] = useState(steps);

  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const [timerStan, setTimerStan] = useState(0);
  const [intervalTimer, setIntervalTimer] = useState();

  const question = questions[currentQuestion];

  const background = {
    backgroundImage: `url("Images/${backgroundImage[currentQuestion]}.jpg")`,
  };

  //Radio QuestionsS

  const getRadioAnswer = (e) => {
    const radioCheckedAnswer = { id: question.id, answer: e.target.value };
    setRadioChecked(e.target.value);
    setRadioAnswer(radioCheckedAnswer);
  };

  //Input Questions

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

  // Multiple Questions

  const getMultipleAnswer = (e) => {
    const target = e.target;
    const value = target.checked;
    const name = target.name;

    setMultipleChecked({
      ...multipleChecked,
      [name]: value,
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

  //DragAndDrop Question

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragStart = (e) => {
    e.dataTransfer.setData("answer_id", e.target.id);
  };

  const dragDrop = (e) => {
    e.preventDefault();

    const answer_id = e.dataTransfer.getData("answer_id");
    const dragAnswer = document.getElementById(answer_id);

    const correctAnswerContainer = document.querySelector(
      ".draganddrop-questions__user-answer-container"
    );

    if (correctAnswerContainer.childNodes.length === 0) {
      correctAnswerContainer.appendChild(dragAnswer);
    } else {
      const dropedAnswer = correctAnswerContainer.firstChild;
      const answerContainer = dragAnswer.parentElement;
      correctAnswerContainer.replaceChild(dragAnswer, dropedAnswer);
      answerContainer.appendChild(dropedAnswer);
    }

    const chosenAnswer = { id: question.id, answer: dragAnswer.dataset.value };
    setDragAndDrop(chosenAnswer);
  };

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
          a: false,
          b: false,
          c: false,
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
      } else if (question.type === "input") {
        setUserAnswers(inputAnswers);
      } else if (question.type === "multiple") {
        setUserAnswers(multipleAnswers);
      } else {
        setUserAnswers(dragAndDropAnswers);
      }

      setRadioChecked(false);
      setInputValue("");
      setMultipleChecked({
        a: false,
        b: false,
        c: false,
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

      if (question.correct_answer === answer.answer) {
        return (
          <div className="result-marked-answer">
            <div className="question-text">{question.question}</div>
            <div className="result-marked-answer__correct-answer">
              {question.correct_answer.replace(/[^a-zęóąśłżźćń]/gi, " ")}
            </div>
          </div>
        );
      } else {
        return (
          <div className="result-marked-answer">
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

  // Timer

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
                question={question}
                getRadioAnswer={getRadioAnswer}
                radioChecked={radioChecked}
                inputValue={inputValue}
                formError={formError}
                getInputValue={getInputValue}
                multipleChecked={multipleChecked}
                getMultipleAnswer={getMultipleAnswer}
                dragDrop={dragDrop}
                dragOver={dragOver}
                dragStart={dragStart}
              />
              <button className="button" onClick={changeQuestion}>
                Dalej
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="button" onClick={setRestart}>
              Spróbuj jeszcze raz
            </button>
            <Result getResult={getResult} questions={questions} />
            <div className="timer__result">
              Twój czas : <Timer time={time} />
            </div>
            <button
              className="button button__checkanswer"
              onClick={displayCorrectAnswer}
            >
              Sprawdź odpowiedzi
            </button>
            {showCorrectAnswer ? returnResult() : null}
          </>
        )}
      </div>
    </>
  );
};

export default Main;
