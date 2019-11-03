var app = "train of thought";

const GridSize = 50;
const SquareSize = 10;
const Border = 1;
const Dimension = SquareSize - (Border * 2)
const Time = 10
const Colors = [
  'rgb(134, 158, 231)',
  'rgb(115, 143, 230)',
  'rgb(102, 132, 228)',
  'rgb(89, 122, 228)',
  'rgb(92, 125, 228)',
  'rgb(75, 111, 227)',
  'rgb(62, 101, 227)',
  'rgb(45, 87, 224)'
]

var start = document.getElementById('start')
var stop = document.getElementById('stop')

start.addEventListener('click', () => {
  buildGrid();
  startThought();
  start.setAttribute("disabled", 'true')
})

stop.addEventListener('click', () => {
  clearInterval(state.clearIntervalId)
})


var state = {
  grid: [],
  clearIntervalId: undefined,
  currentIndex: undefined,
  previousIndex: undefined,
}

function buildGrid() {

  let table = document.createElement('table')

  if (state.grid.length === 0) {
    for (let i = 0; i < GridSize; i++) {
      state.grid.push(new Array(GridSize).fill(0))
    }
  }

  for (let i = 0; i <= state.grid.length - 1; i++) {
    let row = document.createElement('tr')
    for (let j = 0; j <= state.grid[i].length - 1; j++) {
      let cell = document.createElement('td')
      let style = `width: ${Dimension}px; height: ${Dimension}px; border: ${Border}px solid grey;`

      state.grid[i][j] === 1 ? style += `background-color:${Colors[Math.floor(Math.random()*Colors.length)]}`
      : style += ''

      cell.setAttribute('style', style)
      row.appendChild(cell)
    }
    table.appendChild(row)
  }

  document.body.appendChild(table)
}

function startThought() {
  let middle = Math.floor(GridSize/2)
  state.grid[middle][middle] === 0 ? state.grid[middle][middle] = 1 : state.grid[middle][middle] = 0;
  state.currentIndex = {x:middle, y: middle}

  let table = document.getElementsByTagName('table')[0]
  document.body.removeChild(table)
  table = document.createElement('table')
  buildGrid();

  state.clearIntervalId = setInterval(continueThought,Time)
}

function continueThought() {
  // starting from the last index, decide where to go next, as long as it isnt the previous index
  let curX = state.currentIndex.x
  let curY = state.currentIndex.y
  let choices = [
    {x:curX + 1, y:curY}, // go right
    {x:curX - 1, y:curY}, // go left
    {x: curX, y: curY + 1}, // go down
    {x: curX, y: curY - 1}, // go up
  ]

  state.previousIndex = state.currentIndex;

  decision = choices[Math.floor(Math.random()*4)]

  // make sure current index is inside the main grid
  if (decision.x >= 0 && decision.x <= GridSize - 1 && decision.y >= 0 && decision.y <= GridSize - 1) {
    state.currentIndex = decision;

    state.grid[state.currentIndex.x][state.currentIndex.y] === 0 ?
    state.grid[state.currentIndex.x][state.currentIndex.y] = 1 :
    state.grid[state.currentIndex.x][state.currentIndex.y] = 0

    let table = document.getElementsByTagName('table')[0]
    document.body.removeChild(table)
    table = document.createElement('table')
    buildGrid()
  } else {
    return false;
  }
}
