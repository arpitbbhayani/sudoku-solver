var canvasWidth = 950;
var canvasHeight = 450;

var sudokuOrigin = [0, 0]
var sudokuDim = [canvasHeight, canvasHeight]

var tracerOrigin = [canvasHeight + 50, 0]
var tracerDim = [canvasHeight, canvasHeight]

var grid = [];
var solverGen = null;

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

function* solver() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (grid[i][j] === '.') {
                for (var x = 1; x <= 9; x++) {
                    if (possible(i, j, x)) {
                        grid[i][j] = `${x}`
                        yield
                        if (yield* solver()) {
                            return true
                        } else {
                            grid[i][j] = '.'
                            yield
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
    solverGen = null
    grid = sudoku.board_string_to_grid(sudoku.generate(44, true))
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

function _drawValues() {
    textSize(canvasHeight/20);
    fill(255);
    stroke(200);
    for (var i = 0; i < 9; i ++) {
        for (var j = 0 ; j < 9; j++) {
            if (grid[i][j] !== ".") {
                text(grid[i][j], sudokuOrigin[0] + j * sudokuDim[0]/9 + (sudokuDim[0]/9)/2 - 32/4, sudokuOrigin[1] + i * sudokuDim[0]/9 + (sudokuDim[0]/9)/2 + 32/4);
            }
        }
    }
}

function _drawBoard() {
    background(0)
    _drawLines()
    _drawValues()
}

function draw() {
    _drawBoard()
    x = solverGen.next()
    if (x.done) {
        // textSize(64)
        // fill(0, 255, 0)
        // stroke(0, 255, 0)
        // text("Solved!", sudokuOrigin[0] + sudokuDim[0]/2 - 100, sudokuOrigin[1] + sudokuDim[1]/2) - 20;
        noLoop()
    }
}
