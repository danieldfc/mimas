import './bootstrap';

import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import Youch from 'youch';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exectionHandler();
  }

  middlewares() {
    this.server.use(morgan('dev'));
    this.server.use(cors({ origin: process.env.FRONT_URL }));
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exectionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res
        .status(500)
        .json({ error: { message: 'Internal server error' } });
    });
  }
}

export default new App().server;
