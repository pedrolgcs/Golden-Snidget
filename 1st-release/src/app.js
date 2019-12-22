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
    this.game.start();

    this.game.subscribe(command => {
      console.log(`> Emitting ${command.type}`);
      this.sockets.emit(command.type, command);
    });

    this.sockets.on('connection', socket => {
      const playerId = socket.id;
      console.log(`> Player connected on Server with id: ${playerId}`);

      this.game.addPlayer({ playerId });

      socket.emit('setup', this.game.state);

      socket.on('move-player', command => {
        command.playerId = playerId;
        command.type = 'move-player';

        this.game.movePlayer(command);
      });

      socket.on('disconnect', () => {
        this.game.removePlayer({ playerId });
        console.log(`> Player disconnected: ${playerId}`);
      });
    });

    this.middlewares();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }
}

export default new App().server;
