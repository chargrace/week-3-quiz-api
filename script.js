
const questionsList = document.getElementById("questionsList")


// Fetch is made upon page loading
window.addEventListener("load", getData());

async function getData() {
    const response = await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986");
    const quizData = await response.json();
    console.log(quizData);
    // Call displayData and pass quizData
    displayData(quizData);
    //Call multipleChoice and pass quizdata
   //multipleChoice(quizData);
}

/*plan 1
0. put correct answer(correct_answer) into array of incorrect answers (incorrect_answers)
1. select multi-choice answers
2. display each under each question
*/

// This function retrieves questions and displays them with multiple-choice answers
function displayData(quizData) {
    questionsList.innerHTML = ""; // Clear any existing questions
    quizData.results.forEach((question, index) => {
        const decodedQuestion = decodeURIComponent(question.question);
        const decodedCorrectAnswer = decodeURIComponent(question.correct_answer);
        const decodedIncorrectAnswers = question.incorrect_answers.map((answer) => decodeURIComponent(answer));

        // Combine all answers and shuffle them
         const allAnswers = [...decodedIncorrectAnswers, decodedCorrectAnswer].sort(() => Math.random() - 0.5);

         // Create a list item for the question
         const questionItem = document.createElement("li");
         questionItem.textContent = decodedQuestion;
 
         // Create a sublist for the answers in the DOM
         const answersList = document.createElement("div");
         allAnswers.forEach((answer) => {
             const answerItem = document.createElement("label");
             const radioButton = document.createElement("input");
            //  allows user to only choose one
             radioButton.type = "radio";
             radioButton.name = `question-${index}`;
             radioButton.value = answer;
 
             answerItem.appendChild(radioButton);
             answerItem.appendChild(document.createTextNode(answer));
             answersList.appendChild(answerItem);
             answersList.appendChild(document.createElement("br"));
         });
 
         // Append the answers to the question item
         questionItem.appendChild(answersList);
         questionsList.appendChild(questionItem);
     });
 }