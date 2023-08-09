const pages = Array.from(document.querySelectorAll('.content-box'));
const footer = document.querySelector('footer');
const thankYouPage = document.getElementById('thank-you-page');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const slideBarElements = Array.from(document.querySelectorAll('.slide-bar > div > div'));
const sliders = document.querySelectorAll('.slide-bar span');

let i = 0; // opened page index


// Layout:

function setLayout () {

    if (i === 0) {
        prevBtn.style.visibility = 'hidden';
    } else {prevBtn.style.visibility = 'initial';}

    if (i === 3) {
        nextBtn.classList.add('confirm');
        nextBtn.innerText = 'confirm';
    } else {
        nextBtn.classList.remove('confirm');
        nextBtn.innerText = 'Next Step';
    }

    if (i === 4) {
        footer.style.display = 'none';
        thankYouPage.style.gridRow = 'span 2';
    } else {
        footer.style.display = 'flex';
        thankYouPage.style.gridRow = 'span 1';
    }
}

setLayout();



// Navigation:

nextBtn.addEventListener('click', () => {

    if (i === 0 && !formValidation()) return;
    nextPage();
    setLayout();
});

prevBtn.addEventListener('click', () => {
    previousPage();
    setLayout();
})

slideBarElements.forEach(slideBarElement => {

    const currentSlider = slideBarElement.querySelector('.slide-bar span');
    
    slideBarElement.addEventListener ('click', () =>{

        if (i === 4) return;
        if (i === 0 && !formValidation()) return;

        sliders.forEach(slider =>{
            slider.classList.remove('active')
        });

        currentSlider.classList.add('active');

        let j = slideBarElements.indexOf(slideBarElement);
        pages.forEach(page => {
            page.classList.remove('show');
        })
        pages[j].classList.add('show');
        i = j;

        setLayout();
    
    })
})

const change = document.getElementById('change');

change.addEventListener('click', () => {
    i = 1;
    pages.forEach(page => {
        page.classList.remove('show');
    })

    pages[i].classList.add('show');

    sliders.forEach (slider => {
        slider.classList.remove('active');
    })

    sliders[i].classList.add('active');
    setLayout();
})


function nextPage () {

    if ( i === pages.length - 1) return;

    pages[i].classList.remove('show');
    sliders[i].classList.remove('active');
    i++;
    pages[i].classList.add('show');
    if (i >= 3) {
        sliders[3].classList.add('active');
        return;
    }
    sliders[i].classList.add('active');
}


function previousPage () {

    if (i === 0) return;

    pages[i].classList.remove('show');
    if (i <= 3) {sliders[i].classList.remove('active');}
    i--;
    pages[i].classList.add('show');
    sliders[i].classList.add('active');
}


// form validation: 

const name = document.getElementById('name');
const email = document.getElementById('email');
const tel = document.getElementById('tel');

function setError (element, message) {
    element.parentElement.classList.add('error');
    const errorMessage = element.parentElement.querySelector('.error-message');
    errorMessage.textContent = message;
}

function setCorrect (element) {
    element.parentElement.classList.remove('error');
}

function emailValidation () {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email.value);
}

function telValidation () {
    const regex = /^(\+?\d{9,15}|\(\d{3}\)\s?\d{3}[-\s]?\d{4}|\(\d{3}\)\s?\d{7}|[0-9-\s]{9,15}|\+\d{1}\s?\d{3}\s?\d{3}\s?\d{3})$/;
    return regex.test(tel.value);
}

function formValidation () {

    let isNameValid
    let isEmailValid
    let isTelValid

    if (name.value === ''){
        setError(name, 'this field is required');
        isNameValid = false;
    } else {
        setCorrect(name);
        isNameValid = true;
    };

    if (tel.value === '') {
        setError(tel, 'this field is required');
        isTelValid = false;
    } else if (!telValidation()) {
        setError(tel, 'Invalid phone number');
        isTelValid = false;
    } else {
        setCorrect(tel);
        isTelValid = true;
    }

    if (email.value === '') {
        setError(email, 'This field is required');
        isEmailValid = false;
    } else if (!emailValidation()) {
        setError(email, 'Invalid email');
        isEmailValid = false;
    } else {
        setCorrect(email);
        isEmailValid = true;
    }

    if (isEmailValid && isNameValid && isTelValid) return true
    else return false;
}



// selecting plan

const plans = document.querySelectorAll('.plan');
const addOns = Array.from(document.querySelectorAll('.add-on'));
const mySwitch = document.getElementById('mySwitch');

plans.forEach(plan => {
    plan.addEventListener('click', () => {
        plans.forEach(plan => {
            plan.classList.remove('active');
        })
        plan.classList.add('active');
        setFinish();
        compute ();
    })
})

addOns.forEach(addOn => {
    addOn.addEventListener ('click', () => {

        if (!addOn.classList.contains('selected')){

           const div = document.createElement('div');
           const p = document.createElement('p');
           const span = document.createElement('span');

           p.textContent = addOn.querySelector('h4').textContent;
           span.textContent = addOn.querySelector('span').textContent;
            
           const title = addOn.querySelector('h4').innerText;
            div.setAttribute('addOnType', `${title}`);

           div.appendChild(p);
           div.appendChild(span);
           finishingTable.appendChild(div);

           addOn.classList.add('selected');
           compute ();

        } else if (addOn.classList.contains('selected')){

            const title = addOn.querySelector('h4').textContent;
            let divs = Array.from(document.querySelectorAll('#step4 .finishing > div')).slice(1);
            
            divs.forEach(div => {
                const addOnType = div.getAttribute('addOnType')
                if (title.match(addOnType)) {
                    div.remove();
                }
            })
            
            addOn.classList.remove('selected');
            compute ()
        }
    })
})

mySwitch.addEventListener('change', e => {

    mySwitch.checked ? setYearly() : setMonthly();
    updateAddOn();
    setFinish ();
    compute();
})


function setYearly () {

    plans.forEach(plan => {
        plan.querySelector('.special-offer').classList.remove('hidden');
    })

    plans[0].querySelector('p').textContent = '$90/yr';
    plans[1].querySelector('p').textContent = '$120/yr';
    plans[2].querySelector('p').textContent = '$150/yr';

    addOns[0].querySelector('span').textContent = '+$10/yr';
    addOns[1].querySelector('span').textContent = '+$20/yr';
    addOns[2].querySelector('span').textContent = '+$20/yr';

    document.querySelector('.total-status').textContent = '(per year)';
    document.querySelector('.plan-status').textContent = '(Yearly)';
    document.querySelector('.plan-status2').textContent = 'yr';

    document.querySelector('.yearly').style.color = 'hsl(213, 96%, 18%)';
    document.querySelector('.monthly').style.color = 'hsl(231, 11%, 63%)';
}


function setMonthly () {

    plans.forEach(plan => {
        plan.querySelector('.special-offer').classList.add('hidden');
    })

    plans[0].querySelector('p').textContent = '$9/mo';
    plans[1].querySelector('p').textContent = '$12/mo';
    plans[2].querySelector('p').textContent = '$15/mo';

    addOns[0].querySelector('span').textContent = '+$1/mo';
    addOns[1].querySelector('span').textContent = '+$2/mo';
    addOns[2].querySelector('span').textContent = '+$2/mo';

    document.querySelector('.total-status').textContent = '(per month)';
    document.querySelector('.plan-status').textContent = '(Monthly)';
    document.querySelector('.plan-status2').textContent = 'mo';

    document.querySelector('.yearly').style.color = 'hsl(231, 11%, 63%)';
    document.querySelector('.monthly').style.color = 'hsl(213, 96%, 18%)';
}

setMonthly();

function updateAddOn (){
    addOns.forEach(addOn => {
        const  addOnPrice = addOn.querySelector('span.price').textContent;
        const title = addOn.querySelector('h4').textContent;
        //const numbers = Array.from(document.querySelectorAll ('.finishing > div span')).slice(3);
        let divs = Array.from(document.querySelectorAll('#step4 .finishing > div')).slice(1);

        divs.forEach(div => {
            const addOnType = div.getAttribute('addOnType');
            if (title.match(addOnType)) {
                const number = div.querySelector('span');
                number.innerText = addOnPrice;
            }
        })
    })
}


// finishing up page 

const finishingPlan = document.getElementById('finishing-plan');
const finishingPrice = document.querySelector('.finishing > div:first-child .finishing-price');
const finishingTable = document.querySelector('.finishing');

function setFinish () {
    plans.forEach(plan => {
        if (plan.classList.contains('active')){

            const planName = plan.querySelector('h3');
            const planPrice = plan.querySelector('p');

            finishingPlan.textContent = planName.textContent;
            finishingPrice.textContent = planPrice.textContent;
        }
    })
}

setFinish();


function compute () {
    let result = null;
    let realNumbers = []
    const numbers = Array.from(document.querySelectorAll ('.finishing > div span')).slice(2);
    const changableNumbers = numbers.slice(1);
    const constNumber = parseInt(numbers[0].textContent.slice(1));
    realNumbers.push(constNumber);
    
    changableNumbers.forEach (changableNumber => {
        const forCheckNumber = changableNumber.textContent.slice(2);
        const realNumber = parseInt(forCheckNumber);
        realNumbers.push(realNumber);
    })

    realNumbers.forEach(realNumber => {
        result += realNumber;
    })

    document.querySelector('.total-price.number').textContent = `+$${result}/`;
}

compute();

