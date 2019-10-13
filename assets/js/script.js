$(document).ready(function() {

    ready()


    $("#universe-select-modal").modal("show");
    $("#body-wrapper").addClass("d-none");

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
        $(".front").hidden;
    });

    $(".hero-card").click(function() {
        $(this).flip();
    })



    $(".link-info-container").click(function() {
        $("#myModal").modal("show");
    })


});

function ready() {
    let cards = Array.from(document.getElementsByClassName("hero-card"))
}
cards.forEach(card => {
    card.addEventListener("click", () => {

    })
})





/*

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