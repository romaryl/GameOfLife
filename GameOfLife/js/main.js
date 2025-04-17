let a = [[], [], [], [], [], [], [], [], [], []],
    b = [[], [], [], [], [], [], [], [], [], []],
    c = [[], [], [], [], [], [], [], [], [], []],
    d = [[], [], [], [], [], [], [], [], [], []],
    e = [[], [], [], [], [], [], [], [], [], []],
    f = [[], [], [], [], [], [], [], [], [], []],
    g = [[], [], [], [], [], [], [], [], [], []],
    h = [[], [], [], [], [], [], [], [], [], []],
    i = [[], [], [], [], [], [], [], [], [], []],
    j = [[], [], [], [], [], [], [], [], [], []];

let table = [a, b, c, d, e, f, g, h, i, j],
    main = document.querySelector(".main");

let cells = [],
    GoLInterval;

function changeCell(cell) {
    console.log("changeCell's cell : " + cell.id)
    const html = cell.innerHTML;
    if (html == "-") {
        cell.innerHTML = "Ø";
    } else {
        cell.innerHTML = "-";
    }
}

function play() {
    console.log(document.getElementById("play").innerText)
    if (document.getElementById("play").innerText == ">") {
        document.getElementById("play").innerText = "⏸";

        GoLInterval = setInterval(() => {

            let nextCells = [];

            cells.forEach((cell, index) => {
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
                nextCells.push(cellElement)
            })

            nextCells.forEach(cell => {
                cells[cell.id].innerText = cell.innerText
            })
        }, 500)

    } else {
        document.getElementById("play").innerHTML = ">";
        clearInterval(GoLInterval)
    }
}

function lookUp(cell) {
    if (cell.id < 10) {
        if (cells[(Number(cell.id) + 90)].innerText == "Ø") {
            return true
        } else return false
    } else {
        if (cells[Number(cell.id) - 10].innerText == "Ø") {
            return true
        } else return false
    }
}

function lookDown(cell) {
    if (cell.id > 89) {
        if (cells[Number(cell.id) - 90].innerText == "Ø") {
            return true
        } else return false
    } else {
        if (cells[Number(cell.id) + 10].innerText == "Ø") {
            return true
        } else return false
    }
}

function lookLeft(cell) {
    if ([0, 10, 20, 30, 40, 50, 60, 70, 80, 90].includes(Number(cell.id))) {
        if (cells[Number(cell.id) + 9].innerText == "Ø") {
            return true
        } else return false
    } else {
        if (cells[Number(cell.id) - 1].innerText == "Ø") {
            return true
        } else return false
    }
}

function lookRight(cell) {
    console.log(cell.id)
    if ([9, 19, 29, 39, 49, 59, 69, 79, 89, 99].includes(Number(cell.id))) {
        if (cells[Number(cell.id) - 9].innerText == "Ø") {
            return true
        } else return false
    } else {
        if (cells[Number(cell.id) + 1].innerText == "Ø") {
            return true
        } else return false
    }
}

function lookUpLeft(cell) {
    console.log(cell)
    if (cell.id == 0) {
        if (cells.slice(-1)[0].innerText == "Ø") {
            return true
        } else return false

    } else if ([10, 20, 30, 40, 50, 60, 70, 80, 90].includes(Number(cell.id))) {
        if (cells[Number(cell.id) - 1].innerText == "Ø") {
            return true
        } else return false

    } else if (cell.id < 10) {
        if (cells[Number(cell.id) + 89].innerText == "Ø") {
            return true
        } else return false

    } else {
        if (cells[Number(cell.id) - 11].innerText == "Ø") {
            return true
        } else return false
    }
}

function lookUpRight(cell) {
    if (cell.id < 10) {
        if (cells[Number(cell.id) + 90].innerText == "Ø") {
            return true
        } else return false

    } else if ([19, 29, 39, 49, 59, 69, 79, 89, 99].includes(Number(cell.id))) {
        if (cells[Number(cell.id) - 19].innerText == "Ø") {
            return true
        } else return false

    } else if (cell.id == 9) {
        if (cells[-10].innerText == "Ø") {
            return true
        } else return false

    } else {
        if (cells[Number(cell.id) - 9].innerText == "Ø") {
            return true
        } else return false
    }
}

function lookDownleft(cell) {
    if ([0, 10, 20, 30, 40, 50, 60, 70, 80].includes(Number(cell.id))) {
        if (cells[Number(cell.id) + 19].innerText == "Ø") {
            return true
        } else return false

    } else if (cell.id == 90) {
        if (cells[10].innerText == "Ø") {
            return true
        } else return false

    } else if (cell.id > 89) {
        if (cells[Number(cell.id) - 91].innerText == "Ø") {
            return true
        } else return false

    } else {
        if (cells[Number(cell.id) + 9].innerText == "Ø") {
            return true
        } else return false
    }
}

function lookDownRight(cell) {
    if ([9, 19, 29, 39, 49, 59, 69, 79, 89].includes(Number(cell.id))) {
        if (cells[Number(cell.id) + 1].innerText == "Ø") {
            return true
        } else return false

    } else if (cell.id == 99) {
        if (cells[0].innerText == "Ø") {
            return true
        } else return false

    } else if (cell.id > 89) {
        if (cells[Number(cell.id) - 89].innerText == "Ø") {
            return true
        } else return false

    } else {
        if (cells[Number(cell.id) + 11].innerText == "Ø") {
            return true
        } else return false
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

    console.log(gridCheck)

    let count = 0;
    for (let direction in gridCheck) {
        if (gridCheck[direction] === true) count++;
    }

    // a live cell with fewer than two live neighbors dies, 
    // a live cell with two or three live neighbors survives, 
    // a live cell with more than three live neighbors dies,
    // a dead cell with exactly three live neighbors becomes alive

    if (count < 2 && cell.innerText == "Ø") { // a live cell with fewer than two live neighbors dies, 
        return false;
        // cell.innerText = "-";
    } else if ((count == 2 || count == 3) && cell.innerText == "Ø") { // a live cell with two or three live neighbors survives, 
        return true;
        // cell.innerText = "Ø";
    } else if (count > 3 && cell.innerText == "Ø") {  // a live cell with more than three live neighbors dies,
        return false;
        // cell.innerText == "-";
    } else if (count == 3 && cell.innerText == "-") { // a dead cell with exactly three live neighbors becomes alive
        return true;
        // cell.innerText = "Ø";
    }
    // return true
}

// Game Of Life's play button
document.getElementById("play").addEventListener("click", play)

// grid installation
table.forEach((column, columnIndex) => {
    column.forEach((cell, lineIndex) => {
        const cellElement = document.createElement("div");
        cellElement.className = "cell";
        cellElement.id = `${(columnIndex == 0) ? "" : columnIndex}${lineIndex}`;
        cellElement.innerHTML = "-";

        cellElement.addEventListener("click", function (cell) {
            changeCell(cell.target);
        })

        main.appendChild(cellElement);
        cells.push(cellElement);
    });
});

// just a simple underscore blinkering
setInterval(() => {
    if (document.getElementById("underscore").className == "on") {
        document.getElementById("underscore").className = "off"
    } else {
        document.getElementById("underscore").className = "on";
    }

}, 1000)
