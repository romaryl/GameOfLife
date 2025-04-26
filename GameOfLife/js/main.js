const a = [[], [], [], [], [], [], [], [], [], []],
    b = [[], [], ["Ø"], ["Ø"], ["Ø"], [], [], [], [], []],
    c = [[], [], [], [], ["Ø"], [], [], [], [], []],
    d = [[], [], [], ["Ø"], [], [], [], [], [], []],
    e = [[], [], [], [], [], [], [], [], [], []],
    f = [[], [], [], [], [], [], [], [], [], []],
    g = [[], [], [], [], [], [], [], [], [], []],
    h = [[], [], [], [], [], [], [], [], [], []],
    i = [[], [], [], [], [], [], [], [], [], []],
    j = [[], [], [], [], [], [], [], [], [], []];

const table = [a, b, c, d, e, f, g, h, i, j],
    main = document.querySelector(".main"),
    clockInput = document.querySelector("input"),
    resetClock = document.querySelector("button");

resetClock.innerHTML = clockInput.value + "ms";

let cells = [],
    GoLInterval,
    playState = "pause";

function changeCell(cell) {
    console.log("changeCell's cell : " + cell.id);
    const html = cell.innerHTML;
    if (html == "-") {
        cell.className = "cell live";
        cell.innerHTML = "Ø";
    } else {
        cell.className = "cell";
        cell.innerHTML = "-";
    }
}

// main function, GoLInterval is set and modified here
// option: <text> "play" "pause" "toggle"
function play(option) {
    console.log(document.getElementById("play").innerText);

    if (option === "toggle") {
        option = (document.getElementById("play").innerText == ">") ? "play" : "pause";
    }

    if (option === "play") {
        document.getElementById("play").innerText = "⏸";

        GoLInterval = setInterval(() => {

            let nextCells = [];

            cells.map((cell, index) => {
                const willBeAliveNextInterval = checkAround(cell),
                    cellElement = document.createElement("div");

                cellElement.className = "cell";
                cellElement.id = index;
                cellElement.addEventListener("click", function (cell) {
                    changeCell(cell.target);
                })

                if (willBeAliveNextInterval) {
                    cellElement.innerHTML = "Ø";
                } else {
                    cellElement.innerHTML = "-";
                }
                nextCells.push(cellElement);
            })

            nextCells.map(cell => {
                cells[cell.id].innerText = cell.innerText;
            })
        }, clockInput.value);

    } else {
        document.getElementById("play").innerHTML = ">";
        clearInterval(GoLInterval);
    }
}

function lookUp(cell) {
    if (cell.id < 10) {
        return cells[(Number(cell.id) + 90)].innerText == "Ø";
    } else {
        return cells[Number(cell.id) - 10].innerText == "Ø";
    }
}

function lookDown(cell) {
    if (cell.id > 89) {
        return cells[Number(cell.id) - 90].innerText == "Ø";
    } else {
        return cells[Number(cell.id) + 10].innerText == "Ø";
    }
}

function lookLeft(cell) {
    if ([0, 10, 20, 30, 40, 50, 60, 70, 80, 90].includes(Number(cell.id))) {
        return cells[Number(cell.id) + 9].innerText == "Ø";
    } else {
        return cells[Number(cell.id) - 1].innerText == "Ø";
    }
}

function lookRight(cell) {
    if ([9, 19, 29, 39, 49, 59, 69, 79, 89, 99].includes(Number(cell.id))) {
        return cells[Number(cell.id) - 9].innerText == "Ø";
    } else {
        return cells[Number(cell.id) + 1].innerText == "Ø";
    }
}

function lookUpLeft(cell) {
    if (cell.id == 0) {
        return cells[99].innerText == "Ø";

    } else if ([10, 20, 30, 40, 50, 60, 70, 80, 90].includes(Number(cell.id))) {
        return cells[Number(cell.id) - 1].innerText == "Ø";

    } else if (cell.id < 10) {
        return cells[Number(cell.id) + 89].innerText == "Ø";

    } else {
        return cells[Number(cell.id) - 11].innerText == "Ø";
    }
}

function lookUpRight(cell) {
    if (cell.id == 9) {
        return cells[90].innerText == "Ø";

    } else if (cell.id < 10) {
        return cells[Number(cell.id) + 91].innerText == "Ø";

    } else if ([19, 29, 39, 49, 59, 69, 79, 89, 99].includes(Number(cell.id))) {
        return cells[Number(cell.id) - 19].innerText == "Ø";

    } else {
        return cells[Number(cell.id) - 9].innerText == "Ø";
    }
}

function lookDownleft(cell) {
    if ([0, 10, 20, 30, 40, 50, 60, 70, 80].includes(Number(cell.id))) {
        return (cells[Number(cell.id) + 19].innerText == "Ø")

    } else if (cell.id == 90) {
        return cells[9].innerText == "Ø";

    } else if (cell.id > 89) {
        return cells[Number(cell.id) - 91].innerText == "Ø";

    } else {
        return cells[Number(cell.id) + 9].innerText == "Ø";
    }
}

function lookDownRight(cell) {
    if ([9, 19, 29, 39, 49, 59, 69, 79, 89].includes(Number(cell.id))) {
        return cells[Number(cell.id) + 1].innerText == "Ø";

    } else if (cell.id == 99) {
        return cells[0].innerText == "Ø";

    } else if (cell.id > 89) {
        return cells[Number(cell.id) - 89].innerText == "Ø";

    } else {
        return cells[Number(cell.id) + 11].innerText == "Ø";
    }
}

function checkAround(cell) {
    const gridCheck = {
        "upLeft": lookUpLeft(cell),
        "up": lookUp(cell),
        "upRight": lookUpRight(cell),
        "left": lookLeft(cell),
        "right": lookRight(cell),
        "downLeft": lookDownleft(cell),
        "down": lookDown(cell),
        "downRight": lookDownRight(cell)
    }

    let count = 0;
    for (let direction in gridCheck) {
        if (gridCheck[direction] === true) count++;
    }

    // a live cell with fewer than two live neighbors dies, 
    // a live cell with two or three live neighbors survives, 
    // a live cell with more than three live neighbors dies,
    // a dead cell with exactly three live neighbors becomes alive

    if (count < 2 && cell.innerText == "Ø") { // a live cell with fewer than two live neighbors dies, 
        cell.className = "cell die count-" + count;
        return false;

    } else if ((count == 2 || count == 3) && cell.innerText == "Ø") { // a live cell with two or three live neighbors survives, 
        cell.className = "cell live count-" + count;
        return true;

    } else if (count > 3 && cell.innerText == "Ø") {  // a live cell with more than three live neighbors dies,
        cell.className = "cell die count-" + count;
        return false;

    } else if (count == 3 && cell.innerText == "-") { // a dead cell with exactly three live neighbors becomes alive
        cell.className = "cell born count-" + count;
        return true;

    } else {
        cell.className = "cell count-" + count;
    }

}

// Game Of Life's play button
document.getElementById("play").addEventListener("click", () => {
    play("toggle");
})
document.getElementById("space").addEventListener("click", (e) => {
    e.target.className = "pressed";
    setTimeout(() => {
        e.target.className = "";
    }, clockInput.value);
    play("toggle");
})

window.addEventListener("keydown", function (event) {
    if (event.key === " ") {
        this.document.getElementById("space").className = "pressed";
        setTimeout(() => {
            this.document.getElementById("space").className = "";
        }, clockInput.value);
        play("toggle");
    }
});

// grid installation
table.forEach((column, columnIndex) => {
    column.forEach((cell, lineIndex) => {
        // console.log("grind installation cell :")
        // console.log(cell)
        const cellElement = document.createElement("div");
        cellElement.className = (cell[0] == "Ø") ? "cell live" : "cell";
        cellElement.id = `${(columnIndex == 0) ? "" : columnIndex}${lineIndex}`;
        cellElement.innerHTML = (cell[0] == "Ø") ? "Ø" : "-";

        cellElement.addEventListener("click", function (cell) {
            changeCell(cell.target);
        })

        main.appendChild(cellElement);
        cells.push(cellElement);
    });
});

// pause the game while the input of the clock is changing
clockInput.addEventListener("mousedown", (e) => {
    (document.getElementById("play").innerText == ">") ? playState = "pause" : playState = "play";
    resetClock.textContent = e.target.value + "ms";
    play("pause");
})

// actualise continuously the clock's value when modifying
clockInput.addEventListener("input", () => {
    resetClock.innerText = clockInput.value + "ms";
})

// resume eventually the game when the input of the clock is set
clockInput.addEventListener("change", (e) => {
    console.log("change")
    resetClock.textContent = e.target.value + "ms";

    if (playState == "play") {
        playState = "pause";
        play("play");
    } else {
        play("pause");
    }
})

resetClock.addEventListener("click", (e) => {
    resetClock.textContent = "500ms";
})

// just a simple underscore blinkering
setInterval(() => {
    if (document.getElementById("underscore").className == "on") {
        document.getElementById("underscore").className = "off";
    } else {
        document.getElementById("underscore").className = "on";
    }

}, clockInput.value)
