/*$("#defeat-modal").modal("show");*/


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
    timer();
});

$("#marvel-modal-image").click(function() {
    $("#starting-page").addClass("d-none");
    $("#dc-game").addClass("d-none");
    $("#marvel-game").removeClass("d-none");
    $("#body-wrapper").removeClass("d-none").addClass("red-cursor");
    $("#title-container").addClass("marvel-title-container");
    $(".container-fluid").removeClass("dc-background")
        .addClass("marvel-background");
    timer();
});

$("#victory-modal").click(function() {
    location.reload();
});

$("#defeat-modal").click(function() {
    location.reload();
});


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

function myFunction(x) {
    x.classList.toggle("fa-volume-up");
};


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

function timer() {
    var count = 30,
        timer = setInterval(function() {
            $("#time-remaining").html(count--);
            if (count === -1) {
                clearInterval(timer);
                setTimeout(() => {
                    defeatSound.play();
                    $("#defeat-modal").modal("show");
                }, 1000);
            };
        }, 1000);
};

function stopTimer() {
    clearInterval(timer);
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    numberOfMoves++;
    this.moves.innerText = numberOfMoves;
    if (isMatch) {
        disableCards();
        matchSound.play();
        match++;
    } else {
        unflipCards()
    }
    setTimeout(() => {
        if (match === 6) {
            clearInterval(timer);
            victorySound.play();
            victoryRedirect()
            $("#victory-modal").modal("show");
            $(".victory-modal-text").html("You have used " + numberOfMoves + " moves");
        }
    }, 1000);
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();


/*
function victoryRedirect() {
    location.replace("victory.html");
    redirectBack();
}

function redirectBack() {
    $(body).click(function() {
        location.replace("index.html");
    })
}*/





cards.forEach(card => card.addEventListener("click", flipCard));