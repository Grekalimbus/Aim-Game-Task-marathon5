const linkStart = document.getElementById('start'); // кнопка начать игру
const screens = document.querySelectorAll('.screen'); // массив с основными дивами, в которые занимаюсь всю часть контента и свапаются в верх
const timeList = document.getElementById('time-list'); // ul, в котором 3 li, на которые можно кликать и выбирать время игры
const timeEl = document.getElementById('time'); // спан, который находится в h3 с временем игры
const board = document.getElementById('board'); // сам див, внутри которого игра (шарики на которые нада кликать)
let time = 0; // переменная, которая примит в себя значения время игры, которое мы выберем нажав на li
let score = 0; // счет, который будет предоставлен в конце
// ==========================================================

// обработчик добавляющий основным дивам класс up, который имеет свойство margin -100vh (после чего происходит свап дива в верх)
linkStart.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});
// при клике на li, переменная time принимает число равное секундам 10/20/30 и добавляет также класс up, чтобы блок сьехал в верх
timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    // подобная запись ниже форматирует полученную строку в число
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

// событие на див внутри которого кружочки
// проверка, если клик был по элементу с указаным классом(на кружочек), тогда добавляем поинт и удаляем див и создаем новый
board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

// функция каждую секунду вызывает  decreaseTime и создает 1 раз случайный шарик
// делает текст спана равный переменной time, которая каждую секунду становится меньше на 1
function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}
// функция, в которой будет уменьшатся значение time каждую секунду до тех пор, пока значение не будет 0
// после того, как time === 0, функция закончит свою работу(таймер перестанет тикать)
function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}
// функция, которая меняет текст html на кол-во время, которое будет уменьшатся
function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}
// функция, которая сработает после того, как время таймера будет == 0
function finishGame() {
  // ниже строка где удаляем родителя, в котором находится спан с таймером
  timeEl.parentNode.remove();
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
}

// фунция, которая будет создавать рандомный круг, на который нужно будет кликнуть
// сложная функция с богатым функционалом и математическими расчетами, чтобы позицианировать кружок внутри дива
// и не выходить за рамки этого дива
function createRandomCircle() {
  // circle - див/кружочек
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  //   ниже с помощью деструктуризации получаем высоту и ширину блока
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  // класс который мы добавляем изначально находится уже в css, а также имеет свойство position absolute
  //   чтобы иметь возможность в право лево/верх низ двигать элемент рандомно
  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${x}px`;
  circle.style.left = `${y}px`;
  board.append(circle);
}
// функция, для рандомного размера кружочка (circle)
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
