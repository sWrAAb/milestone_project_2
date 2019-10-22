/*----Modal starts on page load----*/

$("#universe-select-modal").modal("show");
$("#body-wrapper").addClass("d-none");

/*----Modal has two images. Each one loads different part of page.----*/

$("#dc-modal-image").click(function() {
    $("#starting-page").addClass("d-none");
    $("#dc-game").removeClass("d-none");
    $("#marvel-game").addClass("d-none");
    $("#body-wrapper").removeClass("d-none");
    $(".container-fluid").removeClass("marvel-background")
        .addClass("dc-background");
});


$("#marvel-modal-image").click(function() {
    $("#starting-page").addClass("d-none");
    $("#dc-game").addClass("d-none");
    $("#marvel-game").removeClass("d-none");
    $("#body-wrapper").removeClass("d-none");
    $(".container-fluid").removeClass("dc-background")
        .addClass("marvel-background");
});

/*----Button for Univers Change. Brings back starting modal----*/

$(".link-info-container").click(function() {
    $("#myModal").modal("show");
})

/*----Game----*/

const cards = document.querySelectorAll(".hero-card");

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;
    }
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        disableCards();
    } else {
        unflipCards()
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
    }, 1500);


}


cards.forEach(card => card.addEventListener("click", flipCard));
















/*

    var heroCardArray = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6"];
    var heroCard_values = [];
    var heroCard_ids = [];
    var heroCard_flipped = 0;




*/





/*

    Array.prototype.heroCard_shuffle = function() {
        var i = this.length,
            j, temp;
        while (--i > 0) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this[j];
            this[j] = this[i];
            this[i] = temp;
        }
    }

    function newBoard() {
        tiles_flipped = 0;
        var output = "";
        memory_array.heroCard_shuffle();
        for (var i = 0; i < heroCardArray.length; i++) {
            output += '<div id="card_' + i + '" onclick="heroCardFlip(this,\'' + memory_array[i] + '\')"></div>';
        }
        document.getElementsByClassName("game-container").innerHTML = output;
    }

    function heroCardFlip(tile, val) {
        if (tile.innerHTML == "" && heroCard_values.length < 2) {
            tile.style.background = '#FFF';
            tile.innerHTML = val;
            if (heroCard_values.length == 0) {
                heroCard_values.push(val);
                heroCard_ids.push(card.id);
            } else if (memory_values.length == 1) {
                heroCard_values.push(val);
                heroCard_ids.push(tile.id);
                if (heroCard_values[0] == heroCard_values[1]) {
                    heroCard_flipped += 2;
                    // Clear both arrays
                    heroCard_values = [];
                    heroCard_ids = [];
                    // Check to see if the whole board is cleared
                    if (tiles_flipped == heroCardArray.length) {
                        alert("Board cleared... generating new board");
                        document.getElementsByClassName("game-container").innerHTML = "";
                        newBoard();
                    }
                } else {
                    function flip2Back() {
                        // Flip the 2 tiles back over
                        var tile_1 = document.getElementById(heroCard_ids[0]);
                        var tile_2 = document.getElementById(heroCard_ids[1]);
                        tile_1.style.background = 'url(tile_bg.jpg) no-repeat';
                        tile_1.innerHTML = "";
                        tile_2.style.background = 'url(tile_bg.jpg) no-repeat';
                        tile_2.innerHTML = "";
                        // Clear both arrays
                        memory_values = [];
                        memory_tile_ids = [];
                    }
                    setTimeout(flip2Back, 700);
                }
            }
        }
    }






    function deckAnimation() {

        // Register transitions
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
        var heroCardContainer = $('.hero-card-container');
        var btn = $('.world-select-button');

        // Define transitions here for re-use
        var animIn = 'trans.slideUpIn';
        var animOut = 'trans.slideDownOut';

        // Select and slice divs
        var divs = heroCardContainer.find('div'),
            divsFirst = divs.slice(0, 6), // divs 1-6
            divsLast = divs.slice(6); // rest of the divs after #6

        btn.click(function() {

            // Button effect
            $(this)
                .velocity({ scale: 0.95 }, 100).velocity({ scale: 1 }, 100)
                .velocity({ backgroundColor: '#eee' }, { duration: 100, queue: false })
                .velocity({ backgroundColor: '#fafafa' }, 300);

            // Box animations   
            var seq = [
                { elements: divs, properties: animOut, options: { display: false, easing: 'easeInCirc' } },
                { elements: divsFirst, properties: animIn, options: { stagger: 50, display: false, easing: 'easeOutCirc' } },
                { elements: divsLast, properties: 'transition.fadeIn', options: { duration: 400, display: false, easing: 'easeOutCirc' } }
            ];

            divs.velocity('stop');
            $.Velocity.RunSequence(seq);

        })
    };

    deckAnimation();

    */