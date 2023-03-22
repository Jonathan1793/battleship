//variables
const readLine = require("readline-sync");
const gridSize = 7;

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
  const ships = [
    {
      name: "Carrier",
      hitPoints: 5,
      positions: [],
      destroyed() {
        console.log("You have destroyed the Carrier");
      },
      symbol: "%",
    },
    {
      name: "Battleship",
      hitPoints: 4,
      positions: [],
      destroyed() {
        console.log("You have destroyed the Battleship");
      },
      symbol: "$",
    },
    {
      name: "Cruiser",
      hitPoints: 3,
      positions: [],
      destroyed() {
        console.log("You have destroyed the Cruiser");
      },
      symbol: "#",
    },
    {
      name: "Submarine",
      hitPoints: 3,
      positions: [],
      destroyed() {
        console.log("You have destroyed the Submarine");
      },
      symbol: "@",
    },
    {
      name: "Destroyer",
      hitPoints: 2,
      positions: [],
      destroyed() {
        console.log("You have destroyed the Destroyer");
      },
      symbol: "&",
    },
  ];
  let hitPositions = [];
  for (let ship of ships) {
    let shipOrientation = Math.floor(Math.random() * 2);
    let maxDisplacement = gridSize - ship.hitPoints;
    let displacement = Math.floor(Math.random() * (maxDisplacement + 1));
    let randomNumber = Math.floor(Math.random() * gridSize);

    switch (shipOrientation) {
      case 0: //Horizontal Orientation
        const checkForHorizontalSpace = () => {
          for (let i = 0; i < ship.hitPoints; i++) {
            if (grid[randomNumber][i + displacement].length === 3) {
              console.log(`it's occupied `);
              randomNumber = Math.floor(Math.random() * gridSize);
              checkForHorizontalSpace();
            }
          }
          return true;
        };
        checkForHorizontalSpace();

        if (checkForHorizontalSpace) {
          for (let j = 0; j < ship.hitPoints; j++) {
            ship.positions.push(grid[randomNumber][j + displacement]);
            grid[randomNumber][j + displacement] =
              grid[randomNumber][j + displacement] + ship.symbol;
          }

          console.table(grid);
        }
        continue;

      case 1: //Vertical Orientation
        const checkForVerticalSpace = () => {
          for (let i = 0; i < ship.hitPoints; i++) {
            if (grid[i + displacement][randomNumber].length === 3) {
              console.log(`it's occupied `);
              randomNumber = Math.floor(Math.random() * gridSize);
              checkForVerticalSpace();
            }
          }
          return true;
        };
        checkForVerticalSpace();

        if (checkForVerticalSpace) {
          for (let j = 0; j < ship.hitPoints; j++) {
            ship.positions.push(grid[j + displacement][randomNumber]);

            grid[j + displacement][randomNumber] =
              grid[j + displacement][randomNumber] + ship.symbol;
          }
          console.table(grid);
        }
        continue;

      default:
        break;
    }
  }
  for (let element of ships) {
    hitPositions.push(element.positions);
  }
  return ships;
};

const playGame = (grid, ships) => {
  // console.log(ship1, ship2);

  console.log(ships);
  const locationsVisited = [];
  let shipCounter = 5;
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
    } else {
      for (let ship of ships) {
        if (ship.positions.includes(strike)) {
          console.log("you hit something");
        }
      }
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
    } /* else {
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
    } */

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

playGame(generateGrid(gridSize), generateShips(playBoard));
