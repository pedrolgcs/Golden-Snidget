const screen = document.getElementById('screnn');
const context = screen.getContext('2d');

const game = {
  players: {
    player1: { x: 1, y: 1 },
    player2: { x: 9, y: 9 }
  },
  fruits: {
    fruit1: { x: 3, y: 1 }
  }
};

function cleanScreen() {
  context.fillStyle = '#fff';
  context.fillRect(0, 0, 10, 10);
}

function renderScreen() {
  cleanScreen();

  for (playerId in game.players) {
    const player = game.players[playerId];
    context.fillStyle = '#444';
    context.fillRect(player.x, player.y, 1, 1);
  }

  for (fruitId in game.fruits) {
    const fruit = game.fruits[fruitId];
    context.fillStyle = 'yellow';
    context.fillRect(fruit.x, fruit.y, 1, 1);
  }

  requestAnimationFrame(renderScreen);
}

renderScreen();
