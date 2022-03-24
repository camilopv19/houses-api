import express from 'express';
import cors from 'cors';
import housesRoutes from '../routes/houses.js';

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.housesPath = '/houses';
        this.middlewares();
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Body read and parse
        this.app.use( express.json() );

    }

    routes() {
        this.app.use( this.housesPath, housesRoutes);
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server is running on port ', this.port );
        });
    }

}

export default Server;
