// Fetch is made upon page loading
const questionsList = document.getElementById("questionsList");

window.addEventListener("load", getData);

async function getData() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986"
  );
  const quizData = await response.json();
  displayData(quizData);
}

function displayData(quizData) {
  questionsList.innerHTML = ""; // Clear any existing questions
  quizData.results.forEach((question, index) => {
    const decodedQuestion = decodeURIComponent(question.question);
    const decodedCorrectAnswer = decodeURIComponent(question.correct_answer);
    const decodedIncorrectAnswers = question.incorrect_answers.map((answer) =>
      decodeURIComponent(answer)
    );

    // Combine all answers and shuffle them
    const allAnswers = [...decodedIncorrectAnswers, decodedCorrectAnswer].sort(
      () => Math.random() - 0.5
    );

    // Create a list item for the question
    const questionItem = document.createElement("li");
    questionItem.innerHTML = `<strong>${decodedQuestion}</strong>`;

    // Create a sublist for the answers to fit within the DOM
    const answersList = document.createElement("div");
    allAnswers.forEach((answer) => {
      const answerItem = document.createElement("label");
      const radioButton = document.createElement("input");
      radioButton.type = "radio";
      radioButton.name = `question-${index}`;
      radioButton.value = answer;

      answerItem.appendChild(radioButton);
      answerItem.appendChild(document.createTextNode(answer));
      answersList.appendChild(answerItem);
      answersList.appendChild(document.createElement("br"));
    });

    // adds the answers to the question item
    questionItem.appendChild(answersList);
    questionsList.appendChild(questionItem);

    // Add a feedback section
    const feedback = document.createElement("p");
    feedback.id = `feedback-${index}`;
    questionItem.appendChild(feedback);
  });

  const checkButton = document.createElement("button");
  checkButton.textContent = "Check Answers";
  checkButton.addEventListener("click", () => checkAnswers(quizData));
  questionsList.appendChild(checkButton);
}

// Checks answer with a loop
function checkAnswers(quizData) {
  quizData.results.forEach((question, index) => {
    const correctAnswer = decodeURIComponent(question.correct_answer);

    const selectedOption = document.querySelector(
      `input[name="question-${index}"]:checked`
    );

    const feedback = document.getElementById(`feedback-${index}`);

    // Check if an option was selected
    if (selectedOption) {
      if (selectedOption.value === correctAnswer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
      } else {
        feedback.textContent = `Wrong! The correct answer was: ${correctAnswer}`;
        feedback.style.color = "red";
      }
    } else {
      feedback.textContent = `No answer selected. The correct answer was: ${correctAnswer}`;
      feedback.style.color = "orange";
    }
  });
}
