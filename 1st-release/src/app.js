import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import createGame from '../public/game';

class App {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.sockets = socketio(this.server);

    this.game = createGame();
    this.addPlayers();
    this.addFruit();

    this.game.movePlayer({ playerId: 'player1', keyPressed: 'ArrowRight' });
    console.log(this.game.state);

    this.sockets.on('connection', socket => {
      const playerId = socket.id;
      console.log(`> Player connected on Server with id: ${playerId}`);

      socket.emit('setup', this.game.state);
    });

    this.middlewares();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  addPlayers() {
    this.game.addPlayer({ playerId: 'player1', playerX: 0, playerY: 0 });
    this.game.addPlayer({ playerId: 'player2', playerX: 1, playerY: 2 });
  }

  addFruit() {
    this.game.addFruit({
      fruitId: 'Apple',
      fruitX: Math.floor(Math.random() * 10),
      fruitY: Math.floor(Math.random() * 10),
    });
    this.game.addFruit({
      fruitId: 'Pineplo',
      fruitX: Math.floor(Math.random() * 10),
      fruitY: Math.floor(Math.random() * 10),
    });
  }
}

export default new App().server;
