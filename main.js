window.onload = function() {
    const getElement = (id) => document.getElementById(id);

    const honeyDiv = getElement('honey');
    const beeDiv = getElement('bee');

    const honeyUpDiv = getElement('honeyUp');
    const honeyUpCost = getElement('honeyUpCost');
    const honeyUpHowManyBought = getElement('honeyUpHowManyBought');

    const clickerUpDiv = getElement('clickerUp');
    const clickerUpCost = getElement('clickerUpCost');
    const clickerUpHowManyBought = getElement('clickerUpHowManyBought');

    const clickerSpeedUpDiv = getElement('clickerSpeedUp');
    const clickerSpeedUpCost = getElement('clickerSpeedUpCost');
    const clickerSpeedUpHowManyBought = getElement('clickerSpeedUpHowManyBought');
    const clickerSecondsDiv = getElement('clickerSeconds');



    let honey = 0;
    let clickMultiplier = 0;
    let clickerSeconds = 10;



    let music = document.getElementById("music");

    function playMusic() {
        music.play();
        
        document.removeEventListener("click", playMusic);
    }

    document.addEventListener("click", playMusic);

    music.addEventListener("ended", function() {
        music.currentTime = 0;
        music.play();
    });

    let clickSound = document.getElementById("clickSound");
    let shopButton = document.querySelectorAll('.upgrade');

    shopButton.forEach(function(shopButton) {
        shopButton.addEventListener("click", playSound);
    });

    function playSound() {
        clickSound.play();
    }



    const upgradeColor = () => {
        if(HoneyUpgrade.howManyBought < 5) {
            if(HoneyUpgrade.cost <= honey) {
                honeyUpDiv.style.background = "hsl(112, 63%, 52%, 0.100)";
            }
            else {
                honeyUpDiv.style.background = "hsl(0, 0%, 0%, 15%)";
            }
        }
        if(HoneyUpgrade.howManyBought == 5) {
            honeyUpDiv.style.background = "hsl(0, 0%, 0%, 15%)";     
        }
        if(ClickerUpgrade.howManyBought < 1) {
            if(ClickerUpgrade.cost <= honey) {
                clickerUpDiv.style.background = "hsl(112, 63%, 52%, 0.100)";
            }
            else {
                clickerUpDiv.style.background = "hsl(0, 0%, 0%, 15%)";
            }
        }
        if(ClickerUpgrade.howManyBought == 1) {
            clickerUpDiv.style.background = "hsl(0, 0%, 0%, 15%)";     
        }
        if(ClickerSpeedUpgrade.howManyBought < 9) {
            if(ClickerSpeedUpgrade.cost <= honey) {
                clickerSpeedUpDiv.style.background = "hsl(112, 63%, 52%, 0.100)";
            }
            else {
                clickerSpeedUpDiv.style.background = "hsl(0, 0%, 0%, 15%)";
            }
        }
        if(ClickerSpeedUpgrade.howManyBought == 9) {
            clickerSpeedUpDiv.style.background = "hsl(0, 0%, 0%, 15%)";     
        }
    }

    const updateHoney = () => {
        honeyDiv.innerHTML = honey;

        upgradeColor()
    };

    const BeeClicked = () => {
        honey += 1 + clickMultiplier;
        updateHoney();
    };

    beeDiv.addEventListener('click', BeeClicked);



    // Upgrades Object
    const HoneyUpgrade = {
        cost: 150,
        howManyBought: 0,
    };

    const ClickerUpgrade = {
        cost: 1250,
        howManyBought: 0,
    };

    const ClickerSpeedUpgrade = {
        cost: 2000,
        howManyBought: 0,
    };



    // Honey Upgrade 
    honeyUpCost.innerHTML = HoneyUpgrade.cost;

    honeyUpDiv.addEventListener('click', () => {
        if(HoneyUpgrade.howManyBought < 5 && honey >= HoneyUpgrade.cost) {
            honey -= HoneyUpgrade.cost;
            updateHoney();

            HoneyUpgrade.cost *= 2;
            honeyUpCost.innerHTML = HoneyUpgrade.cost

            HoneyUpgrade.howManyBought++;
            honeyUpHowManyBought.innerHTML = HoneyUpgrade.howManyBought;

            clickMultiplier++
            upgradeColor();
        }
        if(HoneyUpgrade.howManyBought == 5) {
            honeyUpCost.innerHTML = 'MAX';
            upgradeColor()
        }
    });



    // Clicker Upgrade 
    clickerUpCost.innerHTML = ClickerUpgrade.cost;

    clickerUpDiv.addEventListener('click', () => {
        if (ClickerUpgrade.howManyBought < 1 && honey >= ClickerUpgrade.cost) {
            honey -= ClickerUpgrade.cost;
            updateHoney();

            ClickerUpgrade.howManyBought++;
            clickerUpHowManyBought.innerHTML = ClickerUpgrade.howManyBought;

            upgradeColor();
            Clicker();
        }
        if(ClickerUpgrade.howManyBought == 1) {
            clickerUpCost.innerHTML = 'MAX';
            upgradeColor()
        }
    });

    function Clicker() {
        setInterval(() => {
            honey += 1 + clickMultiplier;
            updateHoney();
        }, (clickerSeconds * 1000));
    }

    // Clicker Speed Upgrade 
    clickerSpeedUpCost.innerHTML = ClickerSpeedUpgrade.cost;

    clickerSpeedUpDiv.addEventListener('click', () => {
        if (ClickerSpeedUpgrade.howManyBought < 9 && honey >= ClickerSpeedUpgrade.cost) {
            honey -= ClickerSpeedUpgrade.cost;
            updateHoney();

            ClickerSpeedUpgrade.cost *= 2;
            clickerSpeedUpCost.innerHTML = ClickerSpeedUpgrade.cost

            ClickerSpeedUpgrade.howManyBought++;
            clickerSpeedUpHowManyBought.innerHTML = ClickerSpeedUpgrade.howManyBought;

            clickerSeconds--;
            clickerSecondsDiv.innerHTML = clickerSeconds;
            upgradeColor();
            Clicker();
        }
        if(ClickerSpeedUpgrade.howManyBought == 9) {
            clickerSpeedUpCost.innerHTML = 'MAX';
            upgradeColor();
        }
    });
}