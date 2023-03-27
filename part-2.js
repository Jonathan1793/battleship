//variables
const readLine = require("readline-sync");
const gridSize = 10;

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
        console.log("You have destroyed the " + this.name);
      },
      symbol: "%",
    },
    {
      name: "Battleship",
      hitPoints: 4,
      positions: [],
      destroyed() {
        console.log("You have destroyed the " + this.name);
      },
      symbol: "$",
    },
    {
      name: "Cruiser",
      hitPoints: 3,
      positions: [],
      destroyed() {
        console.log("You have destroyed the " + this.name);
      },
      symbol: "#",
    },
    {
      name: "Submarine",
      hitPoints: 3,
      positions: [],
      destroyed() {
        console.log("You have destroyed the " + this.name);
      },
      symbol: "@",
    },
    {
      name: "Destroyer",
      hitPoints: 2,
      positions: [],
      destroyed() {
        console.log("You have destroyed the " + this.name);
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
    let stuckCounter = 0;
    let boundaryReached = false;

    case12: switch (shipOrientation) {
      case 0: //Horizontal Orientation
        try {
          const checkForHorizontalSpace = () => {
            console.log(`we are in horizontal`);
            console.log(`Random Number : ${randomNumber}`);
            console.log(`Displacement : ${displacement}`);
            for (let i = 0; i < ship.hitPoints; i++) {
              if (grid[randomNumber][i + displacement].length === 3) {
                console.log(`it's occupied `);
                randomNumber = Math.floor(Math.random() * gridSize);
                stuckCounter++;
                console.log(`Times Stuck in horizontal ${stuckCounter}`);
                if (stuckCounter > ship.hitPoints + 1) {
                  displacement--;
                  console.log(displacement);
                }
                if (displacement === -1) {
                  displacement = Math.floor(
                    Math.random() * (maxDisplacement + 1)
                  );
                }
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
        } catch (err) {
          console.error(`the error is ${err}`);
        }

        continue;

      case 1: //Vertical Orientation
        let originalPosition = displacement;
        try {
          const checkForVerticalSpace = () => {
            console.log(`we are in vertical`);
            console.log(`Random Number : ${randomNumber}`);
            console.log(`Displacement : ${displacement}`);
            for (let i = 0; i < ship.hitPoints; i++) {
              if (grid[i + displacement][randomNumber].length === 3) {
                console.log(`it's occupied `);
                randomNumber = Math.floor(Math.random() * gridSize);
                stuckCounter++;
                console.log(`Times Stuck in vertical ${stuckCounter}`);
                if (stuckCounter > ship.hitPoints + 1) {
                  displacement--;
                }
                if (displacement === -1) {
                  displacement = Math.floor(
                    Math.random() * (maxDisplacement + 1)
                  );
                }
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
        } catch (err) {
          console.log(`the error is ${err}`);
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
  const locationsVisited = [];
  let shipCounter = 5;
  while (shipCounter > 0) {
    let shipsChecked = 0;
    let strike = readLine
      .question("choose a position to strike: (ie: 'A1')  ")
      .toUpperCase();

    if (strike.length === 1 || strike.length > 2) {
      console.log("choose a correct location");
      continue;
    }
    if (locationsVisited.includes(strike)) {
      console.log("You have already picked this location. Miss!");
      continue;
    }
    for (let ship of ships) {
      let inGrid = 0;
      locationsVisited.push(strike);
      if (ship.positions.includes(strike)) {
        ship.hitPoints = ship.hitPoints - 1;
        console.log(
          `you hit the ${ship.name} and it has ${ship.hitPoints} HP left`
        );
        let indexOfStrike = ship.positions.findIndex(
          (element) => element === strike
        );
        ship.positions.splice(
          ship.positions.findIndex((element) => element === strike),
          1
        );
        // console.log(ship.positions);

        if (ship.positions.length === 0) {
          ship.destroyed();
          shipCounter--;
        }
        locationsVisited.push(strike);
        for (let i = 0; i < grid.length; i++) {
          for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === strike) {
              grid[i][j] = ship.symbol;
            }
          }
        }
      } else {
        shipsChecked++;
      }
      if (shipsChecked === 5) {
        console.log(`You missed!`);
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
          console.log(`Because this position is not in the Grid`);
          locationsVisited.pop();
        }
      }
    }

    console.table(grid);
  }
  let playAgain = readLine.keyInYN(
    "You have destroyed all battleships. Would you like to play again? "
  );
  if (playAgain) {
    playGame(generateGrid(gridSize), generateShips(generateGrid(gridSize)));
  } else {
    console.log("have a great day");
  }
};
playGame(generateGrid(gridSize), generateShips(playBoard));
