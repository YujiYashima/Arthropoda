//Definir atalhos
const qsa = e => document.querySelectorAll(e);

//Variaveis globais
const cards = qsa('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//Flip Action
function flipCard() {

    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add('flip');

    if (!hasFlippedCard) {

        //first click
        hasFlippedCard = true;
        firstCard = this;
        
        return;
    }
        
    //second click
    secondCard = this;

    checkForMatch();

}

const checkForMatch = () => {

    let isMatch = firstCard.dataset.arthropoda == secondCard.dataset.arthropoda;

    isMatch ? disableCards() : unflipCards();

}

const disableCards = () => {

    firstCard.removeEventListener('click', flipCard);

    secondCard.removeEventListener('click', flipCard);

    resetBoard();
        
}

const unflipCards = () => {

    lockBoard = true;

    //not a match
    setTimeout(() => {

        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();

    }, 1500); 
}

const resetBoard = () => {

    [hasFlippedCard, lockBoard] = [false, false];

    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);

        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));