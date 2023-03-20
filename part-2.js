//variables
const readLine = require("readline-sync");
const gridSize = 5;

readLine.keyInPause("Press any key to start the game");

const generateGrid = (size) => {
  //generates a grid with the number of rows and columns passed as arguments
  const grids = [];
  for (let i = 0; i < size; i++) {
    grids.push([]);
    for (let j = 0; j < size; j++) {
      grids[i].push(String.fromCharCode(j + 65) + (i + 1));
    }
  }
  // console.table(grids);
  return grids;
};
let playBoard = generateGrid(gridSize);

const generateShips = (grid) => {
  let ship1 = 1;
  let ship2 = 2;
  let ship3 = 3;
  let ship4 = 4;
  let ship5 = 6;
  /*   let ship1 =
    grid[Math.floor(Math.random() * gridSize)][
      Math.floor(Math.random() * gridSize)
    ];
  let ship2 =
    grid[Math.floor(Math.random() * gridSize)][
      Math.floor(Math.random() * gridSize)
    ];

  if (ship1 === ship2) {
    generateShips(grid);
  }
  return [ship1, ship2]; */
};

const playGame = (grid, ship1, ship2) => {
  // console.log(ship1, ship2);
  const locationsVisited = [];
  let shipCounter = 2;
  while (shipCounter > 0) {
    let strike = readLine
      .question("choose a position to strike: (ie: 'A1')  ")
      .toUpperCase();

    if (strike.length === 1) {
      console.log("choose a correct location");
      continue;
    }
    if (locationsVisited.includes(strike)) {
      console.log("You have already picked this location. Miss!");
    } else if (strike === ship1 || strike === ship2) {
      shipCounter -= 1;
      console.log(
        `Hit. You have sunk a battleship. ${shipCounter} ship remaining`
      );

      locationsVisited.push(strike);
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          if (grid[i][j] === strike) {
            grid[i][j] = "X";
          }
        }
      }
    } else {
      let inGrid = 0;
      console.log("You have missed!");
      locationsVisited.push(strike);
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          if (grid[i][j].includes(strike)) {
            inGrid++;
          }

          if (grid[i][j] === strike) {
            grid[i][j] = "O";
          }
        }
      }
      if (inGrid === 0) {
        console.log("because this position in not in the grid");
        locationsVisited.pop();
      }
    }

    console.table(grid);
  }
  let playAgain = readLine.keyInYN(
    "You have destroyed all battleships. Would you like to play again? "
  );
  if (playAgain) {
    playGame(generateGrid(gridSize), ...generateShips(playBoard));
  } else {
    console.log("have a great day");
  }
};

playGame(generateGrid(gridSize), ...generateShips(playBoard));
