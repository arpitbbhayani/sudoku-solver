var canvasWidth = 950;
var canvasHeight = 450;

var sudokuOrigin = [0, 0]
var sudokuDim = [canvasHeight, canvasHeight]

var tracerOrigin = [canvasHeight + 50, 0]
var tracerDim = [canvasHeight, canvasHeight]

var grid = [];
var isNextMove = true;

function possible(x, y, v) {
    for (var i = 0; i < 9; i++) {
        if (grid[x][i] === `${v}`) {
            return false;
        }
        if (grid[i][y] === `${v}`) {
            return false;
        }
    }
    var x0 = int(x/3)*3;
    var y0 = int(y/3)*3;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (grid[x0 + i][y0 + j] === `${v}`) {
                return false
            }
        }
    }
    return true
}

function solver() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (grid[i][j] === '.') {
                for (var x = 1; x <= 9; x++) {
                    if (possible(i, j, x)) {
                        grid[i][j] = `${x}`
                        // console.log(i, j, x)
                        if (solver()) {
                            return true
                        } else {
                            grid[i][j] = '.'
                            // console.log(i, j, '.')
                        }
                    }
                }
                return false
            }
        }
    }
    return true
}

function setup() {
    grid = sudoku.board_string_to_grid(sudoku.generate(62, true))
    createCanvas(canvasWidth, canvasHeight);
    background(0, 0, 0);
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
        solver()
        isNextMove = false
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