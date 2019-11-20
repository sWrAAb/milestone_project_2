/* Modals and jQuery */

$("#restart-game-modal").modal("show");
$("#body-wrapper").addClass("d-none");

$("#dc-modal-image").click(function() {
    $("#starting-page").addClass("d-none");
    $("#dc-game").removeClass("d-none");
    $("#marvel-game").addClass("d-none");
    $("#body-wrapper").removeClass("d-none").addClass("blue-cursor");
    $("#title-container").addClass("dc-title-container");
    $(".container-fluid").removeClass("marvel-background")
        .addClass("dc-background");
    setTimeout(() => {
        $(".hero-game").removeClass("d-none");
        timer();
    }, 800);
});

$("#marvel-modal-image").click(function() {
    $("#starting-page").addClass("d-none");
    $("#dc-game").addClass("d-none");
    $("#marvel-game").removeClass("d-none");
    $("#body-wrapper").removeClass("d-none").addClass("red-cursor");
    $("#title-container").addClass("marvel-title-container");
    $(".container-fluid").removeClass("dc-background")
        .addClass("marvel-background");
    setTimeout(() => {
        $(".hero-game").removeClass("d-none");
        timer();
    }, 800);
});

$("#victory-modal").click(function() {
    location.reload();
});

$("#defeat-modal").click(function() {
    location.reload();
});

/* Buttons */

$(".restart-button").click(function() {
    location.reload();
});

$("#restart-game-modal").modal({
    backdrop: "static",
    keyboard: false
});

var cards = document.querySelectorAll(".hero-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let numberOfMoves = 0;
let match = 0;
let moves = document.getElementById("moves");
let highScore = 0;
let isSoundOn = true;

var flipSound = document.getElementById("cardFlipAudio");
var matchSound = document.getElementById("matchAudio");
var defeatSound = document.getElementById("defeatAudio");
var victorySound = document.getElementById("victoryAudio");
var sounds = document.getElementsByTagName("audio");

/* Toggle Mute */

$("#mute-button").click(function() {
    if (isSoundOn) {
        for (var i = 0; i < sounds.length; ++i) {
            sounds[i].muted = true;
        }
        isSoundOn = false;
    } else {
        for (var i = 0; i < sounds.length; ++i) {
            sounds[i].muted = false;
        }
        isSoundOn = true;
    }
});

/* Toggle sound icon */

function myFunction(x) {
    x.classList.toggle("fa-volume-up");
};

/* Flip */

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add("flip");
    flipSound.play();
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
    flipSound.play();
};

/* End Game Events */

function victory() {
    victorySound.play();
    $("#victory-modal").modal("show");
    document.getElementById("victory-modal-text").innerHTML = ("You have used " + numberOfMoves + " moves");
};

function defeat() {
    defeatSound.play();
    $("#defeat-modal").modal("show");
};

/* Timer */

function timer() {
    var count = 60,
        timer = setInterval(function() {
            $("#time-remaining").html(count--);
            if (count === -1) {
                defeat();
            } else if (match === 6) {
                clearInterval(timer);
            } else if (count <= 8) {
                $("#time-remaining").addClass("red-text")
            }
        }, 1000);
};

/* Chech for match*/

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    numberOfMoves++;
    this.moves.innerText = numberOfMoves;
    if (isMatch) {
        disableCards();
        matchSound.play();
        match++;
    } else {
        unflipCards();
    }
    setTimeout(() => {
        if (match === 6) {
            victory();
        }
    }, 1000);
};

/* Removes ability to click card */

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
};

/* Unflip cards */

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1500);
};

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
};

/* Shuffle cards */

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener("click", flipCard));