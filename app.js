const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = [
  '#ff0000',
  '#ff8700',
  '#ffd300',
  '#deff0a',
  '#a1ff0a',
  '#0aff99',
  '#0aefff',
  '#147df5',
  '#580aff',
  '#be0aff',
]
let time = 0
let score = 0
let miss = 0

startBtn.addEventListener('click', event => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = +event.target.getAttribute('data-time')
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', playGame)

function playGame(event) {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  } else if (event.target.classList.contains('board')) {
    miss++
  }
}

function startGame() {
  setInterval(decreaseTime, 1000)
  setTime(time)
  createRandomCircle()
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    setTime(current)
  }
}

function setTime(value) {
  if (value < 10) value = `0${value}`
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  board.removeEventListener('click', playGame)
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Рахунок: <span class="primary">${score}</span></h1>
  <h2>Промахів: <span class="danger">${miss}</span></h2>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 30)
  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.classList.add('circle')

  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.backgroundColor = colors[getRandomNumber(0, colors.length - 1)]

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
