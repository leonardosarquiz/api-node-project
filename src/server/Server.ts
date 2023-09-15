import express from 'express';
import cors from 'cors';
import './shared/services/TranslationsYup';
import { router } from './routes';
import 'dotenv/config';


const server = express();


server.use(cors());
server.use(express.json());

server.use(router);





export { server };
