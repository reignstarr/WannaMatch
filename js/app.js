/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let openCards = [];
let moveCounter = 0;

function displayCardSymbol(card) {
    card.classList.add('open', 'show');
}

function addCardToList(card) {
    openCards.push(card);
}

function checkCardsMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        lockCards();
    } else {
        hideCards();
    }
}

function lockCards() {
    openCards.forEach(card => card.classList.add('match'));
    openCards = [];
}

function hideCards() {
    setTimeout(() => {
        openCards.forEach(card => card.classList.remove('open', 'show'));
        openCards = [];
    }, 1000);
}

function incrementMoveCounter() {
    moveCounter++;
    document.querySelector('.moves').innerText = moveCounter;
}

function checkAllCardsMatched() {
    const cards = document.querySelectorAll('.card');
    if (Array.from(cards).every(card => card.classList.contains('match'))) {
        displayFinalScore();
    }
}

function displayFinalScore() {
    // Display final score
}

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        displayCardSymbol(card);
        addCardToList(card);
        if (openCards.length === 2) {
            checkCardsMatch();
            incrementMoveCounter();
            checkAllCardsMatched();
        }
    });
});

document.querySelector('#repeatButton').addEventListener('click', resetGame);

function resetGame() {
    openCards = [];
    moveCounter = 0;
    document.querySelector('.moves').innerText = moveCounter;
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('open', 'show', 'match');
    });
    // Reset score display
    document.querySelector('.score').innerText = '';
}

