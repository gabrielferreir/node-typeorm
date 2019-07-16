import * as express from 'express';
import * as bodyParser from 'body-parser';
import {createConnection} from "typeorm";

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers, port) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    public initializeFinalMiddlewares() {
        this.app.use((err, req, res, next) => {
            res.status(500).json({
                message: 'We had a problem, try again later'
            });
        });

        this.app.use('*', function (req, res) {
            res.status(404).json({
                path: req.originalUrl,
                message: 'Not found'
            });
        });
    }

    public listen() {

        createConnection().then(async connection => {
            console.log('Conectado com sucesso!');

            this.app.listen(this.port, () => {
                console.log(`App listening on the port ${this.port}`);
            });

        }).catch(error => console.log(error));
    }
}

export default App;
