import createKeyboardListener from './keyboardListener.js';
import createGame from './game.js';
import renderScreen from './renderScrenn.js';

const screen = document.getElementById('screnn');

const game = createGame();
const keyboardListener = createKeyboardListener(document);

keyboardListener.subscribe(game.movePlayer);

renderScreen(screen, game, requestAnimationFrame);

const socket = io();

socket.on('connect', () => {
  const playerId = socket.id;
  console.log(`Player connected on Client with id: ${playerId}`);
});

socket.on('setup', state => {
  console.log(`> Receiving "setup" event from server`);
  console.log(state);
  game.state = state;
});
