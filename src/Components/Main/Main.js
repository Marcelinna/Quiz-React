import React, { useState } from "react";
import Questions from "../Questions/index";

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
    question: "Występujący w Polsce węgiel kamienny pochodzi z:",
    answer: [{ a: "trzeciorzędu" }, { b: "permu" }, { c: "karbonu" }],
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

const Main = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [userAnswers, setUserAnswers] = useState([]);

  const [radioChecked, setRadioChecked] = useState(false);
  const [radioAnswer, setRadioAnswer] = useState({});

  const [inputValue, setInputValue] = useState("");
  const [inputAnswer, setInputAnswer] = useState({});

  const [multipleChecked, setMultipleChecked] = useState({
    a: false,
    b: false,
    c: false,
  });
  const [multipleAnswer, setMultipleAnswer] = useState(false);

  const [dragAndDrop, setDragAndDrop] = useState(false);

  const question = questions[currentQuestion];

  //Radio QuestionsS

  const getRadioAnswer = (e) => {
    const radioCheckedAnswer = { id: question.id, answer: e.target.value };
    setRadioChecked(e.target.value);
    setRadioAnswer(radioCheckedAnswer);
  };

  //Input Questions

  const getInputValue = (e) => {
    const currentInputValue = e.target.value
      .toLowerCase()
      .replace(/[^a-z]/g, "");

    setInputValue(currentInputValue);
    const inputValueAnswer = { id: question.id, answer: e.target.value };
    setInputAnswer(inputValueAnswer);
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
    const dragDropBoards = document.querySelector(".draganddrop-questions__answer-container");
    const dragDropAnswers = document.querySelectorAll(".draganddrop-questions__answer");

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
  };

  return (
    <>
      <div className="quiz-wrapper">
        <div className="header">Quiz Geologiczny</div>
        <div className="quiz-content">
          <Questions
            question={question}
            getRadioAnswer={getRadioAnswer}
            radioChecked={radioChecked}
            inputValue={inputValue}
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
      </div>
    </>
  );
};

export default Main;
