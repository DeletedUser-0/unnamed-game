var player = {
    number: {
        have: 0,
        get: 0.02,
        passiveBoost: 1,
        Boost: 1
    },
    upgrade1: {
        cost: 10,
        level: 0,
        effect: 1
    },
    upgrade2: {
        cost: 50,
        level: 0,
        effect: 1
    },
    upgrade3: {
        cost: 300,
        level: 0,
        effect: 1
    },
    points: {
        have: 0,
        get: 0
    },
    upgrade4: {
        cost: 4.9999,
        level: 0
    }
}

function add() {
    player.number.have = Decimal.add(player.number.have, player.number.get);
}

function increaseNumber() {
    player.number.Boost = Decimal.times(player.number.Boost, player.number.passiveBoost);
    if (Decimal.compare(player.upgrade4.level, 1) >= 0) {
        player.number.get = Decimal.times(player.number.get, player.number.Boost)
    }
}

function Upgrade1() {
    if (Decimal.compare(player.number.have, player.upgrade1.cost) >= 0) {
        player.number.have = Decimal.sub(player.number.have, player.upgrade1.cost);
        player.upgrade1.effect = Decimal.times(player.upgrade1.effect, 1.004)
        player.upgrade1.cost = Decimal.times(player.upgrade1.cost, 1.1).times(player.upgrade1.effect)
        player.upgrade1.level = Decimal.add(player.upgrade1.level, 1)
        player.number.get = Decimal.times(player.number.get, 1.06)
    }
}

function Upgrade2() {
    if (Decimal.compare(player.number.have, player.upgrade2.cost) >= 0) {
        player.number.have = Decimal.sub(player.number.have, player.upgrade2.cost);
        player.upgrade2.effect = Decimal.times(player.upgrade2.effect, 1.0066666666666666667)
        player.upgrade2.cost = Decimal.times(player.upgrade2.cost, 1.125).times(player.upgrade2.effect)
        player.upgrade2.level = Decimal.add(player.upgrade2.level, 1)
        player.number.get = Decimal.times(player.number.get, 1.08)
    }
}

function Upgrade3() {
    if (Decimal.compare(player.number.have, player.upgrade3.cost) >= 0) {
        player.number.have = Decimal.sub(player.number.have, player.upgrade3.cost);
        player.upgrade3.effect = Decimal.times(player.upgrade3.effect, 1.008888888888888888)
        player.upgrade3.cost = Decimal.times(player.upgrade3.cost, 1.125).times(player.upgrade3.effect)
        player.upgrade3.level = Decimal.add(player.upgrade3.level, 1)
        player.number.get = Decimal.times(player.number.get, 1.1)
    }
}

function Upgrade4() {
    if (Decimal.compare(player.points.have, player.upgrade4.cost) >= 0) {
        player.number.have = Decimal.sub(player.number.have, player.upgrade4.cost);
        player.upgrade4.cost = Decimal.times(player.upgrade3.cost, 1.25);
        player.upgrade4.level = Decimal.add(player.upgrade3.level, 1);
        player.number.passiveBoost = Decimal.times(player.number.passiveBoost, 1.00002);
    }
}

function points() {
    if (Decimal.compare(Decimal.pow(player.number.have.exponent, 1.25), player.points.have) >= 0) {
        player.points.have = Math.round(Decimal.add(player.points.get, player.points.have));
        player.number.have = new Decimal(0);
        player.number.get = Decimal.pow(1.2, player.points.have).divide(50);
        player.upgrade1.cost = new Decimal(10);
        player.upgrade2.cost = new Decimal(50);
        player.upgrade3.cost = new Decimal(300);
        player.upgrade1.effect = new Decimal(1);
        player.upgrade2.effect = new Decimal(1);
        player.upgrade3.effect = new Decimal(1);
        player.upgrade1.level = new Decimal(0);
        player.upgrade2.level = new Decimal(0);
        player.upgrade3.level = new Decimal(0);
    }
}

function recalculate() {
    player.points.get = Decimal.pow(1.15, player.number.have.exponent).sub(1);
}

var mainGameLoop = window.setInterval(function () {
    add()
}, 20);

var mainGameLoop = window.setInterval(function () {
    UpdateUI()
}, 10);

var mainGameLoop = window.setInterval(function () {
    recalculate()
}, 10);

var mainGameLoop = window.setInterval(function () {
    increaseNumber()
}, 50);

function notate(n) {
    n = new Decimal(n);
    var e = n.exponent;
    if (e < 3) return (n.mantissa * Math.pow(10, e)).toFixed(0);
    return `${n.mantissa.toPrecision(3)}e${e.toLocaleString("pt-BR")}`;
}

function notate2(n) {
    var e = n.exponent;
    if (e < 3) return (n.mantissa * Math.pow(10, e)).toPrecision(3);
    return `${n.mantissa.toPrecision(3)}e${e.toLocaleString("pt-BR")}`;
}

function notate3(n) {
    n = new Decimal(n);
    var e = n.exponent;
    if (e < 3) return (n.mantissa * Math.pow(10, e)).toPrecision(3);
    return `${n.mantissa.toPrecision(3)}e${e.toLocaleString("pt-BR")}`;
}

function UpdateUI() {
    document.getElementById('number').innerHTML = "Number: " + notate3(player.number.have)
    document.getElementById('NPS').innerHTML = "Number per second (NPS): " + notate3(Decimal.times(player.number.get, 50))
    document.getElementById('upgrade1').innerHTML = "Increase NPS by 6% <br> Cost: " + notate3(player.upgrade1.cost) + "<br> Level " + notate(player.upgrade1.level)
    document.getElementById('upgrade2').innerHTML = "Increase NPS by 8% <br> Cost: " + notate3(player.upgrade2.cost) + "<br> Level " + notate(player.upgrade2.level)
    document.getElementById('upgrade3').innerHTML = "Increase NPS by 10% <br> Cost: " + notate3(player.upgrade3.cost) + "<br> Level " + notate(player.upgrade3.level)
    document.getElementById('layer1').innerHTML = "Reset to earn " + notate(player.points.get) + " points <br> Total Multiplier: " + notate2(Decimal.pow(1.5, player.points.have)) + "x";
    document.getElementById('TotalPoints').innerHTML = "You have " + notate(Math.round(player.points.have)) + " points";
    document.getElementById('upgrade4').innerHTML = "Increases number multiplier per second. <br> Cost: " + notate3(player.upgrade4.cost) + "<br> Level " + notate(player.upgrade4.level);
}

function saveGame() {
    saveData = player;
    localStorage.saveData = JSON.stringify(saveData);
}

function loadGame() {
    var saveData = JSON.parse(localStorage.saveData || null) || {};
    player = saveData;
    return saveData.obj || "default";
}

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}