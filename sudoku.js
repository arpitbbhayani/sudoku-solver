var screenWidth = 810;
var screenHeight = 810;
var grid = [];

function setup() {
    grid = sudoku.board_string_to_grid(sudoku.generate(17, true))
    createCanvas(screenWidth, screenHeight);
    background(0, 0, 0);
    console.log(grid)
}

function _drawLines() {
    stroke(255)
    for (var i = 1 ; i < 9; i++) {
        line(0, i * width/9, width, i * width/9)
        line(i * width/9, 0, i * width/9, width)
    }
}

function _drawGrid() {
    textSize(32);
    fill(255);
    stroke(255);
    for (var i = 0; i < 9; i ++) {
        for (var j = 0 ; j < 9; j++) {
            if (grid[i][j] !== ".") {
                text(grid[i][j], j * width/9 + (width/9)/2 - 32/4, i * width/9 + (width/9)/2 + 32/4);
            }
        }
    }
}

function _drawBoard() {
    _drawLines()
    _drawGrid()
}

function draw() {
    _drawBoard()
}
