import React, { useState } from "react";

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
  const question = questions[currentQuestion];

  const changeQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <>
      <div className="quiz-wrapper">
        <div className="header">Quiz Geologiczny</div>
        <div className="quiz-content">
          <div>{question.question}</div>
          <button className="button" onClick={changeQuestion}>
            Dalej
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
