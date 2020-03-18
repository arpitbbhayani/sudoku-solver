var canvasWidth = 950;
var canvasHeight = 450;

var sudokuOrigin = [0, 0]
var sudokuDim = [canvasHeight, canvasHeight]

var tracerOrigin = [canvasHeight + 50, 0]
var tracerDim = [canvasHeight, canvasHeight]

var grid = [];
var solverGen = null;
var isNextMove = true;

function* solver() {
    for (var i = 0; i < 9; i++) {
        var x = yield;
    }
}

function setup() {
    grid = sudoku.board_string_to_grid(sudoku.generate(17, true))
    createCanvas(canvasWidth, canvasHeight);
    background(0, 0, 0);
    solverGen = solver()
}

function _drawLines() {
    stroke(255)
    for (var i = 0 ; i <= 9; i++) {
        line(sudokuOrigin[0] + 0, sudokuOrigin[1] + i * sudokuDim[1]/9, sudokuOrigin[0] + sudokuDim[0], sudokuOrigin[1] + i * sudokuDim[1]/9)  // horizontal line
        line(sudokuOrigin[0] + i * sudokuDim[0]/9, sudokuOrigin[1] + 0, sudokuOrigin[0] + i * sudokuDim[0]/9, sudokuOrigin[1] + sudokuDim[1]) // vertical line
    }

    for (var i = 0 ; i <= 9; i++) {
        line(tracerOrigin[0] + 0, tracerOrigin[1] + i * tracerDim[1]/9, tracerOrigin[0] + tracerDim[0], tracerOrigin[1] + i * tracerDim[1]/9)  // horizontal line
        line(tracerOrigin[0] + i * tracerDim[0]/9, tracerOrigin[1] + 0, tracerOrigin[0] + i * tracerDim[0]/9, tracerOrigin[1] + tracerDim[1]) // vertical line
    }
}

function _drawGrid() {
    textSize(canvasHeight/20);
    fill(255);
    stroke(255);
    for (var i = 0; i < 9; i ++) {
        for (var j = 0 ; j < 9; j++) {
            if (grid[i][j] !== ".") {
                text(grid[i][j], sudokuOrigin[0] + j * sudokuDim[0]/9 + (sudokuDim[0]/9)/2 - 32/4, sudokuOrigin[1] + i * sudokuDim[0]/9 + (sudokuDim[0]/9)/2 + 32/4);
            }
        }
    }
}


function doNextMove() {
    if (isNextMove) {
        var x = solverGen.next()
        isNextMove = !x.done
    }
}

function _drawBoard() {
    _drawLines()
    _drawGrid()
}

function draw() {
    _drawBoard()
    doNextMove()
}