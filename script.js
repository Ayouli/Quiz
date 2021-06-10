class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

let questions = [
    new Question (
        "Quelle est la capitale du Portugal?",
        ["Paris", "Lisbonne", "Madrid", "Londres"],
        "Lisbonne" ),
    new Question(
        "De quels pays le Rio Guadiana est-il la frontière?",
        ["France-Italie", "Portugal-Espagne", "France-Espagne", "Suisse-Italie"],
        "Portugal-Espagne"),
    new Question(
        "L'Algarve est une région de quel pays ?",
        ["Portugal", "Allemagne", "Italie", "Espagne"],
        "Portugal"),
    new Question(
        "Dans quelle grande ville passe le fleuve le Douro?",
        ["Seville", "La Rochelle", "Barcelone", "Porto"],
        "Porto")
];

class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
        if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.currentQuestionIndex++;
    }
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}

// regroup all functions relative to the app display
const display = {
    elementShown: function(id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },
    endQuiz: function() {
        let endQuizHTML = `
            <h1> Quiz terminé! </h1>
            <h3> Votre score est de: ${quiz.score} / ${quiz.questions.length} </h3>`;
        this.elementShown("quiz", endQuizHTML);
    },
    question: function() {
        this.elementShown("question", quiz.getCurrentQuestion().text)
    },
    choices: function() {
        let choices = quiz.getCurrentQuestion().choices;

        guessHandler = (id, guess) => {
            document.getElementById(id).onclick = function() {
                quiz.guess(guess);
                quizApp();
            }
        }
        for(let i = 0; i < choices.length; i++) {
            this.elementShown("choice" + i, choices[i]);
            guessHandler("guess" + i, choices[i]);
        }
    },
    progress: function() {
        let currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.elementShown('progress', "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    }
}

//game logic
quizApp = () => {
    if(quiz.hasEnded()) {
       display.endQuiz();
    } else {
        display.question();
        display.choices();
        display.progress();
    }
}

//create quiz object
let quiz = new Quiz(questions);
quizApp();
console.log(quiz);




