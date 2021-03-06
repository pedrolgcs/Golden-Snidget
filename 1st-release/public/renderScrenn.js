/* eslint-disable no-restricted-syntax */
export default function renderScreen(
  screen,
  game,
  requestAnimationFrame,
  currentPlayerId
) {
  const context = screen.getContext('2d');
  context.fillStyle = '#fff';
  context.clearRect(0, 0, 10, 10);

  // render players
  for (const playerId in game.state.players) {
    const player = game.state.players[playerId];
    context.fillStyle = '#444';
    context.fillRect(player.x, player.y, 1, 1);
  }

  // render fruits
  for (const fruitId in game.state.fruits) {
    const fruit = game.state.fruits[fruitId];
    context.fillStyle = '#7159c1';
    context.fillRect(fruit.x, fruit.y, 1, 1);
  }

  const currentPlayer = game.state.players[currentPlayerId];

  if (currentPlayer) {
    context.fillStyle = '#F0DB4F';
    context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1);
  }

  requestAnimationFrame(() => {
    renderScreen(screen, game, requestAnimationFrame, currentPlayerId);
  });
}
