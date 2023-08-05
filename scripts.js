const wrapper = document.querySelector('.wrapper');
const startBtn = document.querySelector('[data-start]');
const starterPage = document.querySelector('#starter');
const endPage = document.querySelector('.end-of-quiz');
const tryAgainBtn = document.querySelector('[data-try-again]');

let selected = false;
let i = 0;
let score = 0;

startBtn.addEventListener('click', () => {
    nextQuiz();
    starterPage.classList.add('hidden');
    //const currentQuiz = document.querySelector('.quiz-body');
    //currentQuiz.remove();
})

wrapper.addEventListener('click', e => {

    if (e.target.classList.contains('next-btn') && !selected) return;

    if (e.target.classList.contains('next-btn') && i === quizArray.length - 1){
        const currentQuiz = document.querySelector('.quiz-body');
        currentQuiz.remove();
        endPage.classList.remove('hidden');
        endPage.querySelector('h3').innerText = `${score}/10`;
        selected = false;
    }

    if (e.target.classList.contains('next-btn') && i < quizArray.length - 1){
        i++;
        nextQuiz();
        const currentQuiz = document.querySelector('.quiz-body');
        currentQuiz.remove();
        selected = false;
    }

    if (selected) return;

    if (e.target.tagName === 'P' && e.target.innerText === quizArray[i].correct){
        e.target.classList.add('right');
        score++
        selected = true;
    } else if (e.target.tagName === 'P' && e.target.innerText !== quizArray[i].correct){
        e.target.classList.add('wrong');
        selected = true;
    }

    if (e.target == tryAgainBtn){
        endPage.classList.add('hidden');
        starterPage.classList.remove('hidden');
        score = 0;
        i = 0;
    }
})


const quizArray = [{

    question: "What was Sai's first mission as a member of team Kakashi?",

    picture: 'url(img/f12bc4ac98fbbc37007a66ed26623e5a.jpg)',

    options: [ 
        "to be a nagotiator between Danzo and Orochimaru",
        "to kill Orochimaru",
        "to join Orochimaru",
        "to kill Sasuke",
        "to obstruct team Kakashi from fulfiling their mission"
    ],

    correct: "to kill Sasuke"

},

{
    question: "How many mouth(es) does Deidara have?",

    picture: 'url(img/deidara.jpg)',

    options: [ 
        "1",
        "2",
        "4",
        "6",
        "8"
    ],

    correct: "4"

},
{
    question: "Who is the progenitor of Chakra?",

    picture: 'url(img/Kaguya.webp)',

    options: [ 
        "Sage of the six paths",
        "Kaguya Otsutsuki",
        "Indra Otsutsuki",
        "Black Zetsu",
        "Princess Tsunade"
    ],

    correct: "Kaguya Otsutsuki"

},
{
    question: "Who came up with the name 'Naruto'?",

    picture: 'url(img/naruto.avif)',

    options: [ 
        "Jiraya",
        "Minato",
        "Kushina",
        "Hiruzen Sarutobi",
        "Kakashi"
    ],

    correct: "Jiraya"

}, 
{
    question: "Which quote does not belong to Pain?",

    picture: 'url(img/Pain.avif)',

    options: [ 
        "This world shall know pain!",
        "Those who do not understand true pain, will never understand the true peace!",
        "There is no such a thing as peace, there is no such a thing as hope",
        "If you don't experience same pain you will not understand someone else",
        "Out of love, sacrifice is born, hatred is born and then we begin to know pain..."
    ],

    correct: "There is no such a thing as peace, there is no such a thing as hope"

}, 
{
    question: "What is Obito's plan called?",

    picture: 'url(img/obito.jpg)',

    options: [ 
        "project Otsutsuki",
        "project Tsuki no me",
        "project Tsukuyomi",
        "project Akatsuki",
        "project infinite tsuki omi"
    ],

    correct: "project Tsuki no me"

},
{
    question: "What can Shisui Uchiha's Mangekyou Sharingan ability, Kotoamatsukami, do?",

    picture: 'url(img/shisui.avif)',

    options: [ 
        "Create inextinguishable black flames",
        "Manipulate space-time",
        "Manipulate weapons",
        "Absorb any Jutsu",
        "Alter memory of people"
    ],

    correct: "Alter memory of people"

}, 
{
    question: "Who was the first person to ever control the nine tailed fox?",

    picture: 'url(img/kurama.jpg)',

    options: [ 
        "Hashirama senju",
        "Madara Uchiha",
        "Naruto Uzumaki",
        "Kushina Uzumaki",
        "Obito Uchiha"
    ],

    correct: "Madara Uchiha"

},
{
    question: "According to Sassori, what is the true art?",

    picture: 'url(img/sasori.jpg)',

    options: [ 
        "An explosion",
        "Anarchy",
        "Killing people",
        "Eternal beauty",
        "Mastering one's techniques"
    ],

    correct: "Eternal beauty"

},
{
    question: "Why do people hate Sakura?",

    picture: 'url(img/sakura.webp)',

    options: [ 
        "Because she is useless",
        "Because she deceptively confessed love to Naruto",
        "Because she stayed in love with Sasuke, even though he betrayed the village",
        "She has always been mean to Naruto",
        "All of the above"
    ],

    correct: "All of the above"

},]

function nextQuiz(){
    const mainDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    const imgDiv = document.createElement('div');
    const option1 = document.createElement('p');
    const option2 = document.createElement('p');
    const option3 = document.createElement('p');
    const option4 = document.createElement('p');
    const option5 = document.createElement('p');
    const nextBtn = document.createElement('button');
    const span = document.createElement('span');

    mainDiv.classList.add('quiz-body');
    imgDiv.classList.add('quiz-img');
    nextBtn.classList.add('next-btn');

    h2.innerText = quizArray[i].question;
    imgDiv.style.backgroundImage = quizArray[i].picture;

    option1.innerText = quizArray[i].options[0];
    option2.innerText = quizArray[i].options[1];
    option3.innerText = quizArray[i].options[2];
    option4.innerText = quizArray[i].options[3];
    option5.innerText = quizArray[i].options[4];

    nextBtn.append('Next ');
    nextBtn.append(span);
    nextBtn.append(' ➤');

    mainDiv.appendChild(h2);
    mainDiv.appendChild(imgDiv);
    mainDiv.appendChild(option1);
    mainDiv.appendChild(option2);
    mainDiv.appendChild(option3);
    mainDiv.appendChild(option4);
    mainDiv.appendChild(option5);
    mainDiv.appendChild(nextBtn);

    wrapper.appendChild(mainDiv);
}
