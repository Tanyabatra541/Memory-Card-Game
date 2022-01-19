const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCard){
        // if the user selects first card
        hasFlippedCard = true;
        firstCard = this;
    } 
    else {
        //this is not the first card flipped by the user. its the second
        
        secondCard = this;

        checkMatch();
        
    }
}
function checkMatch(){
    //if both the cards match
    if(firstCard.dataset.framework === secondCard.dataset.framework)
        doNotFlip();
    else
        //cards do not match
        unFlipCards();
}
function doNotFlip(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unFlipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card => {
        let random = Math.floor(Math.random()*24);
        card.style.order = random;
    })
})();

cards.forEach(card => card.addEventListener('click', flipCard));
