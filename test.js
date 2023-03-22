const ships = [
  {
    name: "Carrier",
    hitPoints: 5,
    positions: [],
    destroyed() {
      console.log("You have destroyed the Carrier");
    },
  },
  {
    name: "Battleship",
    hitPoints: 5,
    positions: [],
    destroyed() {
      console.log("You have destroyed the Battleship");
    },
  },
  {
    name: "Cruiser",
    hitPoints: 5,
    positions: [],
    destroyed() {
      console.log("You have destroyed the Cruiser");
    },
  },
  {
    name: "Submarine",
    hitPoints: 5,
    positions: [],
    destroyed() {
      console.log("You have destroyed the Submarine");
    },
  },
  {
    name: "Destroyer",
    hitPoints: 5,
    positions: [],
    destroyed() {
      console.log("You have destroyed the Destroyer");
    },
  },
];

for (let element of ships) {
  console.log(element.name, element.hitPoints);
}

let shipOrientation = Math.floor(Math.random() * 1);
let maxDisplacement = gridSize - ship.hitPoints;
let displacement = Math.floor(Math.random() * (maxDisplacement + 1));
console.log(shipOrientation);
switch (shipOrientation) {
  case 0: //Horizontal Orientation
    let randomNumber = Math.floor(Math.random() * gridSize);
    for (i = 0; i < ship.hitPoints; i++) {
      ship.positions.push(grid[randomNumber][i + displacement]);
      grid[randomNumber][i + displacement] =
        grid[randomNumber][i + displacement] + "@";
    }
    console.log(ship.positions);
    console.table(grid);