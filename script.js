
const questionsList = document.getElementById("questionsList")


// Fetch is made upon page loading
window.addEventListener("load", getData);

async function getData() {
    const response = await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986");
    const quizData = await response.json();

    // Call displayData and pass quizData
    displayData(quizData);
}

questionsList.innerHTML = "";


// This function retrieves ID of each question
function displayData(quizData) {
    for (let question of quizData.results) {
        // Decode Questions
        const decodeQuestions = decodeURIComponent(question.question);

             // Create a list item
             let questionItem = document.createElement("li");

             // Set the text content to the decoded question
             questionItem.textContent = decodeQuestions;
     
             // Append the list item to the DOM
             questionsList.appendChild(questionItem);
    }
}

// async function List(quizData){
//     let questionList = document.createElement("li");
//     questionList.textContent = quizData;
//     document.body.appendChild(questionList)
// }



