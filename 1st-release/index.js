const screen = document.getElementById('screnn');
const context = screen.getContext('2d');
// const currentPlayerId = 'player1';

function createGame() {
  const state = {
    players: {
      player1: { x: 5, y: 5 },
      player2: { x: 9, y: 9 },
    },
    fruits: {
      fruit1: { x: 3, y: 1 },
    },
  };

  function movePlayer(commad) {
    const acceptedMoves = {
      ArrowUp(player) {
        console.log('Moving player Up');
        if (player.y - 1 >= 0) {
          player.y -= 1;
        }
      },
      ArrowRight(player) {
        console.log('Moving player Right');
        if (player.x + 1 < screen.width) {
          player.x += 1;
        }
      },
      ArrowDown(player) {
        console.log('Moving player Down');
        if (player.y + 1 < screen.height) {
          player.y += 1;
        }
      },
      ArrowLeft(player) {
        console.log('Moving player Left');
        if (player.x - 1 >= 0) {
          player.x -= 1;
        }
      },
    };

    const { keyPressed } = commad;
    const player = state.players[commad.playerId];
    const moveFunction = acceptedMoves[keyPressed];

    if (moveFunction) {
      moveFunction(player);
    }
  }

  return {
    movePlayer,
    state,
  };
}

function renderScreen() {
  context.fillStyle = '#fff';
  context.clearRect(0, 0, 10, 10);

  for (const playerId in game.state.players) {
    const player = game.state.players[playerId];
    context.fillStyle = '#444';
    context.fillRect(player.x, player.y, 1, 1);
  }

  for (const fruitId in game.state.fruits) {
    const fruit = game.state.fruits[fruitId];
    context.fillStyle = 'yellow';
    context.fillRect(fruit.x, fruit.y, 1, 1);
  }

  requestAnimationFrame(renderScreen);
}

function createKeyboardListener() {
  const state = {
    observers: [],
  };

  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function notifyAll(command) {
    console.log(
      `KeyboardListener -> Notifying ${state.observers.length} observers`
    );

    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  }

  document.addEventListener('keydown', handleKeydowm);

  function handleKeydowm(event) {
    const keyPressed = event.key;

    const command = {
      playerId: 'player1',
      keyPressed,
    };

    notifyAll(command);
  }

  return {
    subscribe,
  };
}

const game = createGame();
const keyboardListener = createKeyboardListener();

keyboardListener.subscribe(game.movePlayer);

renderScreen();
