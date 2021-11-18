import data from "./quizData";
import _ from "lodash";
// selectors :
const question_block = document.getElementById('question');
const start_btn = document.getElementById('start');
const score_block = document.getElementById('score');
const answers_block = document.getElementById('answers');
const high_score_btn = document.getElementById('high_score')
const intro_container = document.getElementById('intro-container');
const question_container = document.getElementById('question-container');
const result_container = document.getElementById('result-container');
const question_template = '<div class="bg-white shadow-lg py-2 px-4 cursor-pointer font-semiBold transition text-lg hover:bg-gray-100">{{question}}</div>'
const progress = document.querySelector('#progress span');

// init values :
let score = 0;
let questions = _.cloneDeep(data);
let current = 0;
let counter = 0;
let count;
let currentQuestion;
// application :
application();
function verifyAnswers(question) {
    [...answers_block.children].forEach(function (element, i, arr) {
        element.addEventListener('click', function (e) {
            let answer = this.textContent;
            arr.forEach(el => el.style.pointerEvents = 'none');
            if (question.get(question.get('correct')) == answer) {
                e.target.classList.add('correct-answer')
                console.log("correct !")
                score++;
                score_block.innerText = score;
            } else {
                console.log('wrong !')
                e.target.classList.add('wrong-answer')
            }
            setTimeout(function () {
                nextQuestion();
            }, 500)
            // add condition here
        }, true);
    })
}

function getQuestions(question) {
    let arr = [];
    [...question.keys()].forEach(element => {
        if (typeof element === 'number') arr.push(element)
    })
    return arr
}

function renderQuestion(question) {
    // render question context :
    question_block.innerHTML = question.get('question');
    // render answers :
    getQuestions(question).forEach(element => {
        answers_block.insertAdjacentHTML('beforeend', question_template.replace('{{question}}', question.get(element)))
    })
    // render scores :
    score_block.textContent = "" + score;
    verifyAnswers(question);
}

function nextQuestion() {
    counter = 0;
    if (questions.length - 1 <= current) {
        question_container.classList.add('hidden')
        result_container.classList.remove('hidden')
        console.log('final')
        render_result();
        return
    }
    answers_block.innerHTML = question_block.innerText = "";
    current++;
    currentQuestion = questions[current];
    renderQuestion(currentQuestion);
}

function render_result() {
    clearInterval(count);
    const result_percentage = ~~((score / questions.length) * 100);
    const result_percentage_container = document.getElementById('result_percentage');
    result_percentage_container.textContent = "" + result_percentage;
    result_container.classList.remove('hidden');
    question_container.classList.add('hidden');
    const img_emotion = document.getElementById('emotion-emoji');
    if (result_percentage >= 70) {
        img_emotion.src = 'images/1.png'
    } else if (result_percentage >= 50) {
        img_emotion.src = 'images/2.png'
    } else {
        img_emotion.src = 'images/3.png'
    }
}

function counterSkip() {
    counter++;
    progress.style.width = `${counter * 20}%`;
    if (counter > 5) {
        progress.style.width = null;
        counter = 0;
        nextQuestion();
    }
}
function application() {
// we have three phase in application : intro-question-result
    questions.sort(() => .5 - Math.random());
    start_btn.onclick = () => {
        intro_container.classList.add('hidden');
        renderQuestion(questions[current]);
        question_container.classList.remove('hidden');
        count = setInterval(counterSkip, 1000);
    }
}
