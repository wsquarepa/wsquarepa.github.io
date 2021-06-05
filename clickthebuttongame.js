(function () {
    var money = 0
    var button = document.getElementById("upgradeButton")
    var id = ""
    const upgrades = [{
            name: "Money I",
            cost: 100
        },

        {
            name: "Clicking I",
            cost: 1000
        },

        {
            name: "Clicking II",
            cost: 1500
        },

        {
            name: "Money II",
            cost: 2000
        },

        {
            name: "Clicking III",
            cost: 2500
        },

        {
            name: "Clicking IV",
            cost: 3000
        },

        {
            name: "Money III",
            cost: 3500
        },

        {
            name: "Money IV",
            cost: 4000
        },

        {
            name: "Clicking V",
            cost: 4500
        },

        {
            name: "Money V",
            cost: 5000
        }
    ]
    var upgradesDone = []
    button.innerHTML = upgrades[0].name + " - Costs $" + upgrades[0].cost

    document.onclick = function () {
        money++
        if (upgradesDone.indexOf("Money I") !== -1) {
            money += 4
        }
        if (upgradesDone.indexOf("Money II") !== -1) {
            money += 5
        }
        if (upgradesDone.indexOf("Money III") !== -1) {
            money += 10
        }
        if (upgradesDone.indexOf("Money IV") !== -1) {
            money += 30
        }
        if (upgradesDone.indexOf("Money V") !== -1) {
            money += 50
        }
        document.getElementById("costrevealer").innerHTML = "You have $" + money
    }

    button.onclick = function () {
        const upgradeNumber = upgradesDone.length

        if (upgradeNumber == 10) {
            if (money >= 1000000) {
                var fadeId = setInterval(fadeFrame, 20)
                var litnumber = 255

                id = document.getElementById("id").value
                localStorage.setItem("id", id)
                document.body.innerHTML = ""

                if (id == "") {
                    alert("You gotta input an id first.")
                    location.reload()
                }

                function fadeFrame() {
                    document.getElementById("documentbody").innerHTML = ""
                    document.getElementById("documentbody").style = "background-color: " +
                        `rgb(${litnumber},${litnumber},${litnumber})`
                    litnumber--
                    if (litnumber < 0) {
                        clearInterval(fadeId)
                        money = 0
                        upgradesDone = []
                        localStorage.setItem("money", money)
                        localStorage.setItem("upgradesDone", upgradesDone.toString())
                        location.reload()
                    }
                }
            } else {
                button.innerHTML = "Rebirth - Costs $1000000"
            }
        } else {
            if (money >= upgrades[upgradeNumber].cost) {
                money -= upgrades[upgradeNumber].cost
                upgradesDone.push(upgrades[upgradeNumber].name)
                if (upgradeNumber != 10) {
                    button.innerHTML = upgrades[upgradeNumber + 1].name + " - Costs $" + upgrades[upgradeNumber + 1]
                        .cost
                } else {
                    button.innerHTML = "Rebirth - Costs $1000000"
                }
            }
        }
    }

    var i = 0;

    function move() {
        if (i == 0) {
            i = 1;
            var elem = document.getElementById("myBar");
            var width = 1;
            var speed = 10
            var earnings = 1
            if (upgradesDone.indexOf("Clicking II") !== -1) {
                speed = 5 //The lower the speed, the better.
            }
            if (upgradesDone.indexOf("Clicking III") !== -1) {
                speed = 3
                earnings = 5
            }
            if (upgradesDone.indexOf("Clicking IV") !== -1) {
                earnings = 25
            }
            if (upgradesDone.indexOf("Clicking V") !== -1) {
                speed = 1 //The lower the speed, the better.
                earnings = 50
            }
            var id = setInterval(frame, speed);

            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                    if (upgradesDone.indexOf("Clicking I") !== -1) {
                        money += earnings
                        document.getElementById("costrevealer").innerHTML = "You have $" + money
                        move()
                    }
                } else {
                    width++;
                    elem.style.width = width + "%";
                }
            }
        }
    }

    var checkerintervalid = 0
    checkerintervalid = setInterval(() => {
        if (upgradesDone.indexOf("Clicking I") !== -1) {
            document.getElementById("myProgress").hidden = false
            move()
            clearInterval(checkerintervalid)
        }
    }, 1000)

    if (localStorage.getItem("money")) {
        money = parseInt(localStorage.getItem("money"))
        document.getElementById("costrevealer").innerHTML = "You have $" + money
    }

    if (localStorage.getItem("upgradesDone")) {
        upgradesDone = localStorage.getItem("upgradesDone").split(",")
        button.innerHTML = upgrades[upgradesDone.length].name + " - Costs $" + upgrades[upgradesDone.length].cost
        if (upgradesDone.length == 10) {
            button.innerHTML = "Rebirth - Costs $100000"
        }
    }

    if (localStorage.getItem("id")) {
        id = localStorage.getItem("id")
        document.getElementById("id").value = id
    }

    setInterval(function () {
        localStorage.setItem("money", money)
        localStorage.setItem("upgradesDone", upgradesDone.toString())
    }, 1000)
})()