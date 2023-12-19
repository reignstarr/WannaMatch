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

// Shuffle the list of cards
const cards = document.querySelectorAll('.card');
const shuffledCards = shuffle(Array.from(cards));

// Display the shuffled cards on the page
const deck = document.querySelector('.deck');
shuffledCards.forEach(card => {
    deck.appendChild(card);
});




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
    card.querySelector('img').src = card.dataset.cardImage; // display the front of the card
    card.classList.add('open', 'show');
}

function hideCardSymbol(card) {
    card.querySelector('img').src = 'images/back_of_card.webp'; // display the back of the card
    card.classList.remove('open', 'show');
}

function addCardToList(card) {
    openCards.push(card);
}

function checkCardsMatch() {
    if (openCards.length < 2) {
        return;
    }

    const [card1, card2] = openCards;
    if (card1.querySelector('img').src === card2.querySelector('img').src) {
        lockCardsInOpenPosition(card1, card2);
    } else {
        removeCardsFromListAndHideSymbol(card1, card2);
    }
}

function lockCardsInOpenPosition(card1, card2) {
    card1.classList.add('match');
    card2.classList.add('match');
    openCards = [];
}

function removeCardsFromListAndHideSymbol(card1, card2) {
    setTimeout(() => {
        hideCardSymbol(card1);
        hideCardSymbol(card2);
        openCards = [];
    }, 1000);
}

function incrementMoveCounterAndDisplay() {
    moveCounter++;
    document.querySelector('.moves').textContent = moveCounter;
}

function checkAllCardsMatched() {
    const allCards = Array.from(document.querySelectorAll('.card'));
    if (allCards.every(card => card.classList.contains('match'))) {
        alert(`Congratulations! You've matched all cards in ${moveCounter} moves.`);
    }
}

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('open') || card.classList.contains('match') || openCards.length >= 2) {
            return; // ignore clicks on cards that are already open, matched, or if there are already two cards in the openCards array
        }

        displayCardSymbol(card);
        addCardToList(card);
        checkCardsMatch();
        incrementMoveCounterAndDisplay();
        checkAllCardsMatched();
    });
});

function resetGame() {
    // Reset move counter
    moveCounter = 0;
    document.querySelector('.moves').textContent = moveCounter;

    // Clear the openCards array
    openCards = [];

    // Remove all classes from the cards that make them visible and reset their image
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('open', 'show', 'match'); // Remove 'open', 'show', and 'match' classes
        const img = card.querySelector('img');
        img.src = 'images/back_of_card.webp'; // Reset the image
    });

    // Shuffle and display the cards
    const shuffledCards = shuffle(Array.from(cards));
    const deck = document.querySelector('.deck');
    deck.innerHTML = ''; // Clear the deck
    shuffledCards.forEach(card => {
        deck.appendChild(card);
    });
}

// Attach the reset function to the click event of the repeatButton
document.querySelector('#repeatButton').addEventListener('click', resetGame);