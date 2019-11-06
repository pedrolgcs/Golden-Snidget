const screen = document.getElementById('screnn');
const context = screen.getContext('2d');
const currentPlayerId = 'player1';

const game = {
  players: {
    player1: { x: 5, y: 5 },
    player2: { x: 9, y: 9 }
  },
  fruits: {
    fruit1: { x: 3, y: 1 }
  }
};

function cleanScreen() {
  context.fillStyle = '#fff';
  context.clearRect(0, 0, 10, 10);
}

function renderScreen() {
  cleanScreen();

  for (const playerId in game.players) {
    const player = game.players[playerId];
    context.fillStyle = '#444';
    context.fillRect(player.x, player.y, 1, 1);
  }

  for (const fruitId in game.fruits) {
    const fruit = game.fruits[fruitId];
    context.fillStyle = 'yellow';
    context.fillRect(fruit.x, fruit.y, 1, 1);
  }

  requestAnimationFrame(renderScreen);
}

function handleKeydowm(event) {
  const keyPressed = event.key;
  const player = game.players[currentPlayerId];

  if (keyPressed === 'ArrowUp' && player.y - 1 >= 0) {
    player.y -= 1;
  }

  if (keyPressed === 'ArrowRight' && player.x + 1 < screen.width) {
    player.x += 1;
  }

  if (keyPressed === 'ArrowDown' && player.y + 1 < screen.height) {
    player.y += 1;
  }

  if (keyPressed === 'ArrowLeft' && player.x - 1 >= 0) {
    player.x -= 1;
  }
}

document.addEventListener('keydown', handleKeydowm);

renderScreen();
