const cardsContainer = document.getElementById('cards-container');
const cards = Array.from(document.getElementsByClassName('card'));

let startX = 0;
let currentX = 0;
let isDragging = false;
let currentIndex = 0;
let a = 0; // Variable for cards 1-4
let b = 0; // Variable for cards 5-8
let c = 0; // Variable for cards 9-10

// Initialize the cards in the correct order
function initializeCards() {
    cards.forEach((card, index) => {
        card.style.zIndex = cards.length - index;
        card.style.display = 'block';
    });
    currentIndex = 0;
}

// Attach event listeners to each card
cards.forEach(card => {
    card.addEventListener('mousedown', startDragging);
    card.addEventListener('touchstart', startDragging);
});

document.addEventListener('mousemove', dragCard);
document.addEventListener('touchmove', dragCard);
document.addEventListener('mouseup', stopDragging);
document.addEventListener('touchend', stopDragging);

function startDragging(event) {
    isDragging = true;
    startX = event.clientX || event.touches[0].clientX;
}

function dragCard(event) {
    if (!isDragging) return;

    const x = event.clientX || event.touches[0].clientX;
    const offsetX = x - startX;
    currentX = offsetX;

    if (event.cancelable) {
        event.preventDefault();
    }

    updateCardPosition();
}

function stopDragging() {
    if (!isDragging) return;

    isDragging = false;
    if (Math.abs(currentX) > 100) {
        if (currentX > 0) {
            updateScore(1); // Swipe right
        } else {
            updateScore(-1); // Swipe left
        }
        swipeCard();
    } else {
        currentX = 0;
        updateCardPosition();
    }
}

function updateCardPosition() {
    const card = cards[currentIndex];
    card.style.transform = `translateX(${currentX}px) rotate(${currentX / 10}deg)`;
}

function swipeCard() {
    const card = cards[currentIndex];
    card.style.transform = `translateX(${currentX * 5}px) rotate(${currentX / 2}deg)`;
    card.style.transition = 'transform 0.5s ease-in-out';
    card.addEventListener('transitionend', onSwipeEnd);
}

function onSwipeEnd() {
    const card = cards[currentIndex];
    card.removeEventListener('transitionend', onSwipeEnd);
    card.style.transition = '';
    currentX = 0;
    card.style.transform = '';
    card.style.zIndex = -1;
    card.style.display = 'none';

    currentIndex = (currentIndex + 1) % cards.length;

    if (currentIndex === 0) {
        alert(`Final Scores:\na: ${a}\nb: ${b}\nc: ${c}`); // Display the scores when all cards are swiped
        resetCards();
    }
}

function resetCards() {
    // Reset all cards and set their display and z-index properties
    cards.forEach((card, index) => {
        card.style.display = 'block';
        card.style.zIndex = cards.length - index;
    });
    a = 0; // Reset scores
    b = 0;
    c = 0;
    currentIndex = 0;
}

function updateScore(value) {
    if (currentIndex < 4) {
        a += value;
    } else if (currentIndex < 8) {
        b += value;
    } else {
        c += value;
    }
}

// Initialize cards on page load
initializeCards();
