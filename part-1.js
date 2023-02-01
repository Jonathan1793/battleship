//variables
const readLine = require("readline-sync");
const rnumber = Math.floor(Math.random() * 9);
const rnumber1 = Math.floor(Math.random() * 9);

readLine.keyInPause("Press any key to start the game");

const generateArray = (rows, columns) => {
  //generates a grid with the number of rows and columns passed as arguments
  const grids = [];
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  for (let i = 0; i < rows; i++) {
    grids.push([]);
    for (let j = 0; j < columns; j++) {
      grids[i].push(alphabet[i] + (j + 1));
    }
  }
  return grids;
};
const grid = generateArray(10, 10);
console.log(grid);
const generateShips = (grid) => {
  let ship1 = grid[rnumber][rnumber1];
  let ship2 = grid[rnumber1][rnumber];
  if (ship1 === ship2) {
    generateShips(grid);
  }
  return [ship1, ship2];
};

let shipPositions = generateShips(grid);

const setShipOnGrid = (grid, ship1, ship2) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === ship1 || grid[i][j] === ship2) {
        grid[i][j] = grid[i][j] + "X";
      }
    }
  }
  return grid;
};
const gridWithShips = setShipOnGrid(grid, ...shipPositions);
console.log(gridWithShips);

let strike = readLine.question("choose your strike coordinate: ");
if (
  strike.toUpperCase() === shipPositions[0] ||
  strike.toUpperCase() === shipPositions[1]
) {
  console.log("me diste");
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].includes(strike.toUpperCase())) {
        console.log("here we are");
        grid[i][j] = strike.toUpperCase();
      }
    }
  }
}

console.log(grid);
