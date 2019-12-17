import createKeyboardListener from './keyboardListener.js';
import createGame from './game.js';
import renderScreen from './renderScrenn.js';

const screen = document.getElementById('screnn');

const game = createGame();
const keyboardListener = createKeyboardListener(document);

keyboardListener.subscribe(game.movePlayer);

// add players and fruits
game.addPlayer({ playerId: 'player1', playerX: 0, playerY: 0 });
game.addPlayer({ playerId: 'player2', playerX: 1, playerY: 2 });
game.addFruit({
  fruitId: 'Apple',
  fruitX: Math.floor(Math.random() * 10),
  fruitY: Math.floor(Math.random() * 10),
});
game.addFruit({
  fruitId: 'Pineplo',
  fruitX: Math.floor(Math.random() * 10),
  fruitY: Math.floor(Math.random() * 10),
});

renderScreen(screen, game, requestAnimationFrame);
