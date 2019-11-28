const screen = document.getElementById('screnn');
const context = screen.getContext('2d');
// const currentPlayerId = 'player1';

function createGame() {
  const state = {
    players: {},
    fruits: {},
  };

  function addPlayer(command) {
    const { playerId } = command;
    const { playerX } = command;
    const { playerY } = command;

    state.players[playerId] = {
      x: playerX,
      y: playerY,
    };
  }

  function removePlayer(command) {
    const { playerId } = command;
    delete state.players[playerId];
  }

  function addFruit(command) {
    const { fruitId } = command;
    const { fruitX } = command;
    const { fruitY } = command;

    state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY,
    };
  }

  function removeFruit(command) {
    const { fruitId } = command;
    delete state.fruits[fruitId];
  }

  function movePlayer(command) {
    const acceptedMoves = {
      ArrowUp(player) {
        player.y = Math.max(player.y - 1, 0);
      },
      ArrowRight(player) {
        player.x = Math.min(player.x + 1, screen.width - 1);
      },
      ArrowDown(player) {
        player.y = Math.min(player.y + 1, screen.height - 1);
      },
      ArrowLeft(player) {
        player.x = Math.max(player.x - 1, 0);
      },
    };

    const { keyPressed } = command;
    const { playerId } = command;
    const player = state.players[command.playerId];
    const moveFunction = acceptedMoves[keyPressed];

    if (player && moveFunction) {
      moveFunction(player);
      checkForFruitCollision(playerId);
    }
  }

  function checkForFruitCollision(playerId) {
    const player = state.players[playerId];

    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId];
      console.log(`Checking ${playerId} and ${fruitId}`);

      if (player.x === fruit.x && player.y === fruit.y) {
        console.log(`Collision between ${playerId} and ${fruitId}`);
        removeFruit({ fruitId });
      }
    }
  }

  return {
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
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

// add players and fruits
game.addPlayer({ playerId: 'player1', playerX: 0, playerY: 0 });
game.addPlayer({ playerId: 'player2', playerX: 1, playerY: 2 });
game.addFruit({
  fruitId: 'Apple',
  fruitX: Math.floor(Math.random() * 10 + 1),
  fruitY: Math.floor(Math.random() * 10 + 1),
});

renderScreen();
