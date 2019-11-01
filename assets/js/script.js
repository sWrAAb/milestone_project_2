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
    /* timer();*/
});

$("#marvel-modal-image").click(function() {
    $("#starting-page").addClass("d-none");
    $("#dc-game").addClass("d-none");
    $("#marvel-game").removeClass("d-none");
    $("#body-wrapper").removeClass("d-none").addClass("red-cursor");
    $("#title-container").addClass("marvel-title-container");
    $(".container-fluid").removeClass("dc-background")
        .addClass("marvel-background");
    /* timer();*/
});

/*deckAnimation();*/

$("#victory-modal").click(function() {
    location.reload();
})

$("#defeat-modal").click(function() {
    location.reload();
})


$(".restart-button").click(function() {
    location.reload();
});

const cards = document.querySelectorAll(".hero-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let numberOfMoves = 0;
let match = 0;
let moves = document.getElementById("moves");
let highScore = 0;

var flipSound = document.getElementById("cardFlipAudio");
var matchSound = document.getElementById("matchAudio");
var defeatSound = document.getElementById("defeatAudio");
var victorySound = document.getElementById("victoryAudio");
var sounds = document.getElementsByTagName("audio");

$("#mute-button").click(function() {
    for (var i = 0; i < sounds.length; ++i) {

        sounds[i].muted = true;
    }
})

function myFunction(x) {
    x.classList.toggle("fa-volume-up");
}


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    flipSound.play();
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
    flipSound.play();
}

function timer() {
    var count = 10,
        timer = setInterval(function() {
            $("#time-remaining").html(count--);
            if (count === -1) {
                clearInterval(timer);
                setTimeout(() => {
                    defeatSound.play();
                    $("#defeat-modal").modal("show");
                }, 1000);
            }
        }, 1000);
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
            victorySound.play();
            $("#victory-modal").modal("show");
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

cards.forEach(card => card.addEventListener("click", flipCard));

// Register transitions

function deckAnimation() {
    $.Velocity
        .RegisterEffect("trans.slideUpIn", {
            defaultDuration: 400,
            calls: [
                [{ opacity: [1, 0], translateY: [0, 90] }]
            ]
        })
        .RegisterEffect("trans.slideDownOut", {
            defaultDuration: 400,
            calls: [
                [{ opacity: 0, translateY: 60 }]
            ],
            reset: { translateY: 0 }
        });

    // Initial selections
    var boxes = $('.hero-game');
    var btn = $('.modal-image');

    // Define transitions here for re-use
    var animIn = 'trans.slideUpIn';
    var animOut = 'trans.slideDownOut';

    // Select and slice divs
    var divs = boxes.find('div'),
        divsFirst = divs.slice(0, 6), // divs 1-6
        divsLast = divs.slice(6); // rest of the divs after #6

    btn.click(function() {
        var seq = [
            { elements: divs, properties: animOut, options: { display: false, easing: 'easeInCirc' } },
            { elements: divsFirst, properties: animIn, options: { stagger: 50, display: false, easing: 'easeOutCirc' } },
            { elements: divsLast, properties: 'transition.fadeIn', options: { duration: 400, display: false, easing: 'easeOutCirc' } }
        ];

        divs.velocity('stop');
        $.Velocity.RunSequence(seq);

    })
}