//variables
const readLine = require("readline-sync");
const gridSize = 10;
let stuckCounter = 0;

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

const checkForHorizontalSpace = (
  grid,
  ship,
  randomNumber,
  displacement,
  maxDisplacement
) => {
  //checks if the ship, fits into the grid if not, it tries to reposition it

  for (let i = 0; i < ship.hitPoints; i++) {
    if (grid[randomNumber][i + displacement].length >= 3) {
      randomNumber = Math.floor(Math.random() * gridSize);
      stuckCounter++;
      if (stuckCounter > ship.hitPoints + 1) {
        displacement--;
        console.log(displacement);
      }
      if (displacement === -1) {
        displacement = Math.floor(Math.random() * (maxDisplacement + 1));
      }
      return checkForHorizontalSpace(
        grid,
        ship,
        randomNumber,
        displacement,
        maxDisplacement
      );
    }
  }

  return [true, randomNumber, displacement];
};

const checkForVerticalSpace = (
  grid,
  ship,
  randomNumber,
  displacement,
  maxDisplacement
) => {
  for (let i = 0; i < ship.hitPoints; i++) {
    if (grid[i + displacement][randomNumber].length >= 3) {
      randomNumber = Math.floor(Math.random() * gridSize);
      stuckCounter++;
      if (stuckCounter > ship.hitPoints + 1) {
        displacement--;
      }
      if (displacement === -1) {
        displacement = Math.floor(Math.random() * (maxDisplacement + 1));
      }
      return checkForVerticalSpace(
        grid,
        ship,
        randomNumber,
        displacement,
        maxDisplacement
      );
    }
  }
  stuckCounter = 0;

  return [true, randomNumber, displacement];
};

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

    switch (shipOrientation) {
      case 0: //Horizontal Orientation
        try {
          [horizontalOrientation, randomNumber, displacement] =
            checkForHorizontalSpace(
              grid,
              ship,
              randomNumber,
              displacement,
              maxDisplacement
            );

          if (horizontalOrientation) {
            for (let j = 0; j < ship.hitPoints; j++) {
              ship.positions.push(grid[randomNumber][j + displacement]);
              grid[randomNumber][j + displacement] =
                grid[randomNumber][j + displacement] + ship.name;
            }
          }
        } catch (err) {
          console.error(`the error is ${err}`);
        }

        continue;

      case 1: //Vertical Orientation
        try {
          [verticalOrientation, randomNumber, displacement] =
            checkForVerticalSpace(
              grid,
              ship,
              randomNumber,
              displacement,
              maxDisplacement
            );

          if (verticalOrientation) {
            for (let j = 0; j < ship.hitPoints; j++) {
              ship.positions.push(grid[j + displacement][randomNumber]);
              grid[j + displacement][randomNumber] =
                grid[j + displacement][randomNumber] + ship.name;
            }
          }
        } catch (err) {
          console.log(`the error is ${err}`);
        }

        continue;

      default:
        break;
    }
  }
  console.log(
    `Here it is how all the ships are position, so you don't have to guess by luck (this print won't repeat after you take the first turn)`
  );
  console.table(grid);
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

    if (strike === "ss") {
      console.table(grid);
    }

    if (strike.length === 1 || strike.length > 3) {
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
