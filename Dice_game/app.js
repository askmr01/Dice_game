var MAX = prompt("Set winning score:");
while(!MAX || MAX<=0 || (Number(MAX)===NaN)){
    MAX = prompt("Set valid winning score (>0):")
}
MAX = Number(MAX);

var p0CurrSc = 0;
var p1CurrSc = 0;
var p0TotSc = 0;
var p1TotSc = 0;
var winner;

var rdSel = document.querySelector('.rd');
var ngSel = document.querySelector('.ng');
var holdSel = document.querySelector('.hold');
var p0Sel = document.querySelector('.player-0');
var p1Sel = document.querySelector('.player-1');
var p0CurrScSel = document.querySelector('.player-0 .current-sc');
var p1CurrScSel = document.querySelector('.player-1 .current-sc');
var p0TotScSel = document.querySelector('.player-0 .total-sc');
var p1TotScSel = document.querySelector('.player-1 .total-sc');
var p0CurrArSel = document.querySelector('.player-0 .current');
var p1CurrArSel = document.querySelector('.player-1 .current');
var finalDecSel = document.querySelector('.final-dec');
var imgSel = document.querySelector('.img-fluid')

function rollDice(){
    var rand = Math.floor(Math.random()*6 +1);
    imgSel.setAttribute("src", `images/dice-${rand}.png`);
    return rand;
}

function isActive(player){
    return player.classList.contains("active");
}

function removeActiveStatus(val){
    if(val===0){
        p0Sel.classList.remove("active");
        p1Sel.classList.add("active");
    }
    else{
        p1Sel.classList.remove("active");
        p0Sel.classList.add("active");
    }
}

function disableFurther(){
    holdSel.setAttribute("disabled","");
    rdSel.setAttribute("disabled","");
}

function makeWin(player){
    let playerArea;
    let plCurrArea;

    if(!player){
        playerArea = p0Sel;
        plCurrArea = p0CurrArSel;
        winner = 0;
    }
    else{
        playerArea = p1Sel;
        plCurrArea = p1CurrArSel;
        winner = 1;
    }
    
    playerArea.classList.add("green");
    plCurrArea.classList.add("darkgreen");
    finalDecSel.textContent =  `Player ${player+1} wins!`;
    finalDecSel.classList.remove("hidden");
    disableFurther();
}

function resetP0(){
    p0CurrSc = 0;
    p0TotSc = 0;
    if(!winner){
        p0Sel.classList.remove("green");
        p0CurrArSel.classList.remove("darkgreen");
    }
    
    p0CurrScSel.textContent = 0;
    p0TotScSel.textContent = 0;
    p1CurrScSel.textContent = 0;
    p1TotScSel.textContent = 0;
}

function resetP1(){
    p1CurrSc = 0;
    p1TotSc = 0;
    if(winner){
        p1Sel.classList.remove("green");
        p1CurrArSel.classList.remove("darkgreen");
    }
    
    p1CurrScSel.textContent = 0;
    p1TotScSel.textContent = 0;
    p0CurrScSel.textContent = 0;
    p0TotScSel.textContent = 0;
}

rdSel.addEventListener('click', function(event){
    //console.log(event);
    if(imgSel.classList.contains("hidden")===true){
        imgSel.classList.remove("hidden");
    }
    var diceVal = rollDice();
    
    //console.log(diceVal);
    if(isActive(p0Sel)===true){
        if(diceVal === 1){
            //console.log("p0 got 1");
            p0CurrSc = 0;
            diceVal = 0;
            removeActiveStatus(0);
        }
        p0CurrSc += diceVal;
        p0CurrScSel.textContent = p0CurrSc;
    }
    else{
        if(diceVal === 1){
            //console.log("p1 got 1");
            p1CurrSc = 0;
            diceVal = 0;
            removeActiveStatus(1);
        }
        p1CurrSc += diceVal;
        p1CurrScSel.textContent = p1CurrSc;
    }
});

holdSel.addEventListener('click', function(event){
    if(isActive(p0Sel)===true){
       //console.log("p0 holds");

        p0TotSc += p0CurrSc;
        if(p0TotSc >= MAX){
            p0TotSc = MAX;
            makeWin(0);
        }
        p0TotScSel.textContent = p0TotSc;
        p0CurrSc = 0;
        p0CurrScSel.textContent = 0;
        if(p0TotSc<MAX){
            removeActiveStatus(0);
        }
    }
    else{
        //console.log("p1 holds");

        p1TotSc += p1CurrSc;
        if(p1TotSc >= MAX){
            p1TotSc = MAX;
            makeWin(1);
        }
        p1TotScSel.textContent = p1TotSc;
        p1CurrSc = 0;
        p1CurrScSel.textContent = 0;
        if(p1TotSc<MAX){
            removeActiveStatus(1);
        }
    }
});

ngSel.addEventListener('click', function(event){
    resetP1();
    resetP0();
    holdSel.removeAttribute("disabled");
    rdSel.removeAttribute("disabled");
    finalDecSel.classList.add("hidden");
    imgSel.classList.add("hidden");
    removeActiveStatus(1);
});