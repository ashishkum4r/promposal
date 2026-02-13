const container = document.querySelector(".container");
const buttonsDiv = document.querySelector(".buttons");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

function moveNoButton() {

    const buttonsRect = buttonsDiv.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    const containerRect = container.getBoundingClientRect();

    const padding = 10;

    const maxX = buttonsDiv.clientWidth - btnRect.width - padding;
    const maxY = buttonsDiv.clientHeight - btnRect.height - padding;

    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;

    const proposedLeft = buttonsRect.left + newX;
    const proposedTop = buttonsRect.top + newY;

    const overlap =
        proposedLeft < yesRect.right &&
        proposedLeft + btnRect.width > yesRect.left &&
        proposedTop < yesRect.bottom &&
        proposedTop + btnRect.height > yesRect.top;

    if (!overlap) {
        noBtn.style.position = "absolute";
        noBtn.style.left = newX + "px";
        noBtn.style.top = newY + "px";
    }

    let noSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
    if (noSize > 10) {
        noBtn.style.fontSize = (noSize - 1) + "px";
    }

    let yesSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = (yesSize + 2) + "px";

}

container.addEventListener("mousemove", function (e) {

    const noRect = noBtn.getBoundingClientRect();

    const distanceX = Math.abs(e.clientX - (noRect.left + noRect.width / 2));
    const distanceY = Math.abs(e.clientY - (noRect.top + noRect.height / 2));

    if (distanceX < 80 && distanceY < 80) {
        moveNoButton();
    }
});

noBtn.addEventListener("click", function (e) {
    e.preventDefault();
    moveNoButton();
});



function spawnConfettiBurst() {

    for (let i = 0; i < 500; i++) {

        let confetti = document.createElement("div");
        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.top = "-150px";

        const colors = ["#ff4d6d", "#ff9eb5", "#ffb3c6", "#ffffff", "#ff85a2", "#ffd6e0"];
        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        let size = Math.random() * 10 + 6;
        confetti.style.width = size + "px";
        confetti.style.height = size + "px";

        let xMove = (Math.random() - 0.5) * 900;
        let yMove = Math.random() * 1200 + 600;

        let rotate = Math.random() * 1440;

        confetti.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${xMove}px, ${yMove}px) rotate(${rotate}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 3000,
            easing: "ease-out",
            fill: "forwards"
        });

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
}


function goToNext() {

    spawnConfettiBurst();

    setTimeout(() => {

        const oldBox = document.querySelector(".container");

        oldBox.classList.add("slide-down");

        setTimeout(() => {

            oldBox.remove();

            const newBox = document.createElement("div");
            newBox.classList.add("container", "new-box");

            newBox.innerHTML = `
                <img src="images/catty.png" class="question-image">

                <h1>YAYYYYY 💖</h1>

                <p>
                    'then god said, <br>
                    "Go with Ashish"'<br>
                            - PROM 20:26<br>
                    <br>
                    (click on the cat hihi 🤭)
                </p>
            `;

            document.getElementById("scene").appendChild(newBox);


            setTimeout(() => {
            const meowWrapper = document.createElement("div");
            meowWrapper.classList.add("meow-wrapper");

            const meow = document.createElement("img");
            meow.src = "images/meow.png";
            meow.classList.add("meow-image");

            meowWrapper.appendChild(meow);
            document.getElementById("scene").appendChild(meowWrapper);


            meowWrapper.style.cursor = "pointer";

            meowWrapper.addEventListener("click", function () {
                meowWrapper.addEventListener("click", function () {

                    const scene = document.getElementById("scene");
                    const videoPanel = document.getElementById("video-panel");
                    const video = document.getElementById("surpriseVideo");

                    scene.classList.add("slide-left");
                    videoPanel.classList.add("active");

                    setTimeout(() => {
                        video.play();
                    }, 1000);  
                });

            });

                setTimeout(() => {
                    meowHeartBurst(meow);
                    const newBoxElement = document.querySelector(".container");

                    setTimeout(() => {
                        newBoxElement.classList.add("glow");
                    }, 800);   

                }, 750);

                setTimeout(() => {
                    meowWrapper.classList.add("scale-up");
                }, 800);

            }, 600); 

        }, 700);

    }, 600);
}

function createFloatingImages() {

    const images = [
        "images/heart1.png",
        "images/heart2.png"
    ];

    setInterval(() => {

        let img = document.createElement("img");
        img.classList.add("floating-image");

        img.src = images[Math.floor(Math.random() * images.length)];

        img.style.left = Math.random() * 100 + "vw";

        let size = Math.random() * 200 + 300;
        img.style.width = size + "px";

        let angle = Math.random() * 60 - 30;
        img.style.setProperty("--angle", angle + "deg");

        document.body.appendChild(img);

        setTimeout(() => {
            img.remove();
        }, 6000);

    }, 500);
}

createFloatingImages();

function meowHeartBurst(meowElement) {

    const rect = meowElement.getBoundingClientRect();

    const hiddenRightOffset = 230;

    const centerX = rect.left + (rect.width - hiddenRightOffset) / 2 - 100;  
    const centerY = rect.top + rect.height / 2 - 170;                      


    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    for (let i = 0; i < 18; i++) {

        const heart = document.createElement("div");
        heart.classList.add("meow-heart");
        heart.innerText = "💖";

        heart.style.fontSize = (Math.random() * 130 + 150) + "px";

        heart.style.left = centerX + "px";
        heart.style.top = centerY + "px";

        heart.style.transform = "translate(-50%, -50%)";

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.max(screenWidth, screenHeight);

        const xMove = Math.cos(angle) * distance;
        const yMove = Math.sin(angle) * distance;

        heart.style.setProperty("--x", xMove + "px");
        heart.style.setProperty("--y", yMove + "px");

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1800);
    }
}
