let spin = 0;
let party = 0;
let spinMultiple = 1;
let spinsPerClick = 1;
let autoClickInterval = 1000;
let money = 0;
let costOfParty = 10;
let costOfSpinUpgrade = 50;
let costOfIntervalUpgrade = 100;
let intervalID = null;
let arePartyActive = false;
let hasReached50k = false;  

const noOFspin = document.getElementById("no_of_spin");
const noOFparty = document.getElementById("no_of_party");
const noOFmoney = document.getElementById('no_of_money');
const costOFpartyDisplay = document.getElementById('cost_of_party');
const costOFspinUpgradeDisplay = document.getElementById('cost_of_spin_upgrade');
const costOFintervalUpgradeDisplay = document.getElementById('cost_of_interval_upgrade');
const catFlip = document.getElementById("test");


function checkMoney() {
    if (money >= 10000 && !hasReached50k) {
        alert("hmmmmm what in 50K? go find it");  
        hasReached50k = true;  
    }
    noOFmoney.innerHTML = money; 
}


function loadGameState() {
    const savedState = JSON.parse(localStorage.getItem('gameState'));
    if (savedState) {
        spin = savedState.spin || spin;
        party = savedState.party || party;
        spinMultiple = savedState.spinMultiple || spinMultiple;
        spinsPerClick = savedState.spinsPerClick || spinsPerClick;
        autoClickInterval = savedState.autoClickInterval || autoClickInterval;
        money = savedState.money || money;
        costOfParty = savedState.costOfParty || costOfParty;
        costOfSpinUpgrade = savedState.costOfSpinUpgrade || costOfSpinUpgrade;
        costOfIntervalUpgrade = savedState.costOfIntervalUpgrade || costOfIntervalUpgrade;
        noOFspin.innerHTML = spin;
        noOFparty.innerHTML = party;
        noOFmoney.innerHTML = money;
        costOFpartyDisplay.innerHTML = costOfParty;
        costOFspinUpgradeDisplay.innerHTML = costOfSpinUpgrade;
        costOFintervalUpgradeDisplay.innerHTML = costOfIntervalUpgrade;
        if (party > 0 && !arePartyActive) {
            arePartyActive = true;
            intervalID = setInterval(catmakespin, autoClickInterval);
        }
    }
}


function saveGameState() {
    const gameState = {
        spin,
        party,
        spinMultiple,
        spinsPerClick,
        autoClickInterval,
        money,
        costOfParty,
        costOfSpinUpgrade,
        costOfIntervalUpgrade
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

function makespin() {
    spin += spinsPerClick;
    noOFspin.innerHTML = spin;
    if (spin % 2 === 0) {
        catFlip.style.transform = "rotateY(180deg)";
    } else {
        catFlip.style.transform = "rotateY(0deg)";
    }
    saveGameState();
    checkMoney();  
}

function catmakespin() {
    spin += (party * spinMultiple);
    noOFspin.innerHTML = spin;
    saveGameState();
    checkMoney();  
}

function hirevibe() {
    if (money >= costOfParty) {
        money -= costOfParty;
        noOFmoney.innerHTML = money;
        party += 1;
        if (!arePartyActive) {
            arePartyActive = true;
            intervalID = setInterval(catmakespin, autoClickInterval);
        }
        noOFparty.innerHTML = party;
        costOfParty = Math.round(costOfParty * 5 / 4); 
        costOFpartyDisplay.innerHTML = costOfParty; 
    } else {
        console.log("Not enough money to hire a party member!");
    }
    saveGameState();
    checkMoney();  
}

function convertTomoney() {
    let spinToRemove = Math.floor(spin / 10) * 10;
    if (spinToRemove >= 10) {
        spin -= spinToRemove;
        money += Math.floor(spinToRemove / 10);
        noOFmoney.innerHTML = money;
    }
    saveGameState();
    checkMoney();  
}

function buySpinUpgrade() {
    if (money >= costOfSpinUpgrade) {
        money -= costOfSpinUpgrade;
        noOFmoney.innerHTML = money;
        spinsPerClick += 1;
        costOfSpinUpgrade = Math.round(costOfSpinUpgrade * 6 / 5); 
        costOFspinUpgradeDisplay.innerHTML = costOfSpinUpgrade; 
    } else {
        console.log("Not enough money to buy spin upgrade!");
    }
    saveGameState();
    checkMoney();  
}

function buyIntervalUpgrade() {
    if (money >= costOfIntervalUpgrade) {
        money -= costOfIntervalUpgrade;
        noOFmoney.innerHTML = money;
        autoClickInterval = Math.max(Math.floor(autoClickInterval / 2), 100); 
        costOfIntervalUpgrade = Math.round(costOfIntervalUpgrade * 8 / 5); 
        costOFintervalUpgradeDisplay.innerHTML = costOfIntervalUpgrade; 

       
        clearInterval(intervalID);
        intervalID = setInterval(catmakespin, autoClickInterval); 
    } else {
        console.log("Not enough money to buy interval upgrade!");
    }
    saveGameState();
    checkMoney();  
}

// Reset the game
function rest() {
    localStorage.removeItem('gameState'); 
    window.location.reload(); 
}


window.onload = loadGameState;

const audio = document.getElementById("mysound");
audio.play();
audio.pause(); 
audio.currentTime = 0; 

