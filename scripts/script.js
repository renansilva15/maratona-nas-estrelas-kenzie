async function renderCards(link) {
    const cardList = document.querySelector('#card-list');

    cardList.innerHTML = '';

    if(!link) link = 'https://swapi.dev/api/people';
    
    const dataList = await fetch(link, {
        method: 'GET'
    })
    .then(response => response.json());

    console.log(dataList);
    console.log(dataList.results.length);

    for (let element of dataList.results) {
        // const element = index.results;

        const li = document.createElement('li');
        const frontDiv = document.createElement('div');
        const backDiv = document.createElement('div');

        const frontNameDiv = document.createElement('div');
        const backNameDiv = document.createElement('div');

        const cardData = document.createElement('ul');

        const birthYear = document.createElement('li');
        const planet = document.createElement('li');
        const image = document.createElement('img');

        li.classList.add('card', 'list-card'); //
        frontDiv.classList.add('face', 'front');

        frontNameDiv.classList.add('title-card');
        frontNameDiv.innerText = element.name;

        backNameDiv.classList.add('title-card');
        backNameDiv.innerText = element.name;

        cardData.classList.add('card-data');
        
        birthYear.innerText = 'Ano de nascimento: ' + element.birth_year;

        const planetName = await fetch(element.homeworld, {
            method: 'GET'
        })
        .then(response => response.json())

        console.log(planetName.name);

        planet.innerText = 'Planeta: ' + planetName.name;

        backDiv.classList.add('face', 'back');

        image.src = "./assets/starduck.png";
        image.alt = "Starduck";

        cardData.append(birthYear, planet);
        frontDiv.append(frontNameDiv, cardData);
        backDiv.append(backNameDiv, image);
        li.append(frontDiv, backDiv);
        cardList.append(li);
    }

    flipCard();
    // calculateCardsHeight(cardList);

    // Blah
    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');

    previousButton.onclick = () => renderCards(dataList.previous);
    nextButton.onclick = () => renderCards(dataList.next);
}

function flipCard() {
    const cards = document.querySelectorAll('.list-card');

    for (let card of cards) {
        // const card = cards[index];

        card.addEventListener('mouseover', () => card.classList.add('flip'));
        card.addEventListener('mouseout', () => card.classList.remove('flip'));

    }
}

renderCards();


// Blah
let navItems = document.querySelectorAll('.nav-item');

for (let i of navItems) {
    i.onclick = function() {
        this.classList.add('activate-link');

        for (let item of navItems) {
            if (item !== this) {
                item.classList.remove('activate-link');
            }
        }
    };
}

// Blah
// function calculateCardsHeight(cardList) {
//     // const cardList = document.querySelector('#card-list');
//     const cards = cardList.getElementsByClassName('card');

//     const cardHeight = cards.length > 0 ? cards[0].offsetHeight : 0;

//     const cardsHeight = cardHeight * cards.length;

//     cardList.style.height = cardsHeight / 16 + 'rem';
// }