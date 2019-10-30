var app = "train of thought";

const GridSize = 25;
const SquareSize = 10;

var state = {
  grid: [],
  clearIntervalId: undefined,
  previousIndex: undefined,
}

// build the Array Grid based on the Grid Size ie. GridSize = 50, build an array of 50 arrays, each having 50 elements
for (let i = 0; i < GridSize; i++) {
  state.grid.push(new Array(GridSize).fill(0))
}

let table = document.createElement('table')

function buildGrid() {
  for (let i = 0; i <= state.grid.length - 1; i++) {
    let row = document.createElement('tr')
    for (let j = 0; j <= state.grid[i].length - 1; j++) {
      let cell = document.createElement('td')
      state.grid[i][j] === 1 ? cell.classList.add('on') : cell.classList.add('off')
      row.appendChild(cell)
    }
    table.appendChild(row)
  }

  document.body.appendChild(table)
}

function startThought() {
  let middle = Math.floor(GridSize/2)
  state.grid[middle][middle] === 0 ? state.grid[middle][middle] = 1 : state.grid[middle][middle] = 0;
  state.previousIndex = {x:middle, y: middle}

  document.body.removeChild(table)
  table = document.createElement('table')
  buildGrid();

  state.clearIntervalId = setInterval(continueThought,500)
}

function continueThought() {

}
