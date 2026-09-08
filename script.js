/* =========================================================
   FIND IMPORTANT ELEMENTS
========================================================= */

const song = document.getElementById("birthdaySong");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const noMessage = document.getElementById("noMessage");

const questionScreen =
    document.getElementById("questionScreen");

const messageScreen =
    document.getElementById("messageScreen");

const photoScreen =
    document.getElementById("photoScreen");

const flowerScreen =
    document.getElementById("flowerScreen");

const photoNextButton =
    document.getElementById("photoNextButton");

const flowerNextButton =
    document.getElementById("flowerNextButton");

const bouquet =
    document.getElementById("bouquet");

const bouquetFlowers =
    document.getElementById("bouquetFlowers");

const bouquetMessage =
    document.getElementById("bouquetMessage");

const finalMessage =
    document.getElementById("finalMessage");



/* =========================================================
   MUSIC
========================================================= */

/*
   Browsers usually don't allow music to autoplay
   before the user interacts with the website.

   Clicking YES starts the song.
*/

function startMusic() {

    song.volume = 0.45;

    song.play().catch(function () {

        console.log(
            "Music needs another user interaction."
        );

    });

}



/* =========================================================
   SCREEN SWITCHING
========================================================= */

function showScreen(screenToShow) {

    const allScreens =
        document.querySelectorAll(".screen");

    allScreens.forEach(function(screen) {

        screen.classList.remove("active");

    });

    screenToShow.classList.add("active");

    /*
       Put the user back at the top of the new section.
    */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* =========================================================
   YES BUTTON
========================================================= */
yesButton.addEventListener("click", function() {

    // Start music
    startMusic();

    // Send notification to my email
    emailjs.send("service_v7envk4", "template_q3dl09a", {
        name: "Birthday Website",
        email: "",
        title: "He clicked YES!",
        message: "Someone just clicked YES on the birthday website! 💛"
    }).then(function() {
        console.log("Notification sent!");
    }).catch(function(error) {
        console.log("Notification failed:", error);
    });

    // Change button text
    yesButton.innerText = "I KNEW IT 💛";

    // Move to birthday message
    setTimeout(function() {
        showScreen(messageScreen);
    }, 600);

});



/* =========================================================
   NO BUTTON — RUNS AWAY
========================================================= */

/*
   This button doesn't stay in one place.

   When the user tries to hover/touch it,
   it moves somewhere else on the screen.
*/

function moveNoButton() {

    const buttonWidth =
        noButton.offsetWidth;

    const buttonHeight =
        noButton.offsetHeight;


    /*
       Keep the button inside the visible screen.
    */

    const maxX =
        window.innerWidth - buttonWidth - 20;

    const maxY =
        window.innerHeight - buttonHeight - 20;


    const randomX =
        Math.max(
            10,
            Math.floor(Math.random() * maxX)
        );

    const randomY =
        Math.max(
            10,
            Math.floor(Math.random() * maxY)
        );


    /*
       Fixed position lets it escape anywhere.
    */

    noButton.style.position = "fixed";

    noButton.style.left =
        randomX + "px";

    noButton.style.top =
        randomY + "px";


    /*
       Cute messages.
    */

    const messages = [
        "Nope 😭",
        "Try YES 😌",
        "You can't catch me 🦇",
        "Wrong button 😂",
        "Nice try 👀",
        "YES is waiting 💛",
        "Why are you running after me? 😭"
    ];


    const randomMessage =
        messages[
            Math.floor(
                Math.random() * messages.length
            )
        ];


    noMessage.innerText =
        randomMessage;

}


/*
   Desktop
*/

noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


/*
   Mobile / touch

   touchstart happens before an actual click,
   so the button escapes before it can be pressed.
*/

noButton.addEventListener(
    "touchstart",
    function(event) {

        event.preventDefault();

        moveNoButton();

    },
    {
        passive: false
    }
);


/*
   Just in case someone manages to click it.
*/

noButton.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        moveNoButton();

    }
);



/* =========================================================
   MESSAGE → PHOTO
========================================================= */

photoNextButton.addEventListener(
    "click",
    function() {

        showScreen(photoScreen);

    }
);



/* =========================================================
   PHOTO → FLOWERS
========================================================= */

flowerNextButton.addEventListener(
    "click",
    function() {

        showScreen(flowerScreen);

    }
);



/* =========================================================
   FLOWER DRAGGING
========================================================= */

const flowers =
    document.querySelectorAll(".flower");


/*
   Keep track of the flower being dragged.
*/

let draggedFlower = null;


/* =========================================================
   START DRAG
========================================================= */

flowers.forEach(function(flower) {

    flower.addEventListener(
        "dragstart",
        function(event) {

            draggedFlower = flower;

            event.dataTransfer.effectAllowed =
                "move";

            flower.style.opacity = "0.4";

        }
    );


    flower.addEventListener(
        "dragend",
        function() {

            flower.style.opacity = "1";

            draggedFlower = null;

        }
    );

});



/* =========================================================
   BOUQUET DRAG OVER
========================================================= */

bouquet.addEventListener(
    "dragover",
    function(event) {

        event.preventDefault();

        bouquet.classList.add("drag-over");

    }
);



/* =========================================================
   LEAVE BOUQUET
========================================================= */

bouquet.addEventListener(
    "dragleave",
    function() {

        bouquet.classList.remove("drag-over");

    }
);



/* =========================================================
   DROP FLOWER
========================================================= */

bouquet.addEventListener(
    "drop",
    function(event) {

        event.preventDefault();

        bouquet.classList.remove("drag-over");


        if (!draggedFlower) {
            return;
        }


        /*
           Get the flower emoji.
        */

        const flowerEmoji =
            draggedFlower.dataset.flower;


        /*
           Create a new flower inside bouquet.
        */

        const newFlower =
            document.createElement("span");

        newFlower.classList.add(
            "bouquet-flower"
        );

        newFlower.innerText =
            flowerEmoji;


        bouquetFlowers.appendChild(
            newFlower
        );


        /*
           Remove original flower
           so it can only be used once.
        */

        draggedFlower.remove();


        /*
           Count flowers.
        */

        const remainingFlowers =
            document.querySelectorAll(
                ".flower"
            ).length;


        const placedFlowers =
            bouquetFlowers.children.length;


        /*
           Messages change as the bouquet grows.
        */

        if (placedFlowers === 1) {

            bouquetMessage.innerText =
                "One flower for you. 🌹";

        }

        else if (placedFlowers === 3) {

            bouquetMessage.innerText =
                "It's starting to look like a bouquet. 🌸";

        }

        else if (placedFlowers === 5) {

            bouquetMessage.innerText =
                "Almost complete... 💛";

        }

        else if (remainingFlowers === 0) {

            bouquetMessage.innerText =
                "Your bouquet is complete. 🖤💛";

            finalMessage.classList.add(
                "show"
            );

        }

    }
);



/* =========================================================
   EXTRA: ALLOW CLICKING FLOWERS ON MOBILE
========================================================= */

/*
   Dragging can be difficult on some phones.

   So tapping a flower also puts it into the bouquet.
*/

flowers.forEach(function(flower) {

    flower.addEventListener(
        "click",
        function() {

            /*
               Don't add it twice.
            */

            if (!flower.parentElement) {
                return;
            }


            const flowerEmoji =
                flower.dataset.flower;


            const newFlower =
                document.createElement("span");

            newFlower.classList.add(
                "bouquet-flower"
            );

            newFlower.innerText =
                flowerEmoji;


            bouquetFlowers.appendChild(
                newFlower
            );


            flower.remove();


            const remainingFlowers =
                document.querySelectorAll(
                    ".flower"
                ).length;


            const placedFlowers =
                bouquetFlowers.children.length;


            if (placedFlowers === 1) {

                bouquetMessage.innerText =
                    "One flower for you. 🌹";

            }

            else if (placedFlowers === 3) {

                bouquetMessage.innerText =
                    "It's starting to look like a bouquet. 🌸";

            }

            else if (placedFlowers === 5) {

                bouquetMessage.innerText =
                    "Almost complete... 💛";

            }


            if (remainingFlowers === 0) {

                bouquetMessage.innerText =
                    "Your bouquet is complete. 🖤💛";

                finalMessage.classList.add(
                    "show"
                );

            }

        }
    );

});
