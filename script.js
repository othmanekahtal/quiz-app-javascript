import data from "./quizData";
import _ from "lodash";
import swal from "sweetalert";
import './css/tailwind.css'
import './images/1.png'
import './images/2.png'
import './images/3.png'
// selectors :
const question_block = document.getElementById('question');
const score_block = document.getElementById('score');
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
let result_percentage = 0;
// application :
application();

function verifyAnswers(question) {
    [...answers.children].forEach(function (element, i, arr) {
        counter = 0;
        progress.style.width = null;
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
            }, 250)
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
        answers.insertAdjacentHTML('beforeend', question_template.replace('{{question}}', question.get(element)))
    })
    // render scores :
    score_block.textContent = "" + score;
    verifyAnswers(question);
}

function nextQuestion() {
    if (questions.length - 1 <= current) {
        question_container.classList.add('hidden')
        result_container.classList.remove('hidden')
        console.log('final')
        render_result();
        return
    }
    answers.innerHTML = question_block.innerText = "";
    current++;
    currentQuestion = questions[current];
    renderQuestion(currentQuestion);
}

function render_result() {
    clearInterval(count);
    result_percentage = ~~((score / questions.length) * 100);
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

function saveScore() {
    result_container.classList.add('hidden');
    save_score.classList.remove('hidden');
}

function application() {
// we have three phase in application : intro-question-result
    questions.sort(() => .5 - Math.random());
    start.onclick = () => {
        intro_container.classList.add('hidden');
        renderQuestion(questions[current]);
        question_container.classList.remove('hidden');
        count = setInterval(counterSkip, 1000);
    }
    reload.onclick = cancel.onclick = () => location.reload();
    save.onclick = () => saveScore();
    submit.onclick = () => {
        let input = input_score.value.trim();
        if (input === "") {
            error_input.textContent = 'you need to fill input !'
        }
        let lastData = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : [];
        lastData.push({
            name: input,
            score: result_percentage
        })
        localStorage.setItem('scores', JSON.stringify(lastData));
        swal("saved successfully!", "Your score saved successfully!", "success").then(() => location.reload());
    }
    saved_score.onclick = () => {
        saved_score_container.classList.remove('hidden');
        intro_container.classList.add('hidden');
        let content = localStorage.getItem('scores') ?
            JSON.parse(localStorage.getItem('scores'))
                .sort((el1, el2) => (+el2.score) - (+el1.score))
                .map(element => `<div class="bg-white shadow-lg py-2 px-4 cursor-pointer font-semiBold flex justify-between transition text-lg hover:bg-gray-100"><span class="font-medium">${element.name}</span><span>${element.score}%</span></div>`).join('') : '<div class="text-center text-2xl text-gray-400 font-thin">No score saved !</div>';
        saved_score_container.insertAdjacentHTML('beforeend', content);
        saved_score_container.insertAdjacentHTML('beforeend', '<button class="btn btn-secondary" onclick="location.reload()">cancel</button>');
    }
}
