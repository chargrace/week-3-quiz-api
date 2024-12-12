//Fetch is made upon page loading
let pageLoad = document.addEventListener("load", getData());

// This function receives all of the data via JSON file.

async function getData () {
    const response = await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986");
    console.log(response);
    const quizData = await response.json();
    console.log(quizData);
}

//This function retrieves ID of each question
function displayData (quizData) {
 for (let questions of quizData.results.question) {
    console.log(questions);
 }
}