const deck = document.getElementById("deck");
const cardArray = ["2_of_clubs.png","2_of_diamonds.png","2_of_hearts.png","2_of_spades.png","3_of_clubs.png","3_of_diamonds.png","3_of_hearts.png","3_of_spades.png","4_of_clubs.png","4_of_diamonds.png","4_of_hearts.png","4_of_spades.png","5_of_clubs.png","5_of_diamonds.png","5_of_hearts.png","5_of_spades.png","6_of_clubs.png","6_of_diamonds.png","6_of_hearts.png","6_of_spades.png","7_of_clubs.png","7_of_diamonds.png","7_of_hearts.png","7_of_spades.png","8_of_clubs.png","8_of_diamonds.png","8_of_hearts.png","8_of_spades.png","9_of_clubs.png","9_of_diamonds.png","9_of_hearts.png","9_of_spades.png","10_of_clubs.png","10_of_diamonds.png","10_of_hearts.png","10_of_spades.png","jack_of_clubs.png","jack_of_diamonds.png","jack_of_hearts.png","jack_of_spades.png","queen_of_clubs.png","queen_of_diamonds.png","queen_of_hearts.png","queen_of_spades.png","king_of_clubs.png","ace_of_clubs.png","ace_of_diamonds.png","ace_of_hearts.png","ace_of_spades.png"];
const cpu = document.getElementById("cpu");
const user = document.getElementById("user");
const start = document.getElementById("start");
let userTurn = true;
let cpuTurn = false;
let userCounter = 0;
let cpuCounter = 0;
const clickedArray = [];
let draw = false;
let gameStarter = true;
const turn = document.getElementById("turn");
const gameOver = document.getElementById("game-over");
const themes = document.getElementById("themes");
let cardColor = "black";


window.onload = function () {
    for(i = 0; i < cardArray.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        let cardFace = document.createElement("div");
        cardFace.classList.add("card-face");
        let faceImg = document.createElement("img");
        faceImg.src = `./images/${cardArray[i]}`;
        faceImg.alt = cardArray[i].slice(0,-4);
        card.setAttribute("data-card", cardArray[i].slice(0,1));
        cardFace.appendChild(faceImg);
        let cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        let backImg = document.createElement("img");
        backImg.src = `./images/card back black.png`;
        backImg.alt = "card back";
        cardBack.appendChild(backImg);
        card.appendChild(cardFace);
        card.appendChild(cardBack);
        deck.appendChild(card);
    }
}

function cardThrow () {
    for(i = 49; i > 0;i--) {
        let x = Math.floor(Math.random() * deck.children.length);
        if(userTurn === true) {
            user.appendChild(deck.children[x]);
            user.lastElementChild.style.left = userCounter + "%";
            userCounter += 3.7;
            cpuTurn = true;
            userTurn = false;
        } else if (cpuTurn === true) {
            cpu.appendChild(deck.children[x]);
            cpu.lastElementChild.style.left = cpuCounter + "%";
            cpuCounter += 3.7;
            cpuTurn = false;
            userTurn = true;
        }
    }

    for(i = 0; i < cpu.children.length; i++) {
        cpu.children[i].style.pointerEvents = "none";
        cpu.children[i].addEventListener("click", function () {
            if(userTurn === true && draw === true) {
                user.appendChild(this);
                this.addEventListener("click", function() {
                    if(this.classList.contains("clicked")) {
                       this.classList.remove("clicked");
                       clickedArray.splice(clickedArray.indexOf(this),1);
                    } else if(!this.classList.contains("clicked") && draw === false && userTurn === true && cpuTurn === false) {
                       this.classList.add("clicked");
                       clickedArray.push(this);
                       userCardEliminate();
                    }
               })
                let gapMargin = 100 / user.children.length - 0.5;
                userCounter = 0;
                for(i = 0; i < user.children.length; i++) {
                    user.children[i].style.left = userCounter * gapMargin + "%";
                    userCounter++;
                }
                let gapMargin1 = 100 / cpu.children.length - 0.5;
                cpuCounter = 0;
                for(i = 0; i < cpu.children.length; i++) {
                    cpu.children[i].style.left = cpuCounter * gapMargin1 + "%";
                    cpuCounter++;
                }
                draw = false;
                for(j = 0; j < cpu.children.length; j++) {
                    cpu.children[j].style.pointerEvents = "none";
                }
                for(k = 0; k < user.children.length; k++) {
                    user.children[k].style.pointerEvents = "all";
                }
                checker();
            }
        })
    }

    cardTrigger();
    setTimeout(function () {
        cpuCardEliminate();
    }, 2000);

    userTurn = true;
    cpuTurn = false;
    draw = false;
}

start.onclick = function () {
    this.parentElement.remove();
    for(i = 0; i < deck.children.length; i++) {
        deck.children[i].children[1].children[0].src = `./images/card back ${cardColor}.png`;
    }
    setTimeout(function() {
        cardThrow();
        turn.classList.remove("none");
    }, 2000);
}


function cardTrigger() {
    for(i = 0; i < user.children.length; i++) {
        user.children[i].addEventListener("click", function() {
             if(this.classList.contains("clicked")) {
                this.classList.remove("clicked");
                clickedArray.splice(clickedArray.indexOf(this),1);
             } else if(!this.classList.contains("clicked") && draw === false && userTurn === true && cpuTurn === false)  {
                this.classList.add("clicked");
                clickedArray.push(this);
                userCardEliminate();
             }
        })
    }
}

function userCardEliminate () {
    if(clickedArray.length === 2) {
        if(clickedArray[0].getAttribute("data-card") === clickedArray[1].getAttribute("data-card")) {
            clickedArray[0].remove();
            clickedArray[1].remove();
            clickedArray.pop();
            clickedArray.pop();
            let gapMargin = 100 / user.children.length - 0.5;
            userCounter = 0;
            for(i = 0; i < user.children.length; i++) {
                user.children[i].style.left = userCounter * gapMargin + "%";
                userCounter++;
            }
            checker();
        } else if(clickedArray[0].getAttribute("data-card") !== clickedArray[1].getAttribute("data-card")) {
            clickedArray[0].classList.remove("clicked");
            clickedArray[1].classList.remove("clicked");
            clickedArray.pop();
            clickedArray.pop();
        }
    }
}


function cpuCardEliminate() {
    let array1 = Array.from(cpu.children);
    let a = array1.filter(ele => ele.getAttribute("data-card") === "a");
    if(a.length === 2) {
         a[0].remove();
         a[1].remove();
    } else if(a.length === 3) {
        a[0].remove();
        a[1].remove();
    } else if(a.length === 4) {
        a[0].remove();
        a[1].remove();
        a[2].remove();
        a[3].remove();
    }
    let two = array1.filter(ele => ele.getAttribute("data-card") === "2");
    if(two.length === 2) {
         two[0].remove();
         two[1].remove();
    } else if(two.length === 3) {
        two[0].remove();
        two[1].remove();
    } else if(two.length === 4) {
        two[0].remove();
        two[1].remove();
        two[2].remove();
        two[3].remove();
    }
    let three = array1.filter(ele => ele.getAttribute("data-card") === "3");
    if(three.length === 2) {
         three[0].remove();
         three[1].remove();
    } else if(three.length === 3) {
        three[0].remove();
        three[1].remove();
    } else if(three.length === 4) {
        three[0].remove();
        three[1].remove();
        three[2].remove();
        three[3].remove();
    }
    let four = array1.filter(ele => ele.getAttribute("data-card") === "4");
    if(four.length === 2) {
         four[0].remove();
         four[1].remove();
    } else if(four.length === 3) {
       four[0].remove();
        four[1].remove();
    } else if(four.length === 4) {
        four[0].remove();
        four[1].remove();
        four[2].remove();
        four[3].remove();
    }
    let five = array1.filter(ele => ele.getAttribute("data-card") === "5");
    if(five.length === 2) {
         five[0].remove();
         five[1].remove();
    } else if(five.length === 3) {
        five[0].remove();
        five[1].remove();
    } else if(five.length === 4) {
        five[0].remove();
        five[1].remove();
        five[2].remove();
        five[3].remove();
    }
    let six = array1.filter(ele => ele.getAttribute("data-card") === "6");
    if(six.length === 2) {
         six[0].remove();
         six[1].remove();
    } else if(six.length === 3) {
        six[0].remove();
        six[1].remove();
    } else if(six.length === 4) {
        six[0].remove();
        six[1].remove();
        six[2].remove();
        six[3].remove();
    }
    let seven = array1.filter(ele => ele.getAttribute("data-card") === "7");
    if(seven.length === 2) {
         seven[0].remove();
         seven[1].remove();
    } else if(seven.length === 3) {
        seven[0].remove();
        seven[1].remove();
    } else if(seven.length === 4) {
        seven[0].remove();
        seven[1].remove();
        seven[2].remove();
        seven[3].remove();
    }
    let eight = array1.filter(ele => ele.getAttribute("data-card") === "8");
    if(eight.length === 2) {
         eight[0].remove();
         eight[1].remove();
    } else if(eight.length === 3) {
        eight[0].remove();
        eight[1].remove();
    } else if(eight.length === 4) {
        eight[0].remove();
       eight[1].remove();
        eight[2].remove();
        eight[3].remove();
    }
    let nine = array1.filter(ele => ele.getAttribute("data-card") === "9");
    if(nine.length === 2) {
         nine[0].remove();
         nine[1].remove();
    } else if(nine.length === 3) {
        nine[0].remove();
        nine[1].remove();
    } else if(nine.length === 4) {
        nine[0].remove();
        nine[1].remove();
        nine[2].remove();
        nine[3].remove();
    }
    let ten = array1.filter(ele => ele.getAttribute("data-card") === "1");
    if(ten.length === 2) {
         ten[0].remove();
         ten[1].remove();
    } else if(ten.length === 3) {
        ten[0].remove();
        ten[1].remove();
    } else if(ten.length === 4) {
        ten[0].remove();
        ten[1].remove();
        ten[2].remove();
        ten[3].remove();
    }
    let queen = array1.filter(ele => ele.getAttribute("data-card") === "q");
    if(queen.length === 2) {
         queen[0].remove();
         queen[1].remove();
    } else if(queen.length === 3) {
        queen[0].remove();
        queen[1].remove();
    } else if(queen.length === 4) {
        queen[0].remove();
        queen[1].remove();
        queen[2].remove();
        queen[3].remove();
    }
    let jack = array1.filter(ele => ele.getAttribute("data-card") === "j");
    if(jack.length === 2) {
         jack[0].remove();
        jack[1].remove();
    } else if(jack.length === 3) {
        jack[0].remove();
        jack[1].remove();
    } else if(jack.length === 4) {
        jack[0].remove();
        jack[1].remove();
        jack[2].remove();
        jack[3].remove();
    }
    let gapMargin = 100 / cpu.children.length - 0.5;
    cpuCounter = 0;
    for(i = 0; i < cpu.children.length; i++) {
        cpu.children[i].style.left = cpuCounter * gapMargin + "%";
        cpuCounter++;
    }
}

function checker () {
    let array1 = Array.from(user.children);
    let checkerArray = []
    let a = array1.filter(ele => ele.getAttribute("data-card") === "a");
    if(a.length <= 1) {
         a = true;
         checkerArray.push(a);
    } else {
        a = false;
        checkerArray.push(a);
    }
    let two = array1.filter(ele => ele.getAttribute("data-card") === "2");
    if(two.length <= 1) {
        two = true;
        checkerArray.push(two);
    }  else {
        two = false;
        checkerArray.push(two);
    }
    let three = array1.filter(ele => ele.getAttribute("data-card") === "3");
    if(three.length <= 1) {
        three = true;
        checkerArray.push(three);
    }  else {
        three = false;
        checkerArray.push(three);
    }
    let four = array1.filter(ele => ele.getAttribute("data-card") === "4");
    if(four.length <= 1) {
        four = true;
        checkerArray.push(four);
    }  else {
        four = false;
        checkerArray.push(four);
    }
    let five = array1.filter(ele => ele.getAttribute("data-card") === "5");
    if(five.length <= 1) {
        five = true;
        checkerArray.push(five);
    }  else {
        five = false;
        checkerArray.push(five);
    }
    let six = array1.filter(ele => ele.getAttribute("data-card") === "6");
    if(six.length <= 1) {
        six = true;
        checkerArray.push(six);
    }  else {
        six = false;
        checkerArray.push(six);
    }
    let seven = array1.filter(ele => ele.getAttribute("data-card") === "7");
    if(seven.length <= 1) {
        seven = true;
        checkerArray.push(seven);
    }  else {
        seven = false;
        checkerArray.push(seven);
    }
    let eight = array1.filter(ele => ele.getAttribute("data-card") === "8");
    if(eight.length <= 1) {
        eight = true;
        checkerArray.push(eight);
    }  else {
        eight = false;
        checkerArray.push(eight);
    }
    let nine = array1.filter(ele => ele.getAttribute("data-card") === "9");
    if(nine.length <= 1) {
        nine = true;
        checkerArray.push(nine);
    }  else {
        nine = false;
        checkerArray.push(nine);
    }
    let ten = array1.filter(ele => ele.getAttribute("data-card") === "1");
    if(ten.length <= 1) {
        ten = true;
        checkerArray.push(ten);
    }  else {
        ten = false;
        checkerArray.push(ten);
    }
    let queen = array1.filter(ele => ele.getAttribute("data-card") === "q");
    if(queen.length <= 1) {
        queen = true;
        checkerArray.push(queen);
    }  else {
        queen = false;
        checkerArray.push(queen);
    }
    let jack = array1.filter(ele => ele.getAttribute("data-card") === "j");
    if(jack.length <= 1) {
        jack = true;
        checkerArray.push(jack);
    }  else {
        jack = false;
        checkerArray.push(jack);
    }

    let startGame = checkerArray.every(ele => ele === true);
    let turnTurn = checkerArray.every(ele => ele === true);
    if(startGame && gameStarter) {
        document.getElementById("start-game").classList.remove("none");
        for(i = 0; i < user.children.length; i++) {
            user.children[i].style.pointerEvents = "none";
        }
        gameStarter = false;
    } else if (turnTurn && gameStarter === false) {
        for(i = 0; i < user.children.length; i++) {
            user.children[i].style.pointerEvents = "none";
        }
        userTurn = false;
        cpuTurn = true;
        winnerDecider();
        turnDecider();
        cpuPlay();
        
    }
}

document.getElementById("start-game").onclick = function () {
    this.remove();
    userTurn = true;
    cpuTurn = false;
    draw = true;
    turnDecider();
    for(j = 0; j < cpu.children.length; j++) {
        cpu.children[j].style.pointerEvents = "all";
    }
}

function cpuPlay() {
    if(cpuTurn === true && userTurn === false) {
        setTimeout(function () {
            let array1 = Array.from(user.children);
            let pickedCard = Math.floor(Math.random() * array1.length);
            cpu.appendChild(array1[pickedCard]);
            let gapMargin = 100 / user.children.length - 0.5;
            userCounter = 0;
            for(i = 0; i < user.children.length; i++) {
                user.children[i].style.left = userCounter * gapMargin + "%";
                userCounter++;
            }
            let gapMargin1 = 100 / cpu.children.length - 0.5;
            cpuCounter = 0;
            for(i = 0; i < cpu.children.length; i++) {
                cpu.children[i].style.left = cpuCounter * gapMargin1 + "%";
                cpuCounter++;
            }
            array1[pickedCard].addEventListener("click", function () {
                if(userTurn === true && draw === true) {
                    user.appendChild(this);
                    array1[pickedCard].addEventListener("click", function() {
                        if(this.classList.contains("clicked")) {
                           this.classList.remove("clicked");
                           clickedArray.splice(clickedArray.indexOf(this),1);
                        } else if(!this.classList.contains("clicked") && draw === false && userTurn === true && cpuTurn === false)  {
                           this.classList.add("clicked");
                           clickedArray.push(this);
                           userCardEliminate();
                        }
                   })
                    let gapMargin = 100 / user.children.length - 0.5;
                    userCounter = 0;
                    for(i = 0; i < user.children.length; i++) {
                        user.children[i].style.left = userCounter * gapMargin + "%";
                        userCounter++;
                    }
                    let gapMargin1 = 100 / cpu.children.length - 0.5;
                    cpuCounter = 0;
                    for(i = 0; i < cpu.children.length; i++) {
                        cpu.children[i].style.left = cpuCounter * gapMargin1 + "%";
                        cpuCounter++;
                    }
                    draw = false;
                    for(j = 0; j < cpu.children.length; j++) {
                        cpu.children[j].style.pointerEvents = "none";
                    }
                    for(k = 0; k < user.children.length; k++) {
                        user.children[k].style.pointerEvents = "all";
                    }
                    checker();
                }
            })
        }, 2000);

        setTimeout(function () {
            for(i = 0; i < cpu.children.length; i++) {
                cpu.children[i].classList.add("fade");
            }
        }, 3500);

        setTimeout(function() {
            cpuCardEliminate();
        }, 5000)

        setTimeout(function () {
            let reArrangeArray = Array.from(cpu.children);
            for(i = 0; i < reArrangeArray.length; i++) {
                reArrangeArray[i].remove();
            }

            for(i = reArrangeArray.length; i > 0; i--) {
                let reArrangeCard = Math.floor(Math.random() * reArrangeArray.length);
                cpu.appendChild(reArrangeArray[reArrangeCard]);
                reArrangeArray.splice(reArrangeCard,1);
            }

            let gapMargin1 = 100 / cpu.children.length - 0.5;
            cpuCounter = 0;
            for(i = 0; i < cpu.children.length; i++) {
                cpu.children[i].style.left = cpuCounter * gapMargin1 + "%";
                cpuCounter++;
            }

        }, 6100);

        setTimeout (function() {
            for(i = 0; i < cpu.children.length; i++) {
                cpu.children[i].classList.remove("fade");
            }

            cpuTurn = false;
            userTurn = true;
            draw = true;
            winnerDecider();
            turnDecider();
            for(j = 0; j < cpu.children.length; j++) {
                cpu.children[j].style.pointerEvents = "all";
            }
        }, 7000);
    }
}

function turnDecider() {
    if(userTurn === true) {
        turn.children[0].textContent = "User Turn";
    } else if(cpuTurn === true) {
        turn.children[0].textContent = "CPU Turn";
    }
}

function winnerDecider() {
    if(user.children.length === 0) {
        gameOver.children[0].textContent = "USER WON";
        gameOver.classList.add("active");
        userTurn = false;
        cpuTurn = false;
    } else if(cpu.children.length === 0) {
        gameOver.children[0].textContent = "CPU WON";
        gameOver.classList.add("active");
        userTurn = false;
        cpuTurn = false;
    }
}

gameOver.children[1].onclick = function () {
    window.location.reload();
}


for(i = 0; i < themes.children.length; i++) {
    themes.children[i].addEventListener("click", function() {
        for(k = 0; k < themes.children.length; k++) {
            themes.children[k].classList.remove("active");
        }
        cardColor = this.getAttribute("data-color");
        this.classList.add("active");
    })
}